import React from 'react'
import { Link, graphql } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../components/layout'
import './Blog.css'
import './prism-theme.css'
import { Navbar } from '../components/Navbar'
import { Social } from '../components/Contact'

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
          </div>
        </div>
        <div className="Blog_container">
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>

        <div className="Blog_bottom_border">
          <div className="Blog_meta_bottom">
            <a href="https://twitter.com/BenMcMahen/">Contact me on Twitter</a>{' '}
            with any thoughts or questions.
            <br />
            I'd love to hear from you.
            <div className="Blog_meta">
              <img alt="Ben" src={require('../components/me.jpg')} />
              <div>
                <div className="Blog_attribution">
                  <Link to="/">Ben McMahen</Link>
                </div>
                <div className="Blog_date">
                  I'm a web and mobile developer based in British Columbia. I
                  love creating beautiful, fun, and interactive tools.
                  <Social />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Blog_pagination">
          {previous && (
            <div className="Blog_next">
              <h4>Previously</h4>
              <div>
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              </div>
            </div>
          )}
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
        </div>
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
