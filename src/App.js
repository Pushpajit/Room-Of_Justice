import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Inputfield from './components/Inputfield';
import Chatbody from './components/Chatbody';
import Signin from './components/Signin';
import Signup from './components/Signup';
import { onAuthStateChanged } from 'firebase/auth'
import auth from './firebase-config'
import { useEffect } from 'react';

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'


// Home Component, need to separate this in another react conponent.
function Home({ user}) {
  if(user == null){
    return(
      <>
      <p>You need to <Link to={'/signin'}>Sign-in</Link> to use chat window.</p>
      </>
    )
  }

  
  return (
    <div className='container'>
      <Navbar username={user.displayName} image={user.photoURL} />

      <Chatbody/>

      <Inputfield
/>
    </div>
  )
}


// Main app //
function App() {
  const [user, setUser] = React.useState(null)

  // For avoiding infinite drilling.
  useEffect(() => {
    onAuthStateChanged(auth, (user) => setUser(user))
  }, [])


  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home user={user}/>}> 
          </Route>

          <Route exact path='/signin' element={<Signin/>}> 
          </Route>

          <Route exact path='/signup' element={<Signup/>}>
          </Route>

        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
