import React from 'react'
import auth from '../firebase-config'
import { db } from '../firebase-config'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

function Inputfield() {
    
    const [message, setMessage] = React.useState("");

    const chatRef = collection(db, 'chats');
    const date = new Date()
    
     function handle(event){

      // Adding data to cloud firesttore .
       addDoc(chatRef, {
        user: auth.currentUser.displayName,
        userID: auth.currentUser.uid,
        photoURL: auth.currentUser.photoURL,
        createAT: serverTimestamp(),
        text: message,
        time: date.toLocaleTimeString()
      })

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
