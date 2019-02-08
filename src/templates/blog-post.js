import React from 'react'
import { Link, graphql } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../components/layout'
import './Blog.css'
import './prism-theme.css'
import { Navbar } from '../components/Navbar'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    // const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout>
        <Navbar dark breadcrumb="blog" />
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <div
          style={{
            position: 'relative',
          }}
          className="Blog_heading"
        >
          <div>
            <h1>{post.frontmatter.title}</h1>
            <div className="Blog_date">{post.frontmatter.date}</div>
            <div style={{ textAlign: 'center', paddingBottom: '1rem' }}>
              <strong>
                Posted by <Link to="/">Ben McMahen</Link>
              </strong>
            </div>
          </div>
        </div>
        <div className="Blog_container">
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>

        {next && (
          <div className="Blog_next">
            <h4>Up next</h4>
            <div>
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            </div>
          </div>
        )}
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
      excerpt
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
    }
  }
`
