import React from 'react'
// keys = { x, y, delay }

export default class Keyframes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      frameNum: 0,
      finished: props.frames.length === 0 ? true : false,
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
    this.requestNextFrame()
  }

  componentDidUpdate() {
    this.requestNextFrame()
  }

  render() {
    const frame = this.getFrame()
    return this.props.children(frame, this.state.finished)
  }

  requestNextFrame() {
    if (!this.props.frames.length) return
    this.waitForDelay(() => {
      const frameNum = this.state.frameNum + 1
      if (this.props.frames.length <= frameNum) {
        this.setState({ frameNum })
      } else {
        this.setState({ finished: true })
      }
    })
  }

  waitForDelay(fn) {
    const currentFrame = this.getFrame()
    const delay = currentFrame.delay
    clearTimeout(this.timer)
    this.timer = setTimeout(fn, delay)
  }

  getFrame() {
    return this.props.frames[this.state.frameNum]
  }
}
