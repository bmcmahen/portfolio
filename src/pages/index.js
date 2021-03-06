import React from 'react'
import './Index.css'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { InteractiveHeader } from '../components/InteractiveHeadline'
import { Website } from '../components/Portfolio/Website'
import eugenicsImage from '../components/Portfolio/eugenics-2.jpg'
import watershedImage from '../components/Portfolio/watershed.png'
import { Github } from '../components/Github'
import blur from '../components/Portfolio/blur-bright.jpg'
import { graphql } from 'gatsby'
import { ListItem } from '../components/ListItem'
import { Social } from '../components/Contact'
import { Hint } from '../components/Portfolio/Hint'
import { LeftArrow, Divider3 } from '../components/Dividers'
import { ListSummary } from '../components/ListSummary'
import buddy from '../components/Portfolio/buddy.jpg'
import roastBuddyImage from '../components/Portfolio/roast-buddy.jpg'

class IndexPage extends React.Component {
  state = {
    renderTotal: 5,
    successMessage: false,
  }

  render() {
    const { data } = this.props

    return (
      <div className="Index">
        <SEO
          title={'Portfolio'}
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

          <InteractiveHeader disableAnimation={this.state.successMessage} />

          <section id="portfolio">
            <div className="Index__coffee">
              <Hint />
              <div
                style={{
                  width: '200px',
                  borderRadius: '50%',
                }}
              />
            </div>

            <h5 className="Index__center-header">Some recent projects</h5>

            <div className="Index__websites">
              <Website
                key="captioner"
                title="Captioner"
                linkLabel="captioner.app"
                primaryLink="http://captioner.app"
                subtitle="Create captions directly in your web browser."
                task={`To build an elegant and intuitive way to create captions for local mp4 videos, YouTube videos, or Vimeo videos, and be able to export these captions to SRT files.`}
                solution={
                  'Captioner loops through segments of videos until you have captioned it. The interface makes it intuitive to switch between captions, alter their start and end time, and create new ones. The timeline offers an interactive visualization of the entire project, providing a visual indication as to the word per minute ratio of each caption, warning authors when this ratio is too high.'
                }
                technology={
                  <span>
                    I use my design system,{' '}
                    <a href="http://www.sancho-ui.com">Sancho-UI</a>, to achieve
                    an accessible and interactive design. React and Typescript
                    are used on the front-end code, while I make use of Firebase
                    for its authorization and database features.
                  </span>
                }
                background={require('../components/Portfolio/captioner.jpg')}
              />
              <Website
                key="watershed"
                title="Watershed"
                linkLabel="watershed-ed.org"
                primaryLink="http://www.watershed-ed.org"
                // video={watershedVideo}
                subtitle="A collaborative and interactive course delivery platform."
                task={
                  <span>
                    To create a course delivery platform that embodies the best
                    of{' '}
                    <a href="https://vtshome.org/">
                      Visual Thinking Strategies
                    </a>
                    , which emphasizes learning through collaboration and
                    observation.
                  </span>
                }
                solution="Our course delivery system operates as a collaborative canvas in which the user is encouraged to actively engage with course materials and their peers. As you engage with video, documents and images, you are asked questions and encouraged to create annotations. We use timeline visualizations that mark course progress and highlight interactions with your collaborators. The result is a highly dynamic, interactive course taking experience that visually reflects your contributions to the course."
                technology="Watershed uses React on the front-end and consumes an Express
        delivered GraphQL API on the backend. We utilize websockets to
        provide real-time chat functionality, Postgres and Redis for databases, and we use styled-components to
        develop our own design system."
                background={watershedImage}
              />

              <Website
                key="julienne"
                title="Julienne"
                linkLabel="julienne.app"
                primaryLink="http://julienne.app"
                subtitle="The easiest way to share recipes with family and friends."
                task={`To build an elegant way to maintain a shared recipe collection with family and friends.`}
                solution={
                  'Each user of Julienne can maintain their own recipe collection, but they can also follow other users. You can then view the recipe collection of each user, or you can search the entire collection of recipes for all of the users you are following. The user interface is responsive, and works well on both mobile and desktop devices.'
                }
                technology={
                  <span>
                    Julienne uses my design system,{' '}
                    <a href="http://www.sancho-ui.com">Sancho-UI</a> to create a
                    responsive and accessible design. Firebase is used to manage
                    authorization and data persistence. React and Typescript are
                    used to build all of the front-end code.
                  </span>
                }
                background={require('../components/Portfolio/julienne.jpg')}
              />

              <Website
                primaryLink="http://www.eugenicsarchive.ca"
                title="Eugenics archive"
                key="eugenics"
                enableRecord
                linkLabel="eugenicsarchive.ca"
                // video={eugenicsVideo}
                subtitle="An exploratory database about the history of eugenics."
                task="The Living Archives on Eugenics project wanted to create a database of eugenics related information pertaining to its history in Canada and around the world and its continued significance today."
                solution={
                  <span>
                    Our extensible and interactive database encourages users to
                    explore the topic of eugenics in their own way. Content in
                    the database can partake in different modules, like a{' '}
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
                    <a href="https://github.com/bmcmahen/transit">transit</a>,{' '}
                    <a href="https://github.com/bmcmahen/network">network</a>,{' '}
                    and{' '}
                    <a href="https://github.com/bmcmahen/transit">youtube</a>.
                  </span>
                }
                background={eugenicsImage}
              />

              <Website
                primaryLink="https://github.com/bmcmahen/roast-buddy-react-native"
                title="Roast Buddy"
                key="roastbuddy"
                useBrowser={false}
                linkLabel="github.com"
                // video={eugenicsVideo}
                subtitle="Your coffee roasting companion."
                task="To introduce people to roasting their own coffee and help them perfect recipes."
                solution={
                  <span>
                    Roast Buddy provides two primary functions: a recorder used
                    to document various roast experiments, and a database which
                    contains past recordings. Users can enter tasting notes,
                    reviews, and favourite successful roasts. A user can
                    reference past recordings and their variations to help
                    improve future roasts. An account isn't necessary, but if a
                    user does decide to create an account their content will be
                    synced across devices.
                  </span>
                }
                technology={
                  <span>
                    Roast Buddy is built using react-native and redux, and it
                    works on both iOS and android devices. It's designed using
                    my{' '}
                    <a href="https://github.com/panza-org/panza">
                      react-native design system
                    </a>{' '}
                    to help emulate iOS appearances. The server architecture is
                    a simple express based node.js REST api.
                  </span>
                }
                background={roastBuddyImage}
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
            <div
              style={{
                position: 'absolute',
                top: '-1px',
                left: 0,
                pointerEvents: 'none',
                transform: 'rotate(180deg)',
                width: '100%',
              }}
            >
              <LeftArrow fill="white" />
            </div>

            <h5 className="Index__center-header">Open source</h5>

            <Website
              primaryLink="http://www.sancho-ui.com"
              title="Sancho-UI"
              key="sancho"
              linkLabel="sancho-ui.com"
              subtitle="A design system built with React, Typescript, and Emotion."
              task="To create an accessible, responsive and beautiful design system to quickly prototype React-based applications."
              solution={
                <span>
                  Sancho aims to treat the mobile experience as a first-class
                  citizen, and therefore offers a set of components that work
                  equally well on all devices. Accessibility is also a priority.
                  All components are fully keyboard accessible and follow
                  wai-aria guidelines. The visual appearance of Sancho is based
                  upon my individual preferences, and incorporates my favourite
                  aspects of Material UI, Bootstrap, and Evergreen.
                </span>
              }
              technology={
                <span>
                  Sancho is built using Typescript, React, and Emotion. Emotion
                  (a popular CSS-in-JS library) provides predictable
                  composition, allowing users to easily customize components. We
                  also make heavy use of{' '}
                  <a href="react-spring.io">react-spring</a> for building fluid,
                  performant animations.
                </span>
              }
              background={require('../components/Portfolio/sancho.jpg')}
            />
            <Github username="bmcmahen" />
          </section>

          <section
            style={{
              position: 'relative',
              background: 'rgb(43, 63, 86)',
            }}
            className="Index__lists"
          >
            <div
              style={{
                position: 'absolute',
                bottom: 'calc(100% - 1px)',
                left: 0,
                pointerEvents: 'none',
                width: '100%',
              }}
            >
              <LeftArrow fill="#263f58" />
            </div>
            <h5
              style={{ marginTop: 0, color: 'white' }}
              className="Index__center-header"
            >
              Recent blog posts
            </h5>
            <ListSummary>
              {data.allMarkdownRemark.edges
                .slice(0, this.state.renderTotal)
                .map(({ node }) => {
                  const title = node.frontmatter.title || node.fields.slug
                  return (
                    <ListItem
                      key={node.fields.slug}
                      title={title}
                      to={node.fields.slug}
                      subtitle={node.frontmatter.spoiler || node.excerpt}
                      date={node.frontmatter.date}
                    />
                  )
                })}
            </ListSummary>
            <div style={{ textAlign: 'center' }}>
              <a href="/blog" className="Index__show_more">
                Show more
              </a>
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '-1px',
                left: 0,
                pointerEvents: 'none',
                width: '100%',
              }}
            >
              <Divider3 fill="white" />
            </div>
          </section>

          <section id="contact">
            <div className="Index__contact">
              <div>
                <div className="Index__contact-boxes">
                  <div>
                    <img
                      style={{
                        marginTop: '3rem',
                        height: 'auto',
                        borderRadius: '1rem',
                        width: '400px',
                      }}
                      src={buddy}
                      alt="Me and buddy, a dog"
                    />
                  </div>
                  <div className="Index__contact-social">
                    <h3>A bit about me</h3>

                    <p>
                      Hey folks, I’m a developer and designer currently living
                      in British Columbia, Canada. My primary education is
                      actually in history and philosophy, having gained a
                      masters degree in philosophy from the University of
                      Alberta, but my most <em>employable</em> skill is as a
                      coder and designer. I love dogs, peanut butter, coffee,
                      plaid, mountain biking, and pretty much anything design
                      related.
                    </p>
                    <p>
                      As a result of having spent most of my career working with
                      smaller teams, I’ve had to wear many hats and develop
                      different skillsets. I specialize in front-end development
                      and design, in particular anything React related, but my
                      skillset more broadly includes server-side technologies
                      (like node.js, Postgres, and GraphQL) and I’ve built
                      numerous iOS and android applications using react-native.
                    </p>
                    <p>
                      Beyond that, I have experience developing design systems,
                      working with html and css, and I’m familiar with best
                      practices with regards to seo and accessibility.{' '}
                    </p>
                    <p>
                      Above all, I love building innovative and intuitive
                      products that help people learn and connect. If you share
                      a similar passion, please contact me through{' '}
                      <a href="https://twitter.com/BenMcMahen">twitter</a> or{' '}
                      <a href="mailto:ben.mcmahen@gmail.com">email me</a>. I’m
                      always happy to grab a coffee or beer. I’ll buy!
                    </p>

                    <Social />
                  </div>
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
            spoiler
          }
        }
      }
    }
  }
`
