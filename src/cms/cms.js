import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import IndexPagePreview from './preview-templates/IndexPagePreview'
import BlogPagePreview from './preview-templates/BlogPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import AboutPagePreview from './preview-templates/AboutPagePreview'

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('blog', BlogPagePreview)
CMS.registerPreviewTemplate('blog-post', BlogPostPreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)

CMS.registerEditorComponent({
  id: 'note',
  label: 'Note',
  fields: [
    { name: 'type', label: 'Type', widget: 'select', options: ['info'] },
    { name: 'text', label: 'Text', widget: 'text' }
  ],
  pattern: /^<Note type="(\S+)">\n(.+)\n<\/Note>$/,
  fromBlock: function (match) {
    return {
      type: match[1],
      text: match[2]
    }
  },
  // Function to create a text block from an instance of this component
  toBlock: function (obj) {
    return `<Note type="${obj.type}">
    ${obj.text}
</Note>`
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function (obj) {
    return (
      '<p><em>' + obj.text + '</em></p>'
    )
  }
})

CMS.registerEditorComponent({
  id: 'codepen',
  label: 'Codepen',
  fields: [
    { name: 'id', label: 'ID', widget: 'string' }
  ],
  pattern: /^<Codepen id="(\S+)"\/>$/,
  fromBlock: function (match) {
    return {
      id: match[1]
    }
  },
  // Function to create a text block from an instance of this component
  toBlock: function (obj) {
    return `<Codepen id="${obj.id}"/>`
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function (obj) {
    return (
      '<p>Codepen ' + obj.id + '</p>'
    )
  }
})
