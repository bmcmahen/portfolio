import React from 'react'
import './Dividers.css'
import cx from 'classnames'

export const Divider3 = ({ fill }) => (
  <svg
    style={{
      pointerEvents: 'none',
      display: 'block',
    }}
    viewBox="0 0 1920 120"
  >
    <g
      id="Page-1"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
    >
      <g id="divider1" fill={fill} fill-rule="nonzero">
        <path
          d="M1920,119.855 L0,119.855 L0,1.42108547e-14 C35.2099809,13 89,59.107 242,69.855 C395,80.603 557.045733,49.7364018 702.545733,49.7364018 C1070.65028,58.4277623 1256,170.855 1920,37.624 L1920,119.855 Z"
          id="Path"
        />
        {/* <path
          d="M95.3996308,29.8420237 C103.363419,44.7775757 151.696551,50.978233 231.196551,58.478233 C310.696551,65.978233 357.648136,57.3848296 357.648136,51.5742018 C357.648136,40.1967469 227.033898,42.8804741 175.774422,34.0787349 C124.514946,25.2769957 87.4358429,14.9064716 95.3996308,29.8420237 Z"
          id="Path-2"
          transform="translate(225.984694, 41.851186) rotate(1.000000) translate(-225.984694, -41.851186) "
        /> */}
      </g>
    </g>
  </svg>
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
