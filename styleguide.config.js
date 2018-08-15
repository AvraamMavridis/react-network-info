const path = require('path');

module.exports = {
  require: [
    'babel-polyfill',
    path.join(__dirname, './styles.css')
  ],
  components: 'src/index.js',
  exampleMode: 'expand',
  usageMode: 'expand',
  title: 'Network Info Component',
  styleguideDir: path.join(__dirname, '/'),
  ribbon: {
    // Link to open on the ribbon click (required)
    url: 'https://github.com/AvraamMavridis/currency-input',
    // Text to show on the ribbon (optional)
    text: 'Fork me on GitHub'
  },
  showSidebar: false,
  theme: {
    color: {
      base: '#71BE46',
      light: '#71BE46',
      lightest: '#71BE46',
      ribbonBackground: '#71BE46',
      link: '#BE3C3A',
      linkHover: '#4BAE97',
      baseBackground: 'black',
      border: '#4BAE97'
    }
  },
  editorConfig: {
    theme: 'dracula',
  }
};