import React from 'react'
import avatar from  '../images/avatar.png'
import auth from '../firebase-config'
import { useEffect, useRef } from 'react'

function Messages({message}) {

  
  
  // For a scrolling behavior to the current msg.
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({behavior: "smooth"});
  },[message])
  // ...
  
  // If it is currentUser then return this.
  if(message.userID === auth.currentUser.uid){

    return (
      <div className='msg-owner' ref={ref}>
          <div className="msg-info">
              <img src={avatar} alt="" />
              <p className='info-time'>{message.time}</p>
          </div>
  
        <p className='msg-txt'>{message.text}</p>
      </div>
    )
    
  }
  // If it is other user then return this.
  else{

    return (
      <div className='msg-client' ref={ref}>
          <div className="msg-info">
              <img src={ message.photoURL !== ''? message.photoURL: avatar} alt="" />
              <p className='info-time' style={{color:"black", fontSize:"10px", fontWeight:"500"}}>{message.user}</p>
              <p className='info-time'>{message.time}</p>
          </div>
  
        <p className='msg-client-txt'>{message.text}</p>
      </div>
    )

  }
}

export default Messages
