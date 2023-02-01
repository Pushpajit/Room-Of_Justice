import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase-config'
import React, { useEffect, useState } from 'react'
import Messages from './Messages'

const chatRef = collection(db, 'chats');



function Chatbody() {
  
  const [chatData, setChatData] = useState([])

  // console.log("chatdata: ",chatData)

  // Using useeffect for handeling outside effects.
  useEffect(() => {

    // Whenever there is a change in the database it will trigger automatically. (listen for changes)
    const fun = onSnapshot(chatRef, (snapshot) => {
      let chats;

      snapshot.forEach((doc) => {
        chats = doc.data();
      })

      // console.log("CHATS: ",chats)
      setChatData(chats.msginfo)
    })
    // Clean up funtion, just like destructure in C++, It it important for avoiding memory leak.
    return () => fun()

  }, [])


  // Creating chat array for rendering.
  let chats = [] 
  chatData.forEach((item, ind) => {
    // Restricting from avoding double time messages.
      chats.push(<Messages key={ind} message={item} />)
  })


  return (
    <main>
      {chats}
    </main>
  )
}

export default Chatbody

