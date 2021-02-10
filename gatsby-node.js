const _ = require("lodash");
const path = require("path");
const fs = require("fs");
const { createFilePath } = require("gatsby-source-filesystem");
const { fmImagesToRelative } = require("gatsby-remark-relative-images");
const algoliasearch = require("algoliasearch");
const colors = require("./colors");

exports.createPages = async ({ actions, graphql }) => {
	const { createPage } = actions;

	// create about page
	await graphql(`
		{
			allMdx(filter: { frontmatter: { templateKey: { eq: "about-page" } } }) {
				edges {
					node {
						fields {
							slug
						}
						frontmatter {
							title
						}
					}
				}
			}
		}
	`).then(result => {
		if (result.errors) {
			result.errors.forEach(e => console.error(e.toString()));
			return Promise.reject(result.errors);
		}

		const { edges } = result.data.allMdx;
		const page = edges[0].node;

		createPage({
			path: page.fields.slug,
			component: path.resolve(`src/templates/about-page.js`)
		});
	});

	// create blog posts
	await graphql(`
		{
			allMdx(
				limit: 1000
				sort: { order: DESC, fields: [frontmatter___date] }
				filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
			) {
				posts: edges {
					node {
						id
						tableOfContents
						fields {
							slug
						}
						frontmatter {
							tags
							templateKey
							title
							description
							color
							date
							featuredimage {
								fields {
									markup
								}
							}
						}
					}
				}
			}
		}
	`).then(result => {
		if (result.errors) {
			result.errors.forEach(e => console.error(e.toString()));
			return Promise.reject(result.errors);
		}

		const { posts } = result.data.allMdx;

		posts.forEach(({ node: post }, index) => {
			const id = post.id;
			const prev = index < posts.length - 1 ? posts[index + 1].node : undefined;
			const next = index > 0 ? posts[index - 1].node : undefined;

			createPage({
				path: post.fields.slug,
				tags: post.frontmatter.tags,
				component: path.resolve(`src/templates/blog-post.js`),
				context: {
					id,
					prev,
					next
				}
			});
		});

		// index blog posts in Algolia
		const client = algoliasearch(
			process.env.GATSBY_ALGOLIA_APPLICATION_ID,
			process.env.ALGOLIA_ADMIN_API_KEY
		);

		const postsIndex = client.initIndex("jh_posts");
		postsIndex.setSettings({
			attributesToHighlight: ["frontmatter.description", "frontmatter.tags", "frontmatter.title"],
			attributesToRetrieve: ["fields", "frontmatter"],
			ranking: [
				"desc(frontmatter.date)",
				"typo",
				"geo",
				"words",
				"filters",
				"proximity",
				"attribute",
				"exact",
				"custom"
			],
			searchableAttributes: ["frontmatter.description", "frontmatter.tags", "frontmatter.title"],
			attributesForFaceting: ["frontmatter.tags"]
		});

		const postObjects = posts.map(({ node: post }) => ({
			...post,
			objectID: post.id
		}));

		postsIndex.replaceAllObjects(postObjects);
	});
};

exports.onCreateNode = async ({ node, actions, getNode }) => {
	const { createNodeField } = actions;
	fmImagesToRelative(node); // convert image paths for gatsby images

	if (node.internal.type === `Mdx`) {
		const value = createFilePath({ node, getNode });
		createNodeField({
			name: `slug`,
			node,
			value
		});
	}

	if (node.internal.type === "File") {
		if (node.relativePath.endsWith(".svg")) {
			let value = fs.readFileSync(node.absolutePath, "utf8");

			Object.entries(colors).forEach(([color, replacement]) => {
				const re = new RegExp(color, "g");
				value = value.replace(re, replacement);
			});

			createNodeField({
				name: `markup`,
				node,
				value
			});
		}
	}
};

exports.onCreateWebpackConfig = ({ getConfig, stage, actions }) => {
	const config = getConfig();

	if (stage.startsWith("develop") && config.resolve) {
		config.resolve.alias = {
			...config.resolve.alias,
			"react-dom": "@hot-loader/react-dom"
		};
	}

	actions.replaceWebpackConfig(config);
};
