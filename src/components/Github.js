import React from 'react'
import './Github.css'
import { ListSummary } from './ListSummary'
import { ListItem } from './ListItem'
import { Repo } from './repos/Repo'

export class Github extends React.Component {
  static defaultProps = {
    username: 'bmcmahen',
    repos: [],
  }

  render() {
    return (
      <div>
        <div className="Github__more">
          <Repo
            image={require('./repos/gesture-responder.png')}
            name="React Gesture Responder"
            url="https://react-gesture-responder.netlify.com/"
            description="A responder system for your react application which allows you to build complex gesture based interfaces."
          />

          <Repo
            image={require('./repos/toasted-notes.jpg')}
            name="Toasted Notes"
            url="https://toasted-notes.netlify.com/"
            description="Beautiful, simple, & configurable toast notifications with an imperative API."
          />

          <Repo
            image={require('./repos/grid-dnd.png')}
            name="React Grid DND"
            url="https://github.com/bmcmahen/react-grid-dnd"
            description="Drag and drop, grid edition. Supports multiple drop zones and touch devices."
          />

          <Repo
            image={require('./repos/gesture-gallery.png')}
            name="Gesture Gallery"
            url="https://github.com/bmcmahen/react-gesture-gallery"
            description="An image gallery that supports touch gestures and lazy loading."
          />

          <Repo
            image={require('./repos/zoom.jpg')}
            name="React Image Enlarger"
            url="https://github.com/bmcmahen/react-image-enlarger"
            description="Medium.com style image zooming with gesture dismissals."
          />

          {/* <Repo
            image={require('./repos/pager.jpg')}
            name="React Page Controller"
            url="https://github.com/bmcmahen/react-page-controller"
            description="Swipeable views for creating carousels, galleries, or tab content."
          /> */}

          <Repo
            image={require('./repos/stack.jpg')}
            name="React Gesture Stack"
            url="https://github.com/bmcmahen/react-gesture-stack"
            description="iOS style stack navigation built for the web."
          />
        </div>
        <div
          style={{ margin: '7rem 0 3rem 0' }}
          className="Index__show-more-container"
        >
          <a href="http://github.com/bmcmahen" className="Index__show_more">
            More on GitHub
          </a>
        </div>
      </div>
    )
  }

  renderContent() {
    return this.props.repos.map(repo => {
      const { node } = repo

      return (
        <ListItem
          title={node.name}
          subtitle={node.description}
          href={node.url}
          className="Github__repo"
          key={node.name}
        >
          <div className="Github__star">
            <div className="Github__star_count">
              {node.stargazers.totalCount}
            </div>
            <Star />
          </div>
        </ListItem>
      )
    })
  }
}

const Star = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-star"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)
