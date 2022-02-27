import React from 'react'

export default function Error({errorMessage}) {
  return (
        <div className='error'>
            <span>an error occurred:</span> 
            <span>{errorMessage}</span>
        </div>
  )
}
