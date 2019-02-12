const config = require('./config')

module.exports = {
  siteMetadata: {
    title: `Ben McMahen - Freelance web and mobile developer`,
    description: `I'm a full-stack developer and love building educational, interactive experiences for the web and mobile.`,
    author: `@benmcmahen`,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: './src/images/favicon.png',
        appName: 'Ben McMahen',
        appDescription: `I'm a full-stack developer and love building educational, interactive experiences for the web and mobile.`,
        developerName: 'Ben McMahen',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },

    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-37306028-11`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`lato\:300,300i,400,400i,700,900`],
      },
    },
    {
      // https://developer.github.com/v4/explorer/
      // https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/
      resolve: 'gatsby-source-github-api',
      options: {
        token: config.GITHUB_API,
        graphQLQuery: `query { 
          viewer { 
            login
            pinnedRepositories(first: 6) {
              edges {
                node {
                  name
                  url
                  description
                  stargazers {
                    totalCount
                  }
                }
              }
            }
          }
        }`,
      },
    },

    //   resolve: `gatsby-plugin-manifest`, // { // `gatsby-plugin-feed`,
    //   options: {
    //     name: `gatsby-starter-default`,
    //     short_name: `starter`,
    //     start_url: `/`,
    //     background_color: `#663399`,
    //     theme_color: `#663399`,
    //     display: `minimal-ui`,
    //     icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
    //   },
    // },
    `gatsby-plugin-react-helmet`,

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
