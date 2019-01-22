import React from 'react'
import { Browser } from '../Browser'
import Canvas from '../Canvas/Canvas'
import './Website.css'

export class Website extends React.Component {
  state = {
    mouse: null,
  }

  canvas = React.createRef()

  onMouseMove = e => {
    if (this.state.recordInput) {
      const oldTime = this.time
      const newTime = new Date()

      if (this.positions.length > 0) {
        this.positions[this.positions.length - 1].delay =
          newTime.getTime() - oldTime.getTime()
      }

      this.positions.push({
        pageX: e.pageX,
        pageY: e.pageY,
      })

      this.time = newTime

      window.positions = this.positions
    }
    this.setState({
      mouse: {
        pageX: e.pageX,
        pageY: e.pageY,
        type: 'mouse',
      },
    })
  }

  render() {
    const { background } = this.props
    const { mouse } = this.state
    return (
      <div className="Website">
        <div
          onMouseMove={this.onMouseMove}
          style={{ position: 'relative', height: '400px', overflow: 'hidden' }}
        >
          <Browser background={background} />

          <Canvas
            innerRef={this.canvas}
            color="white"
            style={{
              pointerEvents: 'none',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              opacity: 0.8,
            }}
            mouse={mouse}
          />
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
