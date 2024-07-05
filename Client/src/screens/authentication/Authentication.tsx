import React from 'react'
import Logo from '../../components/Logo'
import Login from '../../components/Login'
import Signup from '../../components/Signup'

const Authentication = () => {
  return (
    <div className='container'>
        <Logo/>
        <div className='row mt-5'>
            <div className='col-6'>
              <Login />
            </div>
            <div className='col-6'>
              <Signup />
            </div>
        </div>
    </div>
    
  )
}

export default Authentication