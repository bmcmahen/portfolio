import React from 'react'
import './ListSummary.css'

export const ListSummary = ({ id, children, title, subtitle }) => (
  <div id={id} className="ListSummary">
    <div className="ListSummary__intro">
      <h4>{title}</h4>
      <div>{subtitle}</div>
    </div>
    {children}
  </div>
)
