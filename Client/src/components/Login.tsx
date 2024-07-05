import React, {useState} from 'react'
import {toast} from 'react-toastify'

const Login = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const loginAction = () => {
        if(email === "" || password === ""){
            toast.error("All the fields must be filled")
            return;
        }

        //todo: add funcionality

        setEmail("")
        setPassword("")
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-12'>
            <h1 className='title'>Login</h1>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' placeholder='Email' />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='form-control' placeholder='Password' />

            <button onClick={loginAction} className='btn btn-success'>Login</button>
            </div>
        </div>
    </div>
  )
}

export default Login