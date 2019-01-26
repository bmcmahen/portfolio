import React from 'react'
import './Hint.css'
import arrow from './arrow.svg'

export const Hint = ({ style }) => (
  <div
    className="Hint"
    style={{ backgroundImage: `url(${arrow})`, ...style }}
  />
)
