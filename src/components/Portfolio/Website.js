import React from 'react'
import { Browser } from '../Browser'
import Canvas from '../Canvas/Canvas'
import './Website.css'
import { CanvasController } from '../Canvas/CanvasController'

export class Website extends React.Component {
  render() {
    const { background, title, subtitle } = this.props

    return (
      <div className="Website">
        <div className="Website__preview">
          <div className="label">
            {title && <h4>{title}</h4>}
            {subtitle && <div className="lead">{subtitle}</div>}
          </div>
          <CanvasController>
            <Browser background={background} />
          </CanvasController>
        </div>
        <div className="Website__content">
          <h6>Task</h6>
          <p>
            We wanted to create a course delivery platform that embodied the
            best of Visual Teaching Strategies, which emphasizes observation and
            collaboration.
          </p>
          <h6>Solution</h6>
          <p>
            We created a course delivery system which can be thought of as a
            collaborative canvas. As you watch videos you are asked questions.
            You are encourage to annotate text, videos, and images.
            Visualizations aid in marking course progress and the interactions
            of your collaborators. The result is a highly dynamic, interactive
            course taking experience which updates visually as you use it.
            Everyone then, in a sense, builds their own course throughout the
            process.
          </p>
          <h6>Technology</h6>
          <p>
            Watershed uses React on the front-end and consumes an Express
            delivered GraphQL API on the backend. We utilize websockets to
            provide real-time chat functionality. We use Styled-components to
            develop our own design system.
          </p>
        </div>
      </div>
    )
  }
}
