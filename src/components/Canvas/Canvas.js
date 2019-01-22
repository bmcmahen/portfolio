import React from 'react'

export default class CanvasEraser extends React.Component {
  state = {
    lastMouse: null,
  }

  componentDidMount() {
    const parent = this.refs.canvas.parentNode
    this.resize(parent.clientWidth, parent.clientHeight)
    this.update()
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
    const ctx = canvas.getContext('2d')
    canvas.width = width * 2
    canvas.height = height * 2
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
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
      const ctx = canvas.getContext('2d')
      const x = mouse.pageX - canvas.offsetLeft
      const y = mouse.pageY - canvas.offsetTop
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
