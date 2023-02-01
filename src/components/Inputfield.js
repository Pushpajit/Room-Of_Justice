import React from 'react'
import auth from '../firebase-config'
import { db } from '../firebase-config'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { storage } from '../firebase-config'
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

// Fix the mobile/laptop time format issues
function convert(time) {
  if (time.substr(-2) === 'AM' || time.substr(-2) === 'PM')
    return time;

  let hh = parseInt(time.substr(0, 2));
  const HH = hh % 12 === 0 ? 12 : hh % 12;

  let convertedTime = HH < 10 ? '0' + HH + time.substr(2) : HH + time.substr(2)

  convertedTime = hh < 12 ? convertedTime + ' AM' : convertedTime + ' PM';

  return convertedTime;

}

function Inputfield() {

  const [message, setMessage] = React.useState("");
  const [sendImage, setSendImage] = React.useState(null);
  const imgbtn = document.getElementById('imgbtn')
  const chatRef = doc(db, 'chats', 'allChats');


  function loadImage(event) {

    const file = event.target.files[0];
    setSendImage(file);
    setMessage(`${file.name} is loaded, press send!`);
    imgbtn.style.color = '#00E862';
    imgbtn.style.transition = '0.2s ease-in';
  }


  function handle(event) {
    if (message === "")
      return;


    const date = new Date();
    const time = convert(date.toLocaleTimeString());

    const data = {
      photoURL: auth.currentUser.photoURL,
      text: message,
      time: time,
      userID: auth.currentUser.uid,
      username: auth.currentUser.displayName,
      picture: null,
    }


    if (sendImage !== null) {
      const storageRef = ref(storage, `images/${auth.currentUser.uid + sendImage.name}`);
      uploadBytes(storageRef, sendImage)
        .then(() => {
          getDownloadURL(storageRef)
            .then((url) => {
              data.picture = url;
              console.log(url)
              updateDoc(chatRef, { msginfo: arrayUnion(data) })
                .catch(error => alert(error))
            })
            .catch(error => alert(error))
        })
        .catch(error => alert(error))
    }
    else {
      // Appending data to cloud firestore .
      updateDoc(chatRef, { msginfo: arrayUnion(data) })
        .catch(error => alert(error))
    }


    // After adding the doc into cloud firestore, empty out the messages.
    setMessage("")
    setSendImage(null)

    imgbtn.style.color = 'white';

  }


  return (
    <div className='input-field'>
      <input autoFocus={true} onKeyDown={(e) => e.code === 'Enter' && handle()} onChange={(e) => setMessage(e.target.value)} value={message} type="text" placeholder='Type Something...' />

      <div className="input-field-right">
        <input style={{ display: "none" }} type="file" name="" id="docs" />
        <label htmlFor="docs"><i className="fa-solid fa-paperclip hover"></i></label>

        <input style={{ display: "none" }} type="file" name="" id="image" accept='image/*' onChange={loadImage} onClick={() => { setMessage(""); setSendImage(null); imgbtn.style.color = 'white'; }} />
        <label htmlFor="image"><i id="imgbtn" className="fa-solid fa-image hover"></i></label>

        <button onClick={handle} className='btn'><i className="fa-solid fa-paper-plane"></i></button>
      </div>
    </div>
  )
}

export default Inputfield
