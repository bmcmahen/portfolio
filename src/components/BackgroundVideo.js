import React from 'react'
import './BackgroundVideo.css'

export const BackgroundVideo = ({ style = {}, src }) => (
  <div className="BackgroundVideo">
    <video muted autoPlay loop src={src} />
  </div>
)
