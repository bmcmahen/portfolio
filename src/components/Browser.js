import React from 'react'
import './Browser.css'

export const Browser = ({ children, background }) => (
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
        <img width="490" height="298" src={background} />

        {children}
      </div>
    </div>
  </div>
)
