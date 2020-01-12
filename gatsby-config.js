module.exports = {
  siteMetadata: {
    title: 'Vos solutions informatiques',
    subTitle: 'Ouvertes et de qualités',
    author: 'Benoît Suttor',
  },
  pathPrefix: '/',
  plugins: [
    {
      resolve: 'gatsby-source-plone',
      options: {
        baseUrl: 'https://backend.oality.com/fr',
        logLevel: 'DEBUG',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/static`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Oality website',
        short_name: 'Oality',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#007eb6',
        display: 'standalone',
        icon: 'src/static/icon.png',
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-plugin-react-leaflet',
      options: {
        linkStyles: true // (default: true) Enable/disable loading stylesheets via CDN
      }
    },
  ],
};
