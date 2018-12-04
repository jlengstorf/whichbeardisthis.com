const path = require('path');

module.exports = {
  siteMetadata: {
    title: `Which Beard Is This?`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-sqip`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Which Beard Is This?`,
        short_name: `Which Beard?`,
        start_url: `/`,
        background_color: `#fffdfc`,
        theme_color: `#6a2555`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
