import React from 'react'
import { Browser } from '../Browser'
import './Website.css'
import { CanvasController } from '../Canvas/CanvasController'

export class Website extends React.Component {
  render() {
    const { background, title, subtitle, primaryLink, linkLabel } = this.props

    return (
      <div className="Website">
        <div className="Website__preview">
          <div className="label">
            <div>
              {title && <h4>{title}</h4>}
              <div>
                <a href={primaryLink}>{linkLabel}</a>
              </div>
            </div>
            {subtitle && <div className="lead">{subtitle}</div>}
          </div>
          <CanvasController
            keyframes={this.props.keyframes}
            enableRecord={this.props.enableRecord}
            opacity={0.97}
          >
            <Browser background={background} video={this.props.video} />
          </CanvasController>
        </div>
        <div className="Website__content">
          <h6>Task</h6>
          <p>{this.props.task}</p>
          <h6>Solution</h6>
          <p>{this.props.solution}</p>
          <h6>Technology</h6>
          <p>{this.props.technology}</p>
        </div>
      </div>
    )
  }
}
