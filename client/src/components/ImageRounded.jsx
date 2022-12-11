import React from 'react'

function ImageRounded({size ,src}) {
  return (
    <img src={src} alt="" width={size} height={size} />
  )
}

export default ImageRounded