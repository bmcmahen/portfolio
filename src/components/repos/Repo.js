import React from 'react'
import './Repo.css'

export function Repo({ image, name, url, description }) {
  return (
    <a
      href={url}
      style={{
        backgroundImage: `url(${image})`,
      }}
      className="Repo"
    >
      <div>
        <h4>{name}</h4>
        <p>{description}</p>
      </div>
      {/* <img src={image} /> */}
    </a>
  )
}
