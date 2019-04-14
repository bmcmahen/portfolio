module.exports = {
  siteMetadata: {
    title: `Ben McMahen - Freelance web and mobile developer`,
    description: `I'm a full-stack developer and love building educational, interactive experiences for the web and mobile.`,
    author: `@benmcmahen`,
    siteUrl: 'https://www.benmcmahen.com',
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
              maxWidth: 1200,
              quality: 90,
              withWebp: true,
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
    `gatsby-plugin-twitter`,
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
        fonts: [`lato\:400,400i,700,700i`, `merriweather\:400,400i,700,700i`],
      },
    },
    // {
    //   // https://developer.github.com/v4/explorer/
    //   // https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/
    //   resolve: 'gatsby-source-github-api',
    //   options: {
    //     token: config.GITHUB_API,
    //     graphQLQuery: `query {
    //       viewer {
    //         login
    //         pinnedRepositories(first: 6) {
    //           edges {
    //             node {
    //               name
    //               url
    //               description
    //               stargazers {
    //                 totalCount
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }`,
    //   },
    // },
    // taken from dan's blog
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                const siteUrl = site.siteMetadata.siteUrl
                const postText = `
                <div style="margin-top=55px; font-style: italic;">(This is an article posted to my blog at benmcmahen.com. You can read it online by <a href="${siteUrl +
                  edge.node.fields.slug}">clicking here</a>.)</div>
              `

                let html = edge.node.html
                // Hacky workaround for https://github.com/gaearon/overreacted.io/issues/65
                html = html
                  .replace(/href="\//g, `href="${siteUrl}/`)
                  .replace(/src="\//g, `src="${siteUrl}/`)
                  .replace(/"\/static\//g, `"${siteUrl}/static/`)
                  .replace(/,\s*\/static\//g, `,${siteUrl}/static/`)

                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.spoiler,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': html + postText }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] }
                ) {
                  edges {
                    node {
                      excerpt(pruneLength: 250)
                      html
                      fields { 
                        slug   
                      }
                      frontmatter {
                        title
                        date
                        spoiler
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: "Ben McMahen's Blog RSS Feed",
          },
        ],
      },
    },
    `gatsby-plugin-react-helmet`,

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
