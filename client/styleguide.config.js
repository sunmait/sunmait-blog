const path = require('path');

module.exports = {
  components: [
    'src/components/common/**/*.{js,jsx,ts,tsx}',
  ],
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/lib/styleguide/StyleGuideBaseWrapper'),
  }
};
