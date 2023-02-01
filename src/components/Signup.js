import React from 'react'
import { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import auth from '../firebase-config'
import { storage } from '../firebase-config'
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Link, useNavigate } from 'react-router-dom';




function Signup() {

  const [allGood, setAllGood] = useState(true);
  const navigate = useNavigate();

  async function handle(event) {

    event.preventDefault()
    console.log(event.target)
    if (event.target[0].value === "" || event.target[1].value === "" || event.target[2].value === "")
      setAllGood(false)
    else
      setAllGood(true)

    const email = event.target[1].value
    const password = event.target[2].value
    const username = event.target[0].value
    const photo = event.target[3].files[0]


    // If all good then authenticate using google auth
    if (allGood) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;

          // If any file is selected then upload the file else skip photoURL.
          if (photo) {
            // Uploading image and getting the image URL.
            // Also updating(displayName, photoURL)
            const storageRef = ref(storage, `user/${photo.name}`);
            uploadBytes(storageRef, photo)
              .then(() => {
                // get URL from storage.
                getDownloadURL(storageRef)
                  .then((url) => {

                    updateProfile(user, { photoURL: url })
                      .then(() => { console.log("PhotoURL updated") })
                      .catch((error) => alert(error));

                  })
                  .catch(error => alert(error))

              })
              .catch(error => alert(error))
          }

          updateProfile(user, { displayName: username })
            .then(() => { console.log("DisplayName updated") })
            .catch((error) => alert(error));

          alert("Successfully Register")
          navigate('/signin')
          // ...
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage)
          // ..
        });
    }


  }


  return (
    <div className='signup-body'>
      <div className="signup-container">
        <div className="su-left">
          <img className='su-img' style={{ width: "150px" }} src="https://images.wallpaperscraft.com/image/single/man_mask_sword_210017_720x1280.jpg" alt="" />
        </div>

        <div className="su-right">
          <h2>Sign Up</h2>

          {allGood === false && alert("Something went wrong, try again..")}

          <form onSubmit={handle} className='su-form' action="">
            <input type="text" placeholder='Name' />
            <input type="email" placeholder='Email' />
            <input type="password" placeholder='Password' />
            <label style={{ fontSize: "12px" }} htmlFor="profile-pic">Choose a picture for your profile (resolution should not be more than 650x500)</label>
            <input type="file" id="profile-pic" />
            <button className='su-btn'>Sign up</button>
            <p>Already have an account? <Link to={'/signin'}>Sign in</Link></p>

          </form>

        </div>
      </div>
    </div>
  )
}

export default Signup
