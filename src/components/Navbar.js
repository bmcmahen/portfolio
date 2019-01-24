import React from 'react'
import './Navbar.css'
import cx from 'classnames'
import { Social } from './Contact'

export const Navbar = ({ dark }) => (
  <nav className={cx('Navbar', dark ? 'Navbar--dark' : '')}>
    <div className="Navbar--brand">Ben McMahen</div>
    <ul>
      <li>
        <Social white />
      </li>
      <li>
        <a href="#portfolio">Portfolio</a>
      </li>
      <li>
        <a href="#blog">Blog</a>
      </li>
      <li>
        <a href="#contact">Contact me</a>
      </li>
    </ul>
  </nav>
)
