import React from 'react'
import './Browser.css'
import Waypoint from 'react-waypoint'

export class Browser extends React.Component {
  state = {
    showVideo: false,
    canPlay: false,
  }
  onEnter = () => {
    if (this.props.video) {
      this.setState({ showVideo: true })
    }
  }

  onCanPlay = () => {
    this.setState({ canPlay: true })
  }

  render() {
    const { children, title, background } = this.props
    return (
      <Waypoint onEnter={this.onEnter}>
        <div className="Browser">
          <div className="browser-window">
            <div className="top-bar">
              <div className="circles">
                <div className="circle circle-red" />
                <div className="circle circle-yellow" />
                <div className="circle circle-green" />
              </div>
            </div>
            <div className="content ">
              <div className="Browser__video embed-responsive-16by9 embed-responsive">
                <img
                  src={background}
                  alt={title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                  className="embed-responsive-item"
                />

                <video
                  loop
                  onCanPlay={this.onCanPlay}
                  style={{
                    opacity: this.state.showVideo && this.state.canPlay ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                  }}
                  autoPlay
                  muted
                  src={this.props.video}
                />
              </div>
              {children}
            </div>
          </div>
        </div>
      </Waypoint>
    )
  }
}
