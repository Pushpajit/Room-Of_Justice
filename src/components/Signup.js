import React from 'react'
import { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import auth from '../firebase-config'
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
    const photo = event.target[3].value

    // If all good then authenticate using google auth
    if(allGood){
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // Setting displayname and photoURL
          updateProfile(user, {displayName: username, photoURL: photo})
          .then(()=>{console.log("profile updated")})
          .catch((error) => console.log(error));

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
          <img className='su-img' src="https://images.wallpaperscraft.com/image/single/man_mask_sword_210017_720x1280.jpg" alt="" />
        </div>

        <div className="su-right">
          <h2>Sign Up</h2>

          {allGood === false && alert("Something went wrong, try again..")}

          <form onSubmit={handle} className='su-form' action="">
            <input type="text" placeholder='Name' />
            <input type="email" placeholder='Email' />
            <input type="password" placeholder='Password' />
            <label style={{fontSize: "12px"}} htmlFor="profile-pic">Choose a picture for your profile (resolution should not be more than 650x500)</label>
            <input  type="text" id="profile-pic" placeholder='Image link'/>
            <button className='su-btn'>Sign up</button>
            <p>Already have an account? <Link  to={'/signin'}>Sign in</Link></p>

          </form>

        </div>
      </div>
    </div>
  )
}

export default Signup
