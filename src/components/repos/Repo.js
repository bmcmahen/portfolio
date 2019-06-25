import React from 'react'
import './Repo.css'

export function Repo({ image, name, url, description }) {
  return (
    <a href={url} className="Repo">
      <h4>{name}</h4>
      <p>{description}</p>
      <img src={image} />
    </a>
  )
}
