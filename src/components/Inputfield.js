import React from 'react'
import auth from '../firebase-config'
import { db } from '../firebase-config'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'

function Inputfield() {
    
    const [message, setMessage] = React.useState("");

    const chatRef = doc(db, 'chats', 'allChats');
    
    function handle(event){

      const date = new Date()

      const data = {
        photoURL: auth.currentUser.photoURL,
        text: message,
        time: date.toLocaleTimeString(),
        userID: auth.currentUser.uid,
        username: auth.currentUser.displayName
      }

      // Appending data to cloud firestore .
       updateDoc(chatRef, {msginfo: arrayUnion(data)})

      // After adding the doc into cloud firestore, empty out the messages.
      setMessage("")

    }


  return (
    <div className='input-field'>
        <input autoFocus = {true} onKeyDown={(e)=> e.code === 'Enter' && handle()} onChange={(e) => setMessage(e.target.value)} value = {message} type="text" placeholder='Type Something...'/>
        
        <div className="input-field-right">
            <input style={{display: "none"}} type="file" name="" id="docs" />
            <label htmlFor="docs"><i className="fa-solid fa-paperclip hover"></i></label>
            
            <input style={{display: "none"}} type="file" name="" id="image" />
            <label htmlFor="image"><i className="fa-solid fa-image hover"></i></label>
            
            <button onClick= {handle} className='btn'><i className="fa-solid fa-paper-plane"></i></button>
        </div>
    </div>
  )
}

export default Inputfield
