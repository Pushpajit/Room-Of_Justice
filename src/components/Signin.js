import React from 'react'
import auth from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom';

function Signin() {
    // create a refence of useNavigate() hook
    const navigate = useNavigate();

    function handle(event) {
        event.preventDefault();
        const email = event.target[0].value
        const password = event.target[1].value
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // After successfull login navigate to home(chat main body)
                navigate('/')
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
            });
    }


    return (
        <div className='signup-body'>
            <div className="signup-container" style={{height: "450px"}}>
                <div className="su-left">
                    <img className='su-img' src="https://images.wallpaperscraft.com/image/single/man_mask_sword_210017_720x1280.jpg" alt="" />
                </div>

                <div className="su-right">
                    <h2>Sign In</h2>

                    <form onSubmit={handle} className='su-form' action="">
                        <input type="email" placeholder='Email' />
                        <input type="password" placeholder='Password' />
                        <button className='su-btn'>Sign in</button>
                        <p>Don't have an account? <Link to={'/signup'}>Sign up</Link></p>

                    </form>

                </div>
            </div>
        </div>
    )
}

export default Signin
