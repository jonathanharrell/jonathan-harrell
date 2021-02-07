const _ = require("lodash");
const path = require("path");
const fs = require("fs");
const { createFilePath } = require("gatsby-source-filesystem");
const { fmImagesToRelative } = require("gatsby-remark-relative-images");
const algoliasearch = require("algoliasearch");
const colors = require("./colors");

exports.createPages = ({ actions, graphql }) => {
	const { createPage } = actions;

	return graphql(`
		{
			allMdx(limit: 1000) {
				edges {
					node {
						id
						tableOfContents
						fields {
							readingTime {
								text
							}
							slug
						}
						frontmatter {
							tags
							templateKey
							title
							description
							date
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

		const posts = result.data.allMdx.edges;

		posts.forEach(edge => {
			const id = edge.node.id;
			createPage({
				path: edge.node.fields.slug,
				tags: edge.node.frontmatter.tags,
				component: path.resolve(`src/templates/${String(edge.node.frontmatter.templateKey)}.js`),
				// additional data can be passed via context
				context: {
					id
				}
			});
		});

		// Tag pages:
		let tags = [];
		// Iterate through each post, putting all found tags into `tags`
		posts.forEach(edge => {
			if (_.get(edge, `node.frontmatter.tags`)) {
				tags = tags.concat(edge.node.frontmatter.tags);
			}
		});
		// Eliminate duplicate tags
		tags = _.uniq(tags);

		// Make tag pages
		tags.forEach(tag => {
			const tagPath = `/tags/${_.kebabCase(tag)}/`;

			createPage({
				path: tagPath,
				component: path.resolve(`src/templates/tag.js`),
				context: {
					tag
				}
			});
		});

		// Algolia indexing
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
			searchableAttributes: ["frontmatter.description", "frontmatter.tags", "frontmatter.title"]
		});

		const postObjects = posts
			.filter(edge => edge.node.frontmatter.templateKey === "blog-post")
			.map(edge => ({
				...edge.node,
				objectID: edge.node.id
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

exports.createSchemaCustomization = ({
	actions: { createTypes, createFieldExtension },
	createContentDigest
}) => {
	createFieldExtension({
		name: "mdx",
		extend() {
			return {
				type: "String",
				resolve(source, args, context, info) {
					// Grab field
					const value = source[info.fieldName];
					// Isolate MDX
					const mdxType = info.schema.getType("Mdx");
					// Grab just the body contents of what MDX generates
					const { resolve } = mdxType.getFields().body;
					return resolve({
						rawBody: value,
						internal: {
							contentDigest: createContentDigest(value) // Used for caching
						}
					});
				}
			};
		}
	});
	createTypes(`
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
    }
    type MdxFrontmatter {
      history: HistoryValues
      education: EducationValues
    }
    type HistoryValues {
      job: [JobValues]
    }
    type JobValues {
      description: String @mdx
    }
    type EducationValues {
      description: String @mdx
    }
  `);
};
