import React from 'react'
import './ListSummary.css'

export const ListSummary = ({ children, title, subtitle }) => (
  <div className="ListSummary">
    <div className="ListSummary__intro">
      <h5>{title}</h5>
      <div>{subtitle}</div>
    </div>
    {children}
  </div>
)
