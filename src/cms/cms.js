import CMS from "netlify-cms-app";
import uploadcare from "netlify-cms-media-library-uploadcare";
import cloudinary from "netlify-cms-media-library-cloudinary";

import BlogPostPreview from "./preview-templates/BlogPostPreview";
import AboutPagePreview from "./preview-templates/AboutPagePreview";

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate("blog-post", BlogPostPreview);
CMS.registerPreviewTemplate("about", AboutPagePreview);

// custom note block within blog posts
CMS.registerEditorComponent({
	id: "note",
	label: "Note",
	fields: [
		{
			name: "type",
			label: "Type",
			widget: "select",
			options: ["info", "warning", "danger"]
		},
		{ name: "text", label: "Text", widget: "text" }
	],
	pattern: /^<Note type="(\S+)">\n(.+)\n<\/Note>$/,
	fromBlock: function(match) {
		return {
			type: match[1],
			text: match[2]
		};
	},
	toBlock: function(obj) {
		return `<Note type="${obj.type}">
    ${obj.text}
</Note>`;
	},
	toPreview: function(obj) {
		return "<p><em>" + obj.text + "</em></p>";
	}
});

// custom Codepen block within blog posts
// grabs info about Codepen, given an ID
CMS.registerEditorComponent({
	id: "codepen",
	label: "Codepen",
	fields: [{ name: "id", label: "ID", widget: "string" }],
	pattern: /^<Codepen id="(\S+)"\/>$/,
	fromBlock: function(match) {
		return {
			id: match[1]
		};
	},
	toBlock: function(obj) {
		return `<Codepen id="${obj.id}"/>`;
	},
	toPreview: function(obj) {
		return "<p>Codepen - " + obj.id + "</p>";
	}
});

// custom article link block within blog posts
// grabs info about another blog post on the site
CMS.registerEditorComponent({
	id: "articleLink",
	label: "Article Link",
	fields: [
		{
			name: "title",
			label: "Title",
			widget: "relation",
			collection: "blog-post",
			searchFields: ["title"],
			valueField: "title"
		}
	],
	pattern: /^<ArticleLink title="(.+)"\/>$/,
	fromBlock: function(match) {
		return {
			title: match[1]
		};
	},
	toBlock: function(obj) {
		return `<ArticleLink title="${obj.title}"/>`;
	},
	toPreview: function(obj) {
		return "<p>Article Link - " + obj.title + "</p>";
	}
});
