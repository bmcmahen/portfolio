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
            <div className="content ">
              <div className="Browser__video embed-responsive-16by9 embed-responsive">
                {this.state.showVideo && (
                  <video autoPlay muted src={this.props.video} />
                )}
              </div>
              {children}
            </div>
          </div>
        </div>
      </Waypoint>
    )
  }
}
