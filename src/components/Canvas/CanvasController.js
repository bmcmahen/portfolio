import React from 'react'
import Keyframes from '../Keyframes'
import Canvas from './Canvas'
import './CanvasController.css'
import Waypoint from 'react-waypoint'
import Media from 'react-media'

function isTouchDevice() {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ')
  var mq = function(query) {
    return window.matchMedia(query).matches
  }

  if (
    'ontouchstart' in window ||
    (window.DocumentTouch && document instanceof window.DocumentTouch)
  ) {
    return true
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('')
  return mq(query)
}

export class CanvasController extends React.Component {
  container = React.createRef()

  canvas = React.createRef()

  static defaultProps = {
    color: 'white',
    keyframes: [],
    opacity: 0.8,
    disableOnTouch: true,
    mobileFrames: [],
  }

  state = {
    disabled: false,
    mouse: null,
    frames: [],
    width: null,
    entered: false,
    recordInput: false,
  }

  componentDidMount() {
    if (this.props.enableRecord) {
      document.addEventListener('keyup', this.onKeyUp)
    }

    const rect = this.container.current.getBoundingClientRect()

    this.setState({
      width: rect.width,
      height: rect.height,
      disabled: this.props.disableOnTouch && isTouchDevice(),
    })
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onKeyUp)
  }

  onKeyUp = e => {
    if (e.shiftKey && e.which === 82) {
      if (!this.state.recordInput) {
        this.positions = []
      }
      this.setState({ recordInput: !this.state.recordInput })
    }
  }

  onTouchMove = e => {
    // e.preventDefault()
    this.onMouseMove(e.changedTouches[0])
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
        pageX: e.pageX / this.state.width,
        pageY: e.pageY / this.state.height,
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
          onTouchMove={this.onTouchMove}
          onMouseMove={this.onMouseMove}
        >
          {this.props.children}
          {!this.state.disabled && (
            <Media query="(max-width: 500px)">
              {matches => (
                <Keyframes
                  shouldRun={this.state.entered}
                  frames={matches ? this.props.mobileFrames : frames}
                >
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
                              pageY: frame.pageY * this.state.height,
                              type: 'keyframes',
                            }
                      }
                    />
                  )}
                </Keyframes>
              )}
            </Media>
          )}
        </div>
      </Waypoint>
    )
  }
}
