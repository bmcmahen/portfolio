import React from 'react'
import './Dividers.css'
import cx from 'classnames'

export const Divider3 = ({ fill }) => (
  <svg
    fill-rule="evenodd"
    fill={fill}
    style={{ pointerEvents: 'none', display: 'block' }}
    clip-rule="evenodd"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="title"
    viewBox="0 0 1920 240"
    id="goop"
    class="goop__InlineSvg-sc-1g583nk-0 cCVJVf"
  >
    <title id="title">goop</title>
    <g>
      <path d="M1920,157.624l0,82.231l-1920,0l0,-106.045c54.693,-9.327 89,45.297 242,56.045c153,10.748 265.5,-30.5 411,-30.5c145.5,0 603,131.5 1267,-1.731Z" />
      <path d="M83.5,131.354c-2.5,12.5 68.5,37 148,44.5c79.5,7.5 108.103,0.808 107,-5c-1.537,-8.094 -89.5,-14.365 -136.5,-22.5c-47,-8.135 -116,-29.5 -118.5,-17Z" />
    </g>
  </svg>
)
export const Divider2 = () => (
  <svg
    fill-rule="evenodd"
    clip-rule="evenodd"
    style={{ pointerEvents: 'none', display: 'block', fill: 'white' }}
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="title"
    viewBox="0 0 1920 240"
    id="goop"
    class="goop__InlineSvg-sc-1g583nk-0 cCVJVf"
  >
    <title id="title">goop</title>
    <g>
      <path d="M1920,146l0,94l-1920,0l0,-77.034c93,94.034 759,60.034 983.5,21.534c224.5,-38.5 456,13.5 594,13.5c138,0 152.14,-11.31 342.5,-52Z" />
    </g>
  </svg>
)

export const LeftArrow = ({ top, background, fill = 'white', style }) => (
  <div>
    <svg
      fill={fill}
      style={{ pointerEvents: 'none', display: 'block' }}
      fill-rule="evenodd"
      clip-rule="evenodd"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1920 240"
    >
      <g>
        <path d="M1920,144.5l0,95.5l-1920,0l0,-65.5c196,-36 452.146,-15.726 657.5,8.5c229.698,27.098 870,57 1262.5,-38.5Z" />
      </g>
    </svg>
  </div>
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
