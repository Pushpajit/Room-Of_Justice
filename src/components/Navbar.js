import React from 'react'
import auth from '../firebase-config'
import { signOut } from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import avatar from  '../images/avatar.png'

function Navbar(props) {
const navigate = useNavigate()

  function handle(event) {
    signOut(auth).then(() => {
      console.log("Log out successfully")
      navigate('/signin')

    }).catch((error) => {
      console.log(error)
    });
  }

  return (
    <nav>
      <div className="left">
        <img className="profile-img hover" src={props.image ? props.image : avatar} alt="" />
        <p>{props.username}</p>
        <span onClick={handle} style={{color:"#242424", fontWeight:"600"}} className='hover'><i className="fa-sharp fa-solid fa-right-from-bracket"></i> Logout</span>
      </div>

      <div className="right">
        <i className="fa-solid fa-video hover"></i>
        <i className="fa-solid fa-user-plus hover"></i>
        <i className="fa-solid fa-ellipsis hover"></i>
      </div>
    </nav>
  )
}

export default Navbar
