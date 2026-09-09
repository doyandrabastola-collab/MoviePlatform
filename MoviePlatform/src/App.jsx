import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Navbar from './assets/Components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './assets/Components/Pages/Home'

function App() {


  return (
    <>


<main className='h-dvh bg-[#030712] relative overflow-hidden text-white font-sans flex flex-col' >
  <BrowserRouter>
  <Navbar/>



<Routes>
  <Route path='/' element={<Home/>} />

</Routes>


 
</BrowserRouter>
</main>
    </>
  )
}

export default App
