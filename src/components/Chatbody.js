import { collection, getDocs, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase-config'
import React, { useEffect, useState } from 'react'
import Messages from './Messages'

const chatRef = collection(db, 'chats');
const querychat = query(chatRef, orderBy('createAT', 'desc'), limit(1));

// Get data for the 1st time. (latest 50 messages)
let data = [];
getDocs(chatRef, orderBy('createAT', 'desc'), limit(50))
.then((doc) => {
  doc.forEach((snapshot) => data.push(snapshot.data()))
});

// Reverse the data so that the it maintain an order.
data.reverse();
// ...



function Chatbody() {
  
  const [chatData, setChatData] = useState(data)


  // Using useeffect for handeling outside effects.
  useEffect(() => {

    // Whenever there is a change in the database it will trigger automatically. (listen for changes)
    const fun = onSnapshot(querychat, (snapshot) => {
      let chats = [];

      snapshot.forEach((doc) => {
        chats.push(doc.data())
      })

      setChatData((prev) => [...prev, ...chats])
    })

    // Clean up funtion, just like destructure in C++, It it important for avoiding memory leak.
    return () => fun()

  }, [])



  // Creating chat array for rendering.
  let chats = [] 
  chatData.forEach((item, ind) => {
    // Restricting from avoding double time messages.
    if(ind > 0 && (chatData[ind - 1].text !== item.text || chatData[ind - 1].userID !== item.userID))
      chats.push(<Messages key={ind} message={item} />)
  })


  return (
    <main>
      {chats}
    </main>
  )
}

export default Chatbody

