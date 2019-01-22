import React from 'react'
import debounce from 'lodash.debounce'

export default class CanvasEraser extends React.Component {
  static defaultProps = {
    responsive: true,
  }

  constructor(props) {
    super(props)
    this.state = {
      lastMouse: null,
    }

    this.resizeCanvasDb = debounce(this.resizeCanvas, 100)
  }

  componentDidMount() {
    this.resizeCanvas()
    this.update()

    // window.addEventListener('resize', this.resizeCanvasDb)
  }

  componentWillUnmount() {
    // window.removeEventListener('resize', this.resizeCanvasDb)
  }

  resizeCanvas = () => {
    const parent = this.refs.canvas.parentNode
    this.resize(parent.clientWidth, parent.clientHeight)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mouse && prevProps.mouse.type === 'keyframes') {
      if (this.props.mouse && this.props.mouse.type !== 'keyframes') {
        this.setState({ lastMouse: null })
      } else if (!this.props.mouse) {
        this.setState({ lastMouse: null })
      }
    }
  }

  resize = (width, height) => {
    const canvas = this.refs.canvas
    canvas.width = width * (this.props.responsive ? 4 : 2)
    canvas.height = height * (this.props.responsive ? 2 : 1)
    canvas.style.width = width * 2 + 'px'
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
    const { canvas } = this.refs
    const { mouse } = this.props
    if (mouse) {
      const rect = this.refs.canvas.getBoundingClientRect()
      const ctx = canvas.getContext('2d')
      let x = mouse.pageX - rect.left - window.scrollX
      let y = mouse.pageY - rect.top - window.scrollY
      // x /= rect.width
      // y /= rect.height

      // x *= this.refs.canvas.width
      // y *= this.refs.canvas.height

      const currentPoint = { x, y }
      const radius = 50
      ctx.globalCompositeOperation = 'destination-out'
      const { lastMouse } = this.state
      if (lastMouse) {
        ctx.lineWidth = 90
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
    return <canvas style={this.props.style} ref="canvas" />
  }
}
