import React from 'react'
import { BackgroundVideo } from './BackgroundVideo'
import Canvas from './Canvas/Canvas'
import Keyframes from './Keyframes'
import { LeftArrow as InvertedArrow } from './Dividers'

const baseHeight = 700
const baseWidth = 994
const frames = JSON.parse(
  `[{"pageX":0.38028169014084506,"pageY":0.26857142857142857,"delay":9},{"pageX":0.3853118712273642,"pageY":0.26142857142857145,"delay":12},{"pageX":0.3893360160965795,"pageY":0.2557142857142857,"delay":20},{"pageX":0.41146881287726356,"pageY":0.22,"delay":16},{"pageX":0.4215291750503018,"pageY":0.2042857142857143,"delay":10},{"pageX":0.42655935613682094,"pageY":0.19714285714285715,"delay":28},{"pageX":0.43561368209255535,"pageY":0.18571428571428572,"delay":19},{"pageX":0.43661971830985913,"pageY":0.18571428571428572,"delay":37},{"pageX":0.43561368209255535,"pageY":0.19142857142857142,"delay":21},{"pageX":0.42857142857142855,"pageY":0.21571428571428572,"delay":19},{"pageX":0.4164989939637827,"pageY":0.25857142857142856,"delay":13},{"pageX":0.4134808853118712,"pageY":0.2642857142857143,"delay":20},{"pageX":0.4044265593561368,"pageY":0.2957142857142857,"delay":21},{"pageX":0.4024144869215292,"pageY":0.3028571428571429,"delay":14},{"pageX":0.4024144869215292,"pageY":0.3028571428571429,"delay":12},{"pageX":0.4024144869215292,"pageY":0.30428571428571427,"delay":37},{"pageX":0.4074446680080483,"pageY":0.29428571428571426,"delay":35},{"pageX":0.43158953722334004,"pageY":0.2542857142857143,"delay":12},{"pageX":0.44567404426559354,"pageY":0.2357142857142857,"delay":14},{"pageX":0.448692152917505,"pageY":0.23285714285714285,"delay":23},{"pageX":0.45774647887323944,"pageY":0.22142857142857142,"delay":23},{"pageX":0.4597585513078471,"pageY":0.21857142857142858,"delay":20},{"pageX":0.4597585513078471,"pageY":0.21857142857142858,"delay":24},{"pageX":0.4476861167002012,"pageY":0.2557142857142857,"delay":30},{"pageX":0.4336016096579477,"pageY":0.2857142857142857,"delay":16},{"pageX":0.4305835010060362,"pageY":0.29428571428571426,"delay":14},{"pageX":0.4295774647887324,"pageY":0.29714285714285715,"delay":33},{"pageX":0.4295774647887324,"pageY":0.2985714285714286,"delay":30},{"pageX":0.44064386317907445,"pageY":0.2857142857142857,"delay":14},{"pageX":0.44969818913480886,"pageY":0.27285714285714285,"delay":19},{"pageX":0.47484909456740443,"pageY":0.24142857142857144,"delay":24},{"pageX":0.4909456740442656,"pageY":0.22428571428571428,"delay":15},{"pageX":0.49899396378269617,"pageY":0.21571428571428572,"delay":14},{"pageX":0.5020120724346077,"pageY":0.21142857142857144,"delay":28},{"pageX":0.5020120724346077,"pageY":0.21142857142857144,"delay":35},{"pageX":0.4688128772635815,"pageY":0.2957142857142857,"delay":16},{"pageX":0.4647887323943662,"pageY":0.3057142857142857,"delay":15},{"pageX":0.4537223340040241,"pageY":0.3314285714285714,"delay":16},{"pageX":0.44567404426559354,"pageY":0.3514285714285714,"delay":23},{"pageX":0.4426559356136821,"pageY":0.36,"delay":16},{"pageX":0.4426559356136821,"pageY":0.36142857142857143,"delay":34},{"pageX":0.46277665995975853,"pageY":0.3414285714285714,"delay":37},{"pageX":0.5010060362173038,"pageY":0.2757142857142857,"delay":14},{"pageX":0.5090543259557344,"pageY":0.26285714285714284,"delay":19},{"pageX":0.5211267605633803,"pageY":0.24,"delay":14},{"pageX":0.5241448692152918,"pageY":0.23714285714285716,"delay":17},{"pageX":0.5271629778672032,"pageY":0.23142857142857143,"delay":40},{"pageX":0.5271629778672032,"pageY":0.23142857142857143,"delay":48},{"pageX":0.49899396378269617,"pageY":0.3242857142857143,"delay":16},{"pageX":0.48993963782696176,"pageY":0.3485714285714286,"delay":16},{"pageX":0.48490945674044267,"pageY":0.3628571428571429,"delay":15},{"pageX":0.4818913480885312,"pageY":0.3742857142857143,"delay":16},{"pageX":0.4818913480885312,"pageY":0.37714285714285717,"delay":16},{"pageX":0.48390342052313884,"pageY":0.37714285714285717,"delay":32},{"pageX":0.5211267605633803,"pageY":0.3142857142857143,"delay":46},{"pageX":0.5714285714285714,"pageY":0.21428571428571427,"delay":23},{"pageX":0.5835010060362174,"pageY":0.19428571428571428,"delay":22},{"pageX":0.5865191146881288,"pageY":0.19,"delay":14},{"pageX":0.5875251509054326,"pageY":0.19,"delay":50},{"pageX":0.5714285714285714,"pageY":0.23714285714285716,"delay":47},{"pageX":0.5523138832997988,"pageY":0.28714285714285714,"delay":12},{"pageX":0.5503018108651911,"pageY":0.2914285714285714,"delay":24},{"pageX":0.5503018108651911,"pageY":0.29428571428571426,"delay":17},{"pageX":0.5503018108651911,"pageY":0.29428571428571426,"delay":16},{"pageX":0.5583501006036218,"pageY":0.2857142857142857,"delay":18},{"pageX":0.5724346076458753,"pageY":0.26571428571428574,"delay":14},{"pageX":0.5935613682092555,"pageY":0.23285714285714285,"delay":15},{"pageX":0.6046277665995976,"pageY":0.21714285714285714,"delay":46},{"pageX":0.6338028169014085,"pageY":0.17142857142857143,"delay":47},{"pageX":0.6368209255533199,"pageY":0.16714285714285715,"delay":17},{"pageX":0.6338028169014085,"pageY":0.18142857142857144,"delay":27},{"pageX":0.6066398390342053,"pageY":0.2557142857142857,"delay":18},{"pageX":0.5955734406438632,"pageY":0.2842857142857143,"delay":17},{"pageX":0.5905432595573441,"pageY":0.3,"delay":15},{"pageX":0.5855130784708249,"pageY":0.31285714285714283,"delay":18},{"pageX":0.5845070422535211,"pageY":0.31857142857142856,"delay":19},{"pageX":0.5855130784708249,"pageY":0.31857142857142856,"delay":18},{"pageX":0.596579476861167,"pageY":0.30857142857142855,"delay":19},{"pageX":0.6237424547283702,"pageY":0.2671428571428571,"delay":19},{"pageX":0.6378269617706237,"pageY":0.24285714285714285,"delay":29},{"pageX":0.6639839034205232,"pageY":0.19857142857142857,"delay":21},{"pageX":0.6710261569416499,"pageY":0.18571428571428572,"delay":13},{"pageX":0.6720321931589537,"pageY":0.18428571428571427,"delay":15},{"pageX":0.6730382293762576,"pageY":0.18428571428571427,"delay":20},{"pageX":0.6720321931589537,"pageY":0.1957142857142857,"delay":16},{"pageX":0.6670020120724346,"pageY":0.20857142857142857,"delay":15},{"pageX":0.6589537223340041,"pageY":0.23285714285714285,"delay":14},{"pageX":0.6498993963782697,"pageY":0.2642857142857143,"delay":16},{"pageX":0.6428571428571429,"pageY":0.2842857142857143,"delay":15},{"pageX":0.6378269617706237,"pageY":0.3,"delay":15},{"pageX":0.635814889336016,"pageY":0.30857142857142855,"delay":15},{"pageX":0.635814889336016,"pageY":0.31142857142857144,"delay":71},{"pageX":0.6649899396378269,"pageY":0.2742857142857143,"delay":99},{"pageX":0.6981891348088531,"pageY":0.23142857142857143,"delay":15},{"pageX":0.6921529175050302,"pageY":0.25285714285714284,"delay":17},{"pageX":0.6851106639839034,"pageY":0.27,"delay":16},{"pageX":0.6800804828973843,"pageY":0.2885714285714286,"delay":16},{"pageX":0.6730382293762576,"pageY":0.3057142857142857,"delay":16},{"pageX":0.670020120724346,"pageY":0.32,"delay":50},{"pageX":0.6670020120724346,"pageY":0.3385714285714286,"delay":60},{"pageX":0.6670020120724346,"pageY":0.34285714285714286}]`
)

export class InteractiveHeader extends React.Component {
  state = {
    mouse: null,
  }

  positions = []

  componentDidMount() {
    this.refs.container.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('keyup', this.onKeyUp)
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth,
    })
  }

  componentWillUnmount() {
    this.refs.container.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('keyup', this.onKeyUp)
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
    this.setState({ mouse: e })
  }

  render() {
    const { mouse } = this.state

    return (
      <section
        style={{ position: 'relative', height: '400px', overflow: 'hidden' }}
        className="header"
        ref="container"
      >
        <BackgroundVideo
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
          }}
          src="/static/640707050.mp4"
        />
        <Keyframes frames={frames}>
          {(frame, finished) => {
            return (
              <Canvas
                color={'#eee'}
                style={{ position: 'absolute', top: 0, left: 0, opacity: 0.8 }}
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
            )
          }}
        </Keyframes>
        <div style={{ position: 'relative' }}>
          <h1>Hello world!</h1>
        </div>
        <InvertedArrow
          style={{ position: 'absolute', left: 0, width: '100%', bottom: 0 }}
        />
      </section>
    )
  }
}
