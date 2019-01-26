import React from 'react'
import './Navbar.css'
import cx from 'classnames'
import { Social } from './Contact'
import { Link } from 'gatsby'

export const Navbar = ({ dark, breadcrumb }) => (
  <nav className={cx('Navbar', dark ? 'Navbar--dark' : '')}>
    <div className="Navbar--brand">
      <Link to="/">Ben McMahen</Link>
      {breadcrumb && <span className="Navbar_breadcrumb">{breadcrumb}</span>}
    </div>
    <ul>
      <li>
        <Social white />
      </li>
      <li>
        <a className="hide-mobile" href="/#portfolio">
          Portfolio
        </a>
      </li>
      <li className="hide-mobile">
        <a href="/#blog">Blog</a>
      </li>
      <li>
        <a href="/#contact">Contact me</a>
      </li>
    </ul>
  </nav>
)
