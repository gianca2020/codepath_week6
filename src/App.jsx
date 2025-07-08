//import { useState } from 'react'
import './App.css'
import AlbumCard from './components/AlbumCard.jsx'

function App() {
  return (
    <>
      <div className='flex flex-col justify-center items-center h-screen bg-gray-100'>
        <h1 className='text-4xl font-bold mb-8 text-gray-800'>Which new albums do you want to discover?</h1>
        <AlbumCard albumID="0ETFjACtuP2ADo6LFhL6HN" />
      </div>
    </>
  )
}



export default App
