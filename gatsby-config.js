const config = require('./config')

module.exports = {
  siteMetadata: {
    title: `Ben McMahen - Freelance web and mobile developer`,
    description: `Hello, my name is Ben. I'm a full-stack developer and love building interactive experiences for the web and mobile.`,
    author: `@benmcmahen`,
  },
  plugins: [
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
        //trackingId: `ADD YOUR TRACKING ID HERE`,
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
