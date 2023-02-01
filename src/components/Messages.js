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

    if(message.picture){
      return (
        <div className='msg-owner' ref={ref}>
            <div className="msg-info">
                <img className='profile-img' src={message.photoURL? message.photoURL: avatar} alt="" />
                <p className='info-time'>{message.time}</p>
            </div>
    
          <img className='msg-img' src={message.picture} alt="Image" />
        </div>
      )
    }


    return (
      <div className='msg-owner' ref={ref}>
          <div className="msg-info">
              <img className='profile-img' src={message.photoURL? message.photoURL: avatar} alt="" />
              <p className='info-time'>{message.time}</p>
          </div>
  
        <p className='msg-txt'>{message.text}</p>
      </div>
    )
    
  }
  // If it is other user then return this.
  else{

    if(message.picture){
      return (
        <div className='msg-client' ref={ref}>
            <div className="msg-info">
                <img className='profile-img' src={message.photoURL? message.photoURL: avatar} alt="" />
                <p className='info-time' style={{color:"black", fontSize:"10px", fontWeight:"500"}}>{message.username ? message.username: "unknown-user"}</p>
                <p className='info-time'>{message.time}</p>
            </div>
          
          <img className='msg-img' src={message.picture} alt="Image" />
        </div>
      )
    }


    return (
      <div className='msg-client' ref={ref}>
          <div className="msg-info">
              <img className='profile-img' src={ message.photoURL? message.photoURL: avatar} alt="" />
              <p className='info-time' style={{color:"black", fontSize:"10px", fontWeight:"500"}}>{message.username ? message.username: "unknown-user"}</p>
              <p className='info-time'>{message.time}</p>
          </div>
  
        <p className='msg-client-txt'>{message.text}</p>
      </div>
    )

  }
}

export default Messages
