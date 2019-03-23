import React from 'react'
import { LeftArrow as InvertedArrow, Divider2, Divider3 } from './Dividers'
import { Navbar } from './Navbar'
import './InteractiveHeadline.css'
import blur from './Portfolio/blur.jpg'
import './Header.css'
import me from './me.jpg'

export class InteractiveHeader extends React.Component {
  render() {
    return (
      <section
        className="Header"
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url(${blur})`,
        }}
      >
        <div className="Header__text">
          <div className="InteractiveHeadline--lead">
            <img alt="Ben's profile" src={me} />
            <div>Hello, my name is Ben.</div>
            <div>
              I'm a full-stack developer and love building interactive
              experiences for the web and mobile.
            </div>
          </div>
          <Navbar />
          <div
            style={{
              position: 'absolute',
              bottom: '-1px',
              left: 0,
              pointerEvents: 'none',
              zIndex: 333,
              width: '100%',
            }}
          >
            <Divider3 fill="white" />
          </div>
        </div>
      </section>
    )
  }
}
