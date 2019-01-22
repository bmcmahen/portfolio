import React from 'react'
import { Link } from 'gatsby'
import './Index.css'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { InteractiveHeader } from '../components/InteractiveHeadline'
import { Browser } from '../components/Browser'
import { Navbar } from '../components/Navbar'
import { Website } from '../components/Portfolio/Website'

import watershedImage from '../components/Portfolio/watershed.png'

const IndexPage = () => (
  <div className="Index">
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

    <Layout>
      <div classname="Index" />

      <InteractiveHeader />
      <h1 style={{ textAlign: 'center', margin: '72px 72px' }}>
        Some recent projects
      </h1>
      <Website background={watershedImage} />
      <div>
        <h1>projects</h1>
        <div>Watershed</div>
        <div>
          Watershed is a course learning platform focused on collaboration and
          built using the Visual Teaching Strategy techniques. Annotations,
          Collaborative Canvas (timeline and the ability to see what other users
          added), Emphasis on small group collaboration, Real time chat and
          notifications.
        </div>
      </div>
      <div>
        Technologies - React front-end, express based Node.js server exposing a
        GraphQL API. Social login Stripe payments and subscriptions Websockets
        to handle notifications Apollo client Styled-components custom design
        system Postgres database
      </div>

      <div>Eugenics Archive</div>
      <div>
        The eugenics archive is a CURA funded project headed by Rob Wilson. We
        wanted to create a database that allowed us to collect and share
        relevant information about the project. But we wanted to create an
        experience that was exploratory and creative. SOmething that would allow
        the user to explore the content in unique ways.
      </div>
      <div>
        Technologies Clientside javascript application using native javascript
        API Express based Node.js server. MongoDB database.
        <div>Open source link</div>
        <div>libraries made for it</div>
      </div>

      <div>Roast Buddy</div>
      <div>Roast Buddy is built using React Native</div>

      <div>Contact me for more information.</div>
    </Layout>
  </div>
)

export default IndexPage
