import React from 'react'

const Info = ({title,subtitle}) => {
  return (
    <div className="text-center space-y-4">
    <h3 className="text-3xl font-bold">{title}</h3>
    <p className="text-base font-medium w-11/12 md:w-1/2 mx-auto">
      {subtitle}
    </p>
  </div>
  )
}

export default Info
