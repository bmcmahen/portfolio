import React from 'react'
import './Dividers.css'
import cx from 'classnames'

export const Divider3 = ({ fill }) => (
  <div
    style={{
      width: '100%',
      overflow: 'hidden',
    }}
  >
    <svg
      className="Divider3"
      style={{
        pointerEvents: 'none',
        display: 'block',
        marginLeft: '-1rem', // laame hack, wtf?
        marginRight: '-1rem',
        padding: 0,
        overflow: 'hidden',
      }}
      viewBox="0 0 1920 120"
    >
      <g fill={fill}>
        <path d="M1920,119.855 L0,119.855 L0,1.42108547e-14 C35.2099809,13 89,59.107 242,69.855 C395,80.603 557.045733,49.7364018 702.545733,49.7364018 C1070.65028,58.4277623 1256,170.855 1920,37.624 L1920,119.855 Z" />
      </g>
    </svg>
  </div>
)
//   <svg
//     fill-rule="evenodd"
//     fill={fill}
//     style={{ pointerEvents: 'none', display: 'block' }}
//     clip-rule="evenodd"
//     xmlns="http://www.w3.org/2000/svg"
//     aria-labelledby="title"
//     viewBox="0 0 1920 240"
//     id="goop"
//     class="goop__InlineSvg-sc-1g583nk-0 cCVJVf"
//   >
//     <title id="title">goop</title>
//     <g>
//       <path d="M1920,157.624l0,82.231l-1920,0l0,-106.045c54.693,-9.327 89,45.297 242,56.045c153,10.748 265.5,-30.5 411,-30.5c145.5,0 603,131.5 1267,-1.731Z" />
//       <path d="M83.5,131.354c-2.5,12.5 68.5,37 148,44.5c79.5,7.5 108.103,0.808 107,-5c-1.537,-8.094 -89.5,-14.365 -136.5,-22.5c-47,-8.135 -116,-29.5 -118.5,-17Z" />
//     </g>
//   </svg>
// )
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
  <svg
    style={{ pointerEvents: 'none', display: 'block', fill: 'white' }}
    viewBox="0 0 1920 96"
    version="1.1"
  >
    <g
      id="Page-1"
      stroke="none"
      stroke-width="1"
      fill={fill}
      fill-rule="evenodd"
    >
      <g id="divider1" fill={fill}>
        <path
          d="M1920,0.5 L1920,96 L0,96 L0,30.5 C196,-5.5 436.061169,0.0822995747 680.055093,14.2475678 C960,30.5 1458.02941,83.3456663 1920,0.5 Z"
          id="Path"
        />
      </g>
    </g>
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
