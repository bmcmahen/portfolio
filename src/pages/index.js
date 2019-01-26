import React from 'react'
import './Index.css'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { InteractiveHeader } from '../components/InteractiveHeadline'
import { Website } from '../components/Portfolio/Website'
import eugenicsImage from '../components/Portfolio/eugenics.png'
import watershedImage from '../components/Portfolio/watershed.png'
import { Github } from '../components/Github'
import { ListSummary } from '../components/ListSummary'
import blur from '../components/Portfolio/blur.png'
import { graphql } from 'gatsby'
import { ListItem } from '../components/ListItem'
import { Contact, Social } from '../components/Contact'
import watershedVideo from './watershed.mp4'
import eugenicsVideo from './eugenics-archive.mp4'
import damme from '../images/damme-thumbs.jpg'

class IndexPage extends React.Component {
  state = {
    renderTotal: 5,
    successMessage: false,
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search)
    const success = urlParams.get('success')
    if (success) {
      this.setState({ successMessage: true })
    }
  }

  render() {
    const { data } = this.props

    return (
      <div className="Index">
        <SEO
          title=""
          keywords={[
            `Ben McMahen`,
            `full-stack`,
            `developer`,
            'javascript',
            'html',
            'css',
            'design',
            'freelance',
          ]}
        />

        <Layout>
          <div className="Index" />
          {this.state.successMessage && (
            <div className="Index__success">
              <img src={damme} alt="Van Damme thumbs up!" />
              <div>
                Thanks for your enquiry!
                <br /> I'll get back to you soon.
              </div>
            </div>
          )}
          <InteractiveHeader disableAnimation={this.state.successMessage} />
          <section id="portfolio">
            <h5 className="Index__center-header">Some recent projects</h5>
            <div className="Index__websites">
              <Website
                key="watershed"
                title="Watershed"
                linkLabel="watershed-ed.org"
                primaryLink="http://www.watershed-ed.org"
                video={watershedVideo}
                subtitle="A collaborative and interactive course delivery platform."
                task="To create a course delivery platform that embodied the
        best of Visual Thinking Strategies, which emphasizes observation and
        collaboration."
                solution="We created a course delivery system which can be thought of as a
        collaborative canvas. As you watch videos you are asked questions.
        You are encourage to annotate text, videos, and images.
        Visualizations aid in marking course progress and the interactions
        of your collaborators. The result is a highly dynamic, interactive
        course taking experience which updates visually as you use it.
        Everyone then, in a sense, builds their own course throughout the
        process."
                technology="Watershed uses React on the front-end and consumes an Express
        delivered GraphQL API on the backend. We utilize websockets to
        provide real-time chat functionality. We use Styled-components to
        develop our own design system."
                background={watershedImage}
              />

              <Website
                primaryLink="http://www.eugenicsarchive.ca"
                title="Eugenics archive"
                key="eugenics"
                enableRecord
                linkLabel="eugenicsarchive.ca"
                video={eugenicsVideo}
                subtitle="An exploratory database about the history of eugenics."
                task="The Living Archives on Eugenics project wanted to create a database of Eugenics related information, both its history in Canada and around the world, and its ongoing significance today."
                solution={
                  <span>
                    We decided to build a highly extensible and interactive
                    database that encourages users to explore the history in
                    their own way. Content in the database can partake in
                    different modules, like a{' '}
                    <a href="http://eugenicsarchive.ca/discover/timeline">
                      Timeline
                    </a>
                    ,{' '}
                    <a href="http://eugenicsarchive.ca/discover/connections/">
                      MindMap
                    </a>{' '}
                    or{' '}
                    <a href="http://eugenicsarchive.ca/discover/world">Globe</a>
                    , which reveals different connections between database
                    entries. It’s easy to switch between these modules to
                    explore different contexts. We also developed a more
                    traditional database interface to allow team members to
                    input and edit content and include content in different
                    modules.
                  </span>
                }
                technology={
                  <span>
                    The Eugenics Archive uses an Express hosted backend backed
                    with a MongoDB database. The front end is a javascript
                    application built entirely with smaller modules, with an
                    emphasis on using native dom interfaces. We built many
                    libraries in the process, including{' '}
                    <a href="https://github.com/bmcmahen/image-zoom">
                      image-zoom
                    </a>
                    , <a href="https://github.com/bmcmahen/tour">tour</a>,{' '}
                    <a href="https://github.com/bmcmahen/transit">transit</a>,
                    <a href="https://github.com/bmcmahen/network">network</a>,
                    and{' '}
                    <a href="https://github.com/bmcmahen/transit">youtube</a>.
                  </span>
                }
                background={eugenicsImage}
              />
            </div>
          </section>

          <section
            style={{
              position: 'relative',
              backgroundImage: `url(${blur})`,
            }}
            className="Index__lists"
          >
            <Github
              username="bmcmahen"
              repos={
                data.allGithubData.edges[0].node.data.viewer.pinnedRepositories
                  .edges
              }
            />

            <ListSummary id="blog" title="Blogging">
              {data.allMarkdownRemark.edges
                .slice(0, this.state.renderTotal)
                .map(({ node }) => {
                  const title = node.frontmatter.title || node.fields.slug
                  return (
                    <ListItem
                      key={node.fields.slug}
                      title={title}
                      to={node.fields.slug}
                    >
                      <div style={{ flex: '0 0 auto' }}>
                        {node.frontmatter.date}
                      </div>
                    </ListItem>
                  )
                })}
              {data.allMarkdownRemark.edges.length > 5 && (
                <div className="Index__show-more-container">
                  <button
                    onClick={() =>
                      this.setState({
                        renderTotal: this.state.renderTotal + 5,
                      })
                    }
                    className="Index__show_more"
                  >
                    Show more
                  </button>
                </div>
              )}
            </ListSummary>

            {/*
            <LeftArrow
              style={{
                position: 'absolute',
                left: 0,
                fill: '#60617b',
                width: '100%',
                bottom: 0,
              }}
            />
            */}
          </section>

          <section id="contact">
            <div className="Index__contact">
              <div>
                <div className="Index__contact-boxes">
                  <div className="Index__contact-social">
                    <h3>I'm available for hire</h3>
                    <p>
                      Having spent much of my time working with small teams,
                      I've been forced to wear many hats and develop many
                      different skillsets. I specialize in{' '}
                      <strong>front end development</strong> with technologies
                      like <strong>react</strong>, but I also have experience
                      working on the <strong>server</strong> having used node.js
                      to host <strong>express</strong> applications, build{' '}
                      <strong>graphql apis</strong>, and interface with{' '}
                      <strong>mongodb</strong> and <strong>postgres</strong>.
                      I've also built numerous iOS and Android applications
                      using <strong>react native</strong>.
                    </p>
                    <p>
                      Beyond that, I also have experience creating{' '}
                      <strong>design systems</strong>, working with{' '}
                      <strong>html</strong> and <strong>css</strong>, in
                      addition to improving <strong>seo</strong>,{' '}
                      <strong>accessibility</strong>, and{' '}
                      <strong>writing copy</strong>.
                    </p>
                    <p>
                      Above all, I love building innovative and intuitive
                      products that help people learn and connect. If you share
                      a similar passion, please contact me through social media
                      or the contact form.
                    </p>
                    <Social />
                  </div>

                  <Contact />
                </div>
              </div>
            </div>
          </section>
        </Layout>
      </div>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allGithubData {
      edges {
        node {
          data {
            viewer {
              pinnedRepositories {
                edges {
                  node {
                    name
                    description
                    url
                    stargazers {
                      totalCount
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
          }
        }
      }
    }
  }
`
