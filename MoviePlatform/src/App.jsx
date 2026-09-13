import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Navbar from './assets/Components/Navbar'
import Home from './assets/Components/Pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MovieDetails } from './assets/Components/MovieDetail'
import MoviePlay from './assets/Components/MoviePlay'


function App() {


  return (
    <>


<main className='min-h-screen bg-[#030712] relative overflow-visible text-white font-sans flex flex-col' >
  <BrowserRouter>
  <Navbar/>



<Routes>
  <Route path='/' element={<Home/>} />
   <Route path='/movie/:id' element={<MovieDetails/>} />
     <Route path='/movie/play/:id' element={<MoviePlay />} />
</Routes>


 
</BrowserRouter>
</main>
    </>
  )
}

export default App
