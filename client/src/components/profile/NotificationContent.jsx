import React from 'react'

function NotificationContent({name,headContent,content}) {
  return (
    <div className='mt-2 ml-3 '>
        <div className="d-flex ">
            <p className='mx-1 h6 my-auto'>{name}</p>
            <span className='my-auto'>{headContent}</span>
        </div>
        <div>
            <p>{content}</p>
        </div>
    </div>
  )
}

export default NotificationContent