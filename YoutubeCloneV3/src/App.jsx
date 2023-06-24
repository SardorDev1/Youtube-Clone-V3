import { useEffect, useState } from 'react'
import { Channel, Navbar, Main, VideoDetails, Search, Playlists, SignUp } from "./companents"
import { Route, Routes } from 'react-router-dom'
import "./assets/style.css"
import { auth } from './companents/service/Auth'

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Login } from './companents'
import { useNavigate } from 'react-router-dom'
function App() {
  const navigator = useNavigate()
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {

        navigator('/')
      } else {

        navigator('/login')
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <>
      <Navbar />
      <Routes>

        <Route  path='/' element={<Main />} />
        <Route path='/channel/:id' element={<Channel />} />

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />

        <Route path='/video/:id' element={<VideoDetails />} />

        <Route path='/Search/:id' element={<Search />} />
        <Route path='/playlists/:id' element={<Playlists />} />
      </Routes>
    </>
  )
}

export default App
