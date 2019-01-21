import { colors } from '../theme'
import autoscale from 'canvas-autoscale'

function createCanvas(parent, width, height) {
  const canvas = {}
  canvas.node = document.createElement('canvas')
  canvas.context = canvas.node.getContext('2d')
  canvas.node.width = width * 2
  canvas.node.height = height * 2
  canvas.node.style.position = 'absolute'
  canvas.node.style.top = 0
  canvas.node.style.left = 0
  canvas.node.style.opacity = 0.9
  canvas.node.style.zIndex = 200
  canvas.node.style.width = width + 'px'
  canvas.node.style.height = height + 'px'
  parent.appendChild(canvas.node)
  canvas.context.scale(2, 2)

  return canvas
}

function init(
  container,
  width,
  height,
  fillColor = colors.faded,
  update,
  onresize
) {
  const canvas = createCanvas(container, width, height)
  const ctx = canvas.context
  ctx.fillCircle = function(x, y, radius, fillColor) {
    this.fillStyle = fillColor
    this.beginPath()
    this.moveTo(x, y)
    this.arc(x, y, radius, 0, Math.PI * 2, false)
    this.fill()
  }
  ctx.clearTo = function(fillColor) {
    ctx.fillStyle = fillColor
    ctx.fillRect(0, 0, width, height)
  }
  ctx.clearTo(fillColor || '#ddd')

  window.addEventListener('resize', () => {
    onresize(canvas, ctx)
  })

  function run() {
    update(ctx, canvas)
    window.requestAnimationFrame(run)
  }

  run()

  // bind mouse events
  // canvas.node.onmousemove = function(e) {
  //     // if (!canvas.isDrawing) {
  //     //     return;
  //     // }
  //     var x = e.pageX - this.offsetLeft;
  //     var y = e.pageY - this.offsetTop;
  //     var radius = 30; // or whatever
  //     var fill = fillColor || colors.faded;
  //     ctx.globalCompositeOperation = 'destination-out';
  //     ctx.fillCircle(x, y, radius, fill);
  // };
  canvas.node.onmousedown = function(e) {
    canvas.isDrawing = true
  }
  canvas.node.onmouseup = function(e) {
    canvas.isDrawing = false
  }
}

function distanceBetween(point1, point2) {
  return Math.sqrt(
    Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
  )
}
function angleBetween(point1, point2) {
  return Math.atan2(point2.x - point1.x, point2.y - point1.y)
}

class CanvasReveal extends React.Component {
  state = {
    mounted: false,
  }

  componentDidMount() {
    const container = this.refs.canvas

    let lastMouse = null

    this.setState({ mounted: true })

    init(
      container,
      container.clientWidth,
      container.clientHeight,
      colors.faded,
      (ctx, canvas) => {
        if (!this.props.mouseMove) return
        var x = this.props.mouseMove.pageX - canvas.node.offsetLeft
        var y = this.props.mouseMove.pageY - canvas.node.offsetTop
        const currentPoint = { x, y }

        var radius = 50
        ctx.globalCompositeOperation = 'destination-out'
        // ctx.fillCircle(x, y, radius, colors.faded);
        if (lastMouse) {
          // const dist = distanceBetween(lastMouse, currentPoint)
          // const angle = angleBetween(lastMouse, currentPoint)

          // for (var i = 0; i < dist; i += 5) {
          //   let x = lastMouse.x + (Math.sin(angle) * 1)
          //   let y = lastMouse.y + (Math.cos(angle) * 1)
          //   const radgrad = ctx.createRadialGradient(x, y, 10, x, y, 20)
          //   radgrad.addColorStop(0, '#000')
          //   radgrad.addColorStop(0.5, 'rgba(0,0,0,0.5')
          //   radgrad.addColorStop(1, 'rgba(0,0,0,0')
          //   ctx.fillStyle = radgrad
          //   ctx.fillRect(x - 40, y - 40, 80, 80)
          // }

          ctx.lineWidth = 60
          ctx.shadowBlur = 10
          ctx.shadowColor = 'rgb(0,0,0)'
          ctx.lineJoin = ctx.lineCap = 'round'
          ctx.moveTo(lastMouse.x, lastMouse.y)
          ctx.lineTo(x, y)
          ctx.stroke()
        }
        lastMouse = { x, y }
      },
      (canvas, ctx) => {
        // if (!this.props.mouseMove) return
        //  canvas.node.width = container.clientWidth || 100
        //   canvas.node.height = container.clientHeight || 100;
      }
    )

    const resize = autoscale(canvas, {
      scales: [0.25, 0.5, 1, 2],
      parent: this.refs.canvas,
      target: [55, 59],
    })
    resize()
  }

  render() {
    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          height: '100%',
        }}
        ref="canvas"
        id="canvas"
      >
        {this.state.mounted && (
          <video
            autoPlay
            loop
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              zIndex: 0,
            }}
            src="/static/640707050.mp4"
          />
        )}
      </div>
    )
  }
}

export default CanvasReveal
