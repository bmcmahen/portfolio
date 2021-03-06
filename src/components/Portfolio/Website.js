import React from 'react'
import { Browser } from '../Browser'
import './Website.css'
import { Hint } from './Hint'

export class Website extends React.Component {
  static defaultProps = {
    useBrowser: true,
  }

  render() {
    const {
      useBrowser,
      background,
      title,
      subtitle,
      primaryLink,
      linkLabel,
    } = this.props

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
            <Hint
              style={{
                position: 'absolute',
                left: '-10px',
                top: '50px',
                transform: 'translateX(-100%)',
              }}
            />
          </div>

          {useBrowser ? (
            <Browser
              title={title}
              background={background}
              video={this.props.video}
            />
          ) : (
            <img style={{}} alt={title} src={background} />
          )}
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
