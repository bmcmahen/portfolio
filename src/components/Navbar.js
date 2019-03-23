import React from 'react'
import './Navbar.css'
import cx from 'classnames'
import { Social } from './Contact'
import { Link } from 'gatsby'
import { Divider3, LeftArrow } from './Dividers'
import blur from './Portfolio/blur.jpg'

export const Navbar = ({ dark, breadcrumb }) => (
  <nav
    style={{
      paddingBottom: dark ? '100px' : 0,
      backgroundImage: dark ? `url(${blur})` : null,
    }}
    className={cx('Navbar', dark ? 'Navbar--dark' : '')}
  >
    <div className="Navbar-content">
      <div className="Navbar-top">
        <div>
          <div className="Navbar--brand">
            <Link to="/">Ben McMahen</Link>
            <a href="/#contact" className="Navbar--hire">
              Available for hire
            </a>
          </div>
          <ul>
            <li>
              <a className="hide-mobile" href="/#portfolio">
                Portfolio
              </a>
            </li>
            <li className="hide-mobile">
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <a href="/#contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        bottom: 0,
        left: 0,
        width: '100%',
        display: dark ? 'block' : 'none',
      }}
    >
      <LeftArrow fill={dark ? 'white' : 'white'} />
    </div>
  </nav>
)
