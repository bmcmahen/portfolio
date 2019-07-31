import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import get from 'lodash.get'
import { formatReadingTime, formatPostDate } from '../util/helpers'
import { Navbar } from '../components/Navbar'
import './Blog-index.css'
import groupby from 'lodash.groupby'

class BlogIndex extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges

    const years = groupby(posts, ({ node }) => {
      return new Date(node.frontmatter.date).getFullYear()
    })

    console.log(years)

    return (
      <Layout>
        <Navbar dark />
        <SEO title="Blog" />
        <main className="Blog-index">
          {Object.keys(years).map(year => {
            return (
              <div>
                <div
                  style={{
                    padding: '0.5rem 0',
                    fontSize: '0.875rem',
                    borderBottom: '1px',
                    color: 'rgba(0,0,0,0.6)',
                    fontFamily: 'Merriweather',
                  }}
                >
                  {year}
                </div>
                {years[year].map(({ node }) => {
                  const title =
                    get(node, 'frontmatter.title') || node.fields.slug

                  return (
                    <article key={node.fields.slug}>
                      <header>
                        <h6>
                          <Link
                            style={{ color: 'rgba(0,0,0,0.875)' }}
                            to={node.fields.slug}
                            rel="bookmark"
                          >
                            {title}
                          </Link>
                        </h6>
                      </header>

                      <p style={{ color: 'rgba(0,0,0,0.6)' }}>
                        {new Date(node.frontmatter.date).toLocaleDateString(
                          'en',
                          { day: 'numeric', month: 'long' }
                        )}
                      </p>
                    </article>
                  )
                })}
              </div>
            )
          })}
          {/* {posts.map(({ node }) => {
            const title = get(node, 'frontmatter.title') || node.fields.slug
            return (
              <article key={node.fields.slug}>
                <header>
                  <h6>
                    <Link
                      style={{ color: 'rgba(0,0,0,0.6)' }}
                      to={node.fields.slug}
                      rel="bookmark"
                    >
                      {title}
                    </Link>
                  </h6>
                </header>

                <p style={{ color: 'rgba(0,0,0,0.6)' }}>
                  {formatPostDate(node.frontmatter.date, 'en')}
                </p>
              </article>
            )
          })} */}
        </main>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            spoiler
          }
        }
      }
    }
  }
`
