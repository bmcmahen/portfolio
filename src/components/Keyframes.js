import React from 'react'
// keys = { x, y, delay }

export default class Keyframes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      frameNum: 0,
      finished: false,
    }

    this.timer = null
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { frameNum, finished } = nextState
  //   if (this.state.finished !== finished) return true
  //   if (this.state.frameNum === frameNum) {
  //     return false
  //   }
  //   return fameNum >= 0 && frameNum < this.props.frames.length
  // }

  componentDidMount() {
    if (this.props.shouldRun) {
      this.requestNextFrame()
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.state.finished && this.props.shouldRun) {
      this.requestNextFrame()
    } else if (!prevProps.shouldRun && this.props.shouldRun) {
      this.requestNextFrame()
    }
  }

  render() {
    const frame = this.getFrame()
    return this.props.children(frame, this.state.finished)
  }

  requestNextFrame() {
    if (!this.props.frames.length) return

    this.waitForDelay(() => {
      const frameNum = this.state.frameNum + 1

      if (frameNum <= this.props.frames.length) {
        this.setState({ frameNum })
      } else {
        this.setState({ finished: true })
      }
    })
  }

  waitForDelay(fn) {
    const currentFrame = this.getFrame()
    if (!currentFrame) {
      return this.setState({ finished: true })
    }
    const delay = currentFrame.delay || 0
    clearTimeout(this.timer)
    this.timer = setTimeout(fn, delay)
  }

  getFrame() {
    if (!this.props.shouldRun) {
      return null
    }
    return this.props.frames[this.state.frameNum]
  }
}
