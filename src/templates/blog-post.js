import React from 'react'
import { Link, graphql } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../components/layout'
import './Blog.css'
import './prism-theme.css'

import { LeftArrow } from '../components/Dividers'
import { Navbar } from '../components/Navbar'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    // const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout>
        <Navbar dark />
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <div
          style={{
            position: 'relative',
          }}
          className="Blog_heading"
        >
          <div>
            <h3>{post.frontmatter.title}</h3>
            <div className="Blog_date">{post.frontmatter.date}</div>
          </div>
        </div>
        <div className="Blog_container">
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
