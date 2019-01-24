import React from 'react'
import Keyframes from '../Keyframes'
import Canvas from './Canvas'
import './CanvasController.css'
import Waypoint from 'react-waypoint'

export class CanvasController extends React.Component {
  container = React.createRef()

  canvas = React.createRef()

  static defaultProps = {
    color: 'white',
    keyframes: [],
    opacity: 0.8,
  }

  state = {
    mouse: null,
    frames: [],
    width: null,
    entered: false,
    recordInput: false,
  }

  componentDidMount() {
    this.container.current.addEventListener('keyup', this.onKeyUp)
    this.setState({
      width: window.innerWidth,
    })
  }

  componentWillUnmount() {
    this.container.current.removeEventListener('keyup', this.onKeyUp)
  }

  onKeyUp = e => {
    if (e.shiftKey && e.which === 82) {
      this.setState({ recordInput: !this.state.recordInput })
    }
  }

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

  onWaypointEnter = () => {
    this.setState({
      entered: true,
      frames: this.props.keyframes,
    })

    if (this.canvas.current) {
      this.canvas.current.startRunning()
    }
  }

  onWaypointLeave = () => {
    if (this.canvas.current) {
      this.canvas.current.stopRunning()
    }
  }

  render() {
    const { color, containerStyle, canvasStyle } = this.props
    const { frames, mouse } = this.state

    return (
      <Waypoint onLeave={this.onWaypointLeave} onEnter={this.onWaypointEnter}>
        <div
          ref={this.container}
          className="CanvasController"
          style={containerStyle}
          onMouseMove={this.onMouseMove}
        >
          {this.props.children}
          <Keyframes shouldRun={this.state.entered} frames={frames}>
            {(frame, finished) => (
              <Canvas
                color={color}
                ref={this.canvas}
                opacity={this.props.opacity}
                style={canvasStyle}
                className="CanvasController__canvas"
                mouse={
                  finished || !this.state.width || !frame
                    ? mouse
                    : {
                        pageX: frame.pageX * this.state.width,
                        pageY: frame.pageY * 700,
                        type: 'keyframes',
                      }
                }
              />
            )}
          </Keyframes>
        </div>
      </Waypoint>
    )
  }
}
