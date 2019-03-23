import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import get from 'lodash.get'
import { formatReadingTime, formatPostDate } from '../util/helpers'
import { Navbar } from '../components/Navbar'

class BlogIndex extends React.Component {
  render() {
    const title = this.props.data.site.siteMetadata.title
    const posts = this.props.data.allMarkdownRemark.edges

    return (
      <Layout>
        <Navbar dark />
        <SEO title="Blog" />
        <main
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            paddingTop: '150px',
            marginTop: '3rem',
          }}
        >
          {posts.map(({ node }) => {
            const title = get(node, 'frontmatter.title') || node.fields.slug
            return (
              <article style={{ marginBottom: '3rem' }} key={node.fields.slug}>
                <header>
                  <h3>
                    <Link to={node.fields.slug} rel="bookmark">
                      {title}
                    </Link>
                  </h3>
                  <small style={{ color: 'rgba(0,0,0,0.6)' }}>
                    {formatPostDate(node.frontmatter.date, 'en')}
                    {` • ${formatReadingTime(node.timeToRead)}`}
                  </small>
                </header>
                <p
                  style={{ margin: 0 }}
                  dangerouslySetInnerHTML={{ __html: node.frontmatter.spoiler }}
                />
              </article>
            )
          })}
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
