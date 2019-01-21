import React from 'react'
import { BackgroundVideo } from './BackgroundVideo'
import Canvas from './Canvas/Canvas'
import Keyframes from './Keyframes'
import { LeftArrow as InvertedArrow } from './Dividers'

export class InteractiveHeader extends React.Component {
  state = {
    mouse: null,
  }

  componentDidMount() {
    this.refs.container.addEventListener('mousemove', this.onMouseMove)
  }

  onMouseMove = e => {
    this.setState({ mouse: e })
  }

  render() {
    const frames = []
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
                mouse={finished ? mouse : frame}
              />
            )
          }}
        </Keyframes>
        <InvertedArrow
          style={{ position: 'absolute', left: 0, width: '100%', bottom: 0 }}
        />
      </section>
    )
  }
}
