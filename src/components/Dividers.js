import React from 'react'
import './Dividers.css'

export const LeftArrow = ({ background, fill }) => (
  <svg
    className="LeftArrow"
    style={{ background }}
    viewBox="0 0 500 500"
    role="presentation"
    preserveAspectRatio="none"
  >
    <path d="M0,0 l250,450 l250,-450 v500 H0 V0" />
  </svg>
)
