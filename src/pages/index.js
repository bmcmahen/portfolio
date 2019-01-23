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
import { LeftArrow } from '../components/Dividers'
import { graphql } from 'gatsby'
import { ListItem } from '../components/ListItem'
import { Contact, Social } from '../components/Contact'
import { CanvasController } from '../components/Canvas/CanvasController'

class IndexPage extends React.Component {
  state = {
    renderTotal: 5,
  }
  render() {
    const { data } = this.props

    return (
      <div className="Index">
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

        <Layout>
          <div classname="Index" />

          <InteractiveHeader />
          <h3 style={{ textAlign: 'center', margin: '72px 72px' }}>
            Some recent projects
          </h3>
          <div className="Index__websites">
            <Website
              title="Watershed"
              primaryLink="http://www.watershed-ed.org"
              video="/static/watershed.mp4"
              subtitle="A collaborative and interactive course delivery platform."
              task="We wanted to create a course delivery platform that embodied the
        best of Visual Teaching Strategies, which emphasizes observation and
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
              video="/static/eugenics-archive.mp4"
              subtitle="An exploratory database about the history of eugenics"
              task="Ad consequat voluptate pariatur eu nostrud eu in ullamco magna. Cillum incididunt veniam reprehenderit irure eiusmod quis veniam aliquip excepteur. Lorem dolore laboris id ex ea et quis amet est sunt. Enim cillum sit amet reprehenderit non deserunt cupidatat eiusmod. Minim elit ut esse labore. Eiusmod anim adipisicing ad excepteur."
              solution="Labore aute sit non ad sit. Officia deserunt adipisicing mollit consequat enim officia reprehenderit velit. Mollit exercitation occaecat aute veniam quis adipisicing. Id adipisicing laborum dolor officia ut nulla officia Lorem sint ullamco pariatur. Velit duis ad ex do minim cupidatat id minim veniam amet nulla veniam esse. Id mollit ullamco non qui pariatur eiusmod minim laboris deserunt. Voluptate Lorem nisi nulla eu voluptate."
              technology="Aliqua fugiat adipisicing nulla in velit. Anim eu pariatur consectetur pariatur sit tempor eu nisi ea dolore sunt excepteur. Adipisicing fugiat incididunt proident tempor."
              background={eugenicsImage}
            />
          </div>

          <div
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

            <ListSummary title="Blogging">
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
          </div>

          <CanvasController
            // color="#5c5f7f"
            color="rgb(239, 242, 245)"
            opacity={1}
            keyframes={[]}
          >
            <div>
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
                        working on the <strong>server side</strong> having built
                        numerous servers in node.js to host{' '}
                        <strong>express</strong> applications, build{' '}
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
                        products that help people learn and connect. If you
                        share a similar passion, please contact me through
                        social media or the contact form.
                      </p>
                      <Social />
                    </div>

                    <Contact />
                  </div>
                </div>
              </div>
            </div>
          </CanvasController>
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
