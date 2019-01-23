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

const IndexPage = ({ data }) => (
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
          subtitle="A collaborative course delivery platform"
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
        <LeftArrow
          style={{
            position: 'absolute',
            left: 0,
            width: '100%',
            top: 0,
            transform: 'rotate(180deg)',
          }}
        />

        <Github
          username="bmcmahen"
          repos={[
            'toasted-notes',
            'image-zoom',
            'scroll-creep',
            'selection-range',
          ]}
        />

        <ListSummary
          title="Blog posts"
          subtitle="The Sisyphian endeavour in maintaining a blog"
        >
          {data.allMarkdownRemark.edges.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return <div key={node.fields.slug}>{title}</div>
          })}
        </ListSummary>
      </div>
    </Layout>
  </div>
)

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
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
