import { useState } from 'react'
import './App.css'
import Authentication from './screens/authentication/Authentication'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
      <ToastContainer />
      <Authentication/>
    </>
  )
}

export default App
