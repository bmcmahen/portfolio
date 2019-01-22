import React from 'react'

export const BackgroundVideo = ({ style = {}, src }) => (
  <video muted autoPlay loop style={style} src={src} />
)
