import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebase-config'
import React, { useEffect, useRef, useState } from 'react'
import Messages from './Messages'


function Chatbody() {
  const [chatData, setChatData] = useState([])

  // Creating reference for database collection.
  const chatRef = collection(db, 'chats')

  // Using useeffect for handeling outside effects.
  useEffect(() => {
    // It will sort the chat messages according to the createAT time.
    const querychat = query(chatRef, orderBy('createAT'));

    // Whenever there is a change in the database it will trigger automatically. (listen for changes)
    const fun = onSnapshot(querychat, (snapshot) => {
      
      let chats = []
      snapshot.forEach((doc) => {

        chats.push(doc.data())  

      })

      // Updating state.
      setChatData(chats)
    })

    // Clean up funtion, just like destructure in C++, It it important for avoiding memory leak.
    return () => fun()

  }, [])
 
  // Creating chat for rendering.
  const chats = chatData.map((item, ind) => <Messages key={ind} message={item}/>)

  


  return (
    <main>
      {chats}
    </main>
  )
}

export default Chatbody

