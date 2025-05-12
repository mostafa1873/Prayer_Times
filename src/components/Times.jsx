import React from 'react'

export default function Times({name , time}) {
  return (
    <div className='prayer'>
         <p className='name_prayer'>{name}</p>
         <p className='time_prayer'>{time}</p>
    </div>
  )
}
