import React, { useState } from 'react'

function Modal(props) {
    const [DoNotAnswer, setDoNotAnswer] = useState(false)
    const [name, setName] = useState('')
    const [info, setInfo] = useState('')
    const [infodo, setinfodo] = useState('')
  return (
    <div className="overlay" onClick={()=>{props.setShow(false); }}>
        
        <form className='modal' onClick={(e) => {e.stopPropagation()}} onSubmit={e => {props.setShow(false);e.preventDefault(); props.addNewRole(name,info,DoNotAnswer,infodo)}}>
        <input type="text" placeholder='Name' value={name} onChange={(e)=> {setName(e.target.value)}}/>
        <textarea type="text" placeholder="Info" className='ta' onChange={(e)=> {setInfo(e.target.value)}}/>
        <input type="checkbox" name="Do not answer" id="" className='checkbox' onChange={()=>{setDoNotAnswer(!DoNotAnswer)}} />
        {DoNotAnswer && <input type="text" placeholder='what to answer if bot doesn know about.' value={infodo} onChange={(e)=>{setinfodo(e.target.value)}} />}
        
        <button className='btn-2' >Create New bot</button>
    </form>
   
    </div>
    
  )
}

export default Modal