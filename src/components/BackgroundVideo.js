import React from 'react'
import './BackgroundVideo.css'

export class BackgroundVideo extends React.Component {
  state = {
    loaded: false,
  }

  canPlay = () => {
    this.setState({ loaded: true })
  }

  render() {
    const { style, src } = this.props
    return (
      <div
        style={{
          opacity: this.state.loaded ? 1 : 0,
        }}
        className="BackgroundVideo"
      >
        <video onCanPlay={this.canPlay} muted autoPlay loop src={src} />
      </div>
    )
  }
}
