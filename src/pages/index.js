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
import { CanvasController } from '../components/Canvas/CanvasController'

const contactKeyframes = JSON.parse(
  `[{"pageX":0.0658578856152513,"pageY":4.687931892310244,"delay":34},{"pageX":0.09792027729636049,"pageY":4.677317706893692,"delay":17},{"pageX":0.12478336221837089,"pageY":4.6720106141854165,"delay":16},{"pageX":0.16291161178509533,"pageY":4.661396428768865,"delay":16},{"pageX":0.20537261698440207,"pageY":4.654320305157831,"delay":17},{"pageX":0.23483535528596186,"pageY":4.649013212449555,"delay":17},{"pageX":0.2668977469670711,"pageY":4.647244181546796,"delay":31},{"pageX":0.3188908145580589,"pageY":4.647244181546796,"delay":20},{"pageX":0.3362218370883882,"pageY":4.647244181546796,"delay":15},{"pageX":0.35181975736568455,"pageY":4.647244181546796,"delay":16},{"pageX":0.3613518197573657,"pageY":4.649013212449555,"delay":33},{"pageX":0.37694974003466203,"pageY":4.649013212449555,"delay":18},{"pageX":0.3804159445407279,"pageY":4.650782243352314,"delay":15},{"pageX":0.3821490467937608,"pageY":4.650782243352314,"delay":19},{"pageX":0.3830155979202773,"pageY":4.650782243352314,"delay":18},{"pageX":0.38388214904679374,"pageY":4.650782243352314,"delay":15},{"pageX":0.38388214904679374,"pageY":4.650782243352314,"delay":34},{"pageX":0.38388214904679374,"pageY":4.652551274255072,"delay":33},{"pageX":0.38388214904679374,"pageY":4.652551274255072,"delay":18},{"pageX":0.3821490467937608,"pageY":4.654320305157831,"delay":19},{"pageX":0.37435008665511266,"pageY":4.663165459671624,"delay":19},{"pageX":0.35268630849220106,"pageY":4.687931892310244,"delay":15},{"pageX":0.3266897746967071,"pageY":4.712698324948864,"delay":20},{"pageX":0.29462738301559793,"pageY":4.733926695781967,"delay":23},{"pageX":0.25476603119584057,"pageY":4.753386035712311,"delay":19},{"pageX":0.19410745233968804,"pageY":4.776383437448173,"delay":19},{"pageX":0.14818024263431542,"pageY":4.7958427773785175,"delay":17},{"pageX":0.1195840554592721,"pageY":4.806456962795068,"delay":18},{"pageX":0.10051993067590988,"pageY":4.81707114821162,"delay":20},{"pageX":0.09098786828422877,"pageY":4.822378240919896,"delay":19},{"pageX":0.07712305025996534,"pageY":4.831223395433689,"delay":22},{"pageX":0.07105719237435008,"pageY":4.836530488141965,"delay":21},{"pageX":0.06759098786828423,"pageY":4.840068549947482,"delay":18},{"pageX":0.06499133448873484,"pageY":4.841837580850241,"delay":20},{"pageX":0.06412478336221837,"pageY":4.843606611752999,"delay":16},{"pageX":0.06412478336221837,"pageY":4.843606611752999,"delay":26},{"pageX":0.06412478336221837,"pageY":4.843606611752999,"delay":91},{"pageX":0.06412478336221837,"pageY":4.841837580850241,"delay":29},{"pageX":0.0779896013864818,"pageY":4.827685333628172,"delay":25},{"pageX":0.16204506065857885,"pageY":4.781690530156449,"delay":21},{"pageX":0.24003466204506066,"pageY":4.751617004809553,"delay":24},{"pageX":0.36048526863084923,"pageY":4.725081541268174,"delay":18},{"pageX":0.43847487001733104,"pageY":4.721543479462657,"delay":28},{"pageX":0.4930675909878683,"pageY":4.721543479462657,"delay":22},{"pageX":0.5181975736568457,"pageY":4.728619603073692,"delay":21},{"pageX":0.5216637781629117,"pageY":4.7321576648792085,"delay":22},{"pageX":0.5225303292894281,"pageY":4.733926695781967,"delay":23},{"pageX":0.5225303292894281,"pageY":4.737464757587484,"delay":21},{"pageX":0.5164644714038128,"pageY":4.742771850295759,"delay":27},{"pageX":0.4852686308492201,"pageY":4.765769252031621,"delay":24},{"pageX":0.4055459272097054,"pageY":4.818840179114379,"delay":24},{"pageX":0.29636048526863085,"pageY":4.889601415224722,"delay":30},{"pageX":0.22010398613518198,"pageY":4.944441373210238,"delay":23},{"pageX":0.17677642980935876,"pageY":4.97982199126541,"delay":22},{"pageX":0.15424610051993068,"pageY":4.993974238487478,"delay":25},{"pageX":0.1412478336221837,"pageY":5.002819393001271,"delay":24},{"pageX":0.13084922010398614,"pageY":5.009895516612306,"delay":22},{"pageX":0.12478336221837089,"pageY":5.013433578417823,"delay":26},{"pageX":0.12391681109185441,"pageY":5.013433578417823,"delay":93},{"pageX":0.12738301559792028,"pageY":5.008126485709547,"delay":27},{"pageX":0.134315424610052,"pageY":4.997512300292995,"delay":25},{"pageX":0.1412478336221837,"pageY":4.99220520758472,"delay":23},{"pageX":0.14471403812824957,"pageY":4.9851290839736855}]`
)

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
          <section id="portfolio">
            <h3 className="Index__center-header">Some recent projects</h3>
            <div className="Index__websites">
              <Website
                title="Watershed"
                linkLabel="watershed-ed.org"
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
                linkLabel="eugenicsarchive.ca"
                video="/static/eugenics-archive.mp4"
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
            id="blog"
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
          </section>

          <CanvasController
            // color="#5c5f7f"
            enableRecord
            color="rgb(239, 242, 245)"
            opacity={0.9}
            keyframes={contactKeyframes}
          >
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
                        working on the <strong>server</strong> having used
                        node.js to host <strong>express</strong> applications,
                        build <strong>graphql apis</strong>, and interface with{' '}
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
            </section>
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
