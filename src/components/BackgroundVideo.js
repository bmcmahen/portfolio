import React from 'react'

export const BackgroundVideo = ({ style = {}, src }) => (
  <video autoPlay loop style={style} src={src} />
)
