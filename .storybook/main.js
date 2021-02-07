module.exports = {
  stories: ['../**/stories.js'],
  addons: [
    '@storybook/addon-a11y/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-links/register',
    '@storybook/addon-notes/register',
    '@storybook/addon-storysource/register',
    '@storybook/addon-viewport/register',
    'storybook-dark-mode/register'
  ]
}
