import React from 'react'
import debounce from 'lodash.debounce'
import './Canvas.css'

class Keyframes {
  constructor(frames = []) {
    this.frames = frames
    this.current = 0
  }

  start = () => {
    this.then = Date.now()
  }

  next = () => {
    const current = this.frames[this.current]

    if (!current || !current.delay) {
      return false
    }

    this.now = Date.now()
    const elapsed = this.now - this.then
    if (elapsed >= current.delay) {
      this.then = Date.now()
      this.current += 1
      return current
    }

    return true
  }
}

export default class CanvasEraser extends React.Component {
  static defaultProps = {
    responsive: true,
  }

  constructor(props) {
    super(props)
    this.state = {
      lastMouse: null,
    }

    this.startKeyframes(props)

    this.resizeCanvasDb = debounce(this.resizeCanvas, 100)
    this.debouncedStop = debounce(this.stopRunning, 500)
  }

  startKeyframes(props) {
    if (props.keyframes) {
      this.keyframes = new Keyframes(props.keyframes)
      this.keyframes.start()
    }
  }

  componentDidMount() {
    this.resizeCanvas()
    // this.update()
    // resizing the canvas effectively wipes user input, which isn't ideal
    // window.addEventListener('resize', this.resizeCanvasDb)
  }

  componentWillUnmount() {
    this.stopRunning()
  }

  startRunning() {
    this.cancel = false
    this.update()
  }

  stopRunning() {
    this.setState({ lastMouse: null })
    window.cancelAnimationFrame(this.update)
    this.cancel = true
  }

  resizeCanvas = () => {
    const parent = this.refs.canvas.parentNode
    this.resize(parent.clientWidth, parent.clientHeight)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.keyframes !== this.props.keyframes) {
      this.setState({ lastMouse: null })
      this.startKeyframes(this.props)
    }
  }

  resize = (width, height) => {
    const canvas = this.refs.canvas
    canvas.width = width * (this.props.responsive ? 2 : 1)
    canvas.height = height * (this.props.responsive ? 2 : 1)
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
    // const ctx = canvas.getContext('2d')
    // ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    this.paint(canvas.width, canvas.height, this.props.color)
  }

  paint = (width, height, color) => {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = color
    ctx.fillRect(0, 0, width, height)
  }

  update = () => {
    if (this.cancel) {
      return
    }

    const { canvas } = this.refs

    let mouse = this.props.mouse

    if (this.keyframes) {
      const step = this.keyframes.next()

      if (step && typeof step === 'object') {
        mouse = {
          pageX: step.pageX * this.props.dimensions.width,
          pageY: step.pageY * this.props.dimensions.height,
          type: 'keyframes',
        }
      } else if (typeof step === true) {
        window.requestAnimationFrame(this.update)
        return
      } else if (step === false) {
        this.keyframes = null
        this.setState({ lastMouse: null })
        window.requestAnimationFrame(this.update)
      }
    }

    if (mouse) {
      // for performance this should be cached
      const rect = this.refs.canvas.getBoundingClientRect()
      const ctx = canvas.getContext('2d')
      let x = mouse.pageX - rect.left - window.scrollX
      let y = mouse.pageY - rect.top - window.scrollY
      const currentPoint = { x, y }
      ctx.globalCompositeOperation = 'destination-out'
      const { lastMouse } = this.state

      if (lastMouse) {
        ctx.lineWidth = 225
        ctx.shadowBlur = 10
        ctx.shadowColor = 'rgb(0,0,0)'
        ctx.lineJoin = ctx.lineCap = 'round'
        ctx.moveTo(lastMouse.x * 2, lastMouse.y * 2)
        ctx.lineTo(x * 2, y * 2)
        ctx.stroke()
      }

      this.setState({ lastMouse: currentPoint })
    }
    window.requestAnimationFrame(this.update)
  }

  render() {
    return (
      <div
        style={{
          ...this.props.style,
        }}
        className="Canvas"
      >
        <canvas
          style={{
            opacity: this.props.opacity,
          }}
          className={this.props.className}
          ref="canvas"
        />
      </div>
    )
  }
}
