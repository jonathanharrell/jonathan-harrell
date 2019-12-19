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
