import React from 'react'

function Bot(props) {
  let path =props.availableImages.includes(`${props.chatRole}.webp`) ? props.chatRole + ".webp" : 'CustomBot.webp'

  return (
    <div className='botWindow'>
      <img src={path} alt="" width={400} height={400} className='img' />
      <h1>{props.chatRole}</h1>
      <div className="roles">
      {Object.keys(props.roleBasics).map((role) => (
          <img
            key={role}
            src={props.availableImages.includes(`${role}.webp`) ? `${role}.webp` : "CustomBot.webp"}
            alt=""
            width={50}
            height={50}
            className="imgroles"
            onClick={() => {
              props.changeRole(role);
              props.setchatRole(role);
            }}
          />
        ))}
     
      <img src="NewBot.webp" onClick={()=>{props.setShow(!props.show)}} alt="" width={50} height={50} className='imgroles' />
      </div>
        </div>
  )
}

export default Bot