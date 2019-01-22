import React from 'react'

class Bob extends React.Component {
  state = {
    hover: false,
  }

  render() {
    return (
      <div
        className="Bob"
        style={{
          transform: 'scale(0.3)',
          visibility: 'visible',
          width: '195%',
          height: '195%',
          top: '-47.5%',
          left: '-47.5%',
        }}
      >
        <div>
          <img className="Bob-art" />
          <div className="Bob-vid-wrapper" />
        </div>
      </div>
    )
  }
}
