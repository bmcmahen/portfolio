import React from 'react'
import './ListSummary.css'

export const ListSummary = ({ children, title, subtitle }) => (
  <div className="ListSummary">
    <div className="ListSummary__intro">
      <h4>{title}</h4>
      <div>{subtitle}</div>
    </div>
    {children}
  </div>
)
