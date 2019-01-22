import React from 'react'
import './Navbar.css'

export const Navbar = () => (
  <nav className="Navbar">
    <div className="Navbar--brand">Ben McMahen</div>
    <ul>
      <li>
        <a href="#work">Portfolio</a>
      </li>
      <li>
        <a href="#contact">Contact me</a>
      </li>
    </ul>
  </nav>
)
