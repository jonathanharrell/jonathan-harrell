module.exports = {
  globals: {
    __PATH_PREFIX__: true
  },
  extends: [
    'react-app',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  plugins: [
    'jsx-a11y'
  ],
  rules: {}
}
