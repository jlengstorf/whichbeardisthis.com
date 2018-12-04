exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /face-api.js/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
