import React from 'react'
import './Browser.css'
import Waypoint from 'react-waypoint'
import { BackgroundVideo } from './BackgroundVideo'

export class Browser extends React.Component {
  state = {
    showVideo: false,
  }
  onEnter = () => {
    if (this.props.video) {
      this.setState({ showVideo: true })
    }
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
            <div className="content">
              <img alt={title} width="490" height="274" src={background} />
              {this.state.showVideo && (
                <div className="Browser__video">
                  <BackgroundVideo src={this.props.video} />
                </div>
              )}
              {children}
            </div>
          </div>
        </div>
      </Waypoint>
    )
  }
}
