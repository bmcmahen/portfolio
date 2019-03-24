import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import get from 'lodash.get'
import { formatReadingTime, formatPostDate } from '../util/helpers'
import { Navbar } from '../components/Navbar'
import './Blog-index.css'

class BlogIndex extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges

    return (
      <Layout>
        <Navbar dark />
        <SEO title="Blog" />
        <main className="Blog-index">
          {posts.map(({ node }) => {
            const title = get(node, 'frontmatter.title') || node.fields.slug
            return (
              <article key={node.fields.slug}>
                <header>
                  <h4>
                    <Link to={node.fields.slug} rel="bookmark">
                      {title}
                    </Link>
                  </h4>
                </header>
                <p
                  style={{ margin: 0 }}
                  dangerouslySetInnerHTML={{ __html: node.frontmatter.spoiler }}
                />
                <p style={{ color: 'rgba(0,0,0,0.6)' }}>
                  {formatPostDate(node.frontmatter.date, 'en')}
                  {` • ${formatReadingTime(node.timeToRead)}`}
                </p>
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
