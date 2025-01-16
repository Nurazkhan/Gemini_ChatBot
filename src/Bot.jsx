import React from 'react'

function Bot(props) {
  let path = props.chatRole + ".webp"
  return (
    <div className='botWindow'>
      <img src={path} alt="" width={400} height={400} className='img' />
      <div className="roles">
      <img src="CommonBot.webp"  onClick={() => {props.changeRole('CommonBot'); props.setchatRole('CommonBot')}} alt="" width={50} height={50} className='imgroles' />
      <img src="BusinessBot.webp" onClick={() => {props.changeRole('BusinessBot'); props.setchatRole('BusinessBot')}} alt="" width={50} height={50} className='imgroles' />
      <img src="TherapistBot.webp" onClick={() => {props.changeRole('TherapistBot'); props.setchatRole('TherapistBot')}} alt="" width={50} height={50} className='imgroles' />
      </div>
        </div>
  )
}

export default Bot