import React from 'react'
import './Dividers.css'

export const LeftArrow = ({ background, fill, style }) => (
  <svg
    className="LeftArrow"
    style={{ background, ...style }}
    viewBox="0 0 500 500"
    role="presentation"
    preserveAspectRatio="none"
  >
    <defs>
      <filter xmlns="http://www.w3.org/2000/svg" id="dropshadow" height="130%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
        <feOffset dx="0" dy="5" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.2" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path
      // filter="url(#dropshadow)"
      d="M0,0 l250,450 l250,-450 v500 H0 V0"
    />
  </svg>
)

export const Diagnol = ({ style }) => (
  <svg
    className="Diagnol"
    width="100%"
    style={style}
    viewBox="0 0 500 500"
    preserveAspectRatio="none"
  >
    <defs>
      <filter xmlns="http://www.w3.org/2000/svg" id="dropshadow" height="130%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
        <feOffset dx="0" dy="5" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.2" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path filter="url(#dropshadow)" d="M0,0 l250,450 l250,-450 v500 H0 V0" />
  </svg>
)
