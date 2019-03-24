import React from 'react'
import './Navbar.css'
import cx from 'classnames'
import { Link } from 'gatsby'
import { LeftArrow } from './Dividers'
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
            <Link to="/#contact" className="Navbar--hire">
              Available for hire
            </Link>
          </div>
          <ul>
            <li>
              <Link className="hide-mobile" to="/">
                Portfolio
              </Link>
            </li>
            <li className="hide-mobile">
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/#contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        bottom: '-1px',
        left: 0,
        width: '100%',
        display: dark ? 'block' : 'none',
      }}
    >
      <LeftArrow fill={dark ? 'white' : 'white'} />
    </div>
  </nav>
)
