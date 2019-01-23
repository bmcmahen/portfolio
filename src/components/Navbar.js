import React from 'react'
import './Navbar.css'
import cx from 'classnames'

export const Navbar = ({ dark }) => (
  <nav className={cx('Navbar', dark ? 'Navbar--dark' : '')}>
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
