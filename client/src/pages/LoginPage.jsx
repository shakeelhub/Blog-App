import React, { useContext, useState } from 'react'
import { Navigate,Link } from 'react-router-dom'
import { UserContext } from '../UserContext'
import '../styles/login.css'
import img1 from '../assets/login.png'

const LoginPage = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const { setUserInfo } = useContext(UserContext);

  async function login(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:4100/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })

    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo)
       
      })
      setRedirect(true);
    } else {
      alert('wrong credentials !')
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }


  return (
    <div className="container">
      <div className="left">
        <div className="login-section">
        {/* <img src={img1} alt='' style={{width:'auto',height:"50px"}}/> */}
        <header style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <h2 className="animation a1">Your Voice Matters.<br/> <span style={{color:"#028391",fontSize:'20px'}}>Log In to Be Heard!</span></h2>
          </header>
         
          <form className='login' style={{ maxWidth: "400px", margin: "0 auto" }} onSubmit={login}>
            <h1 style={{marginTop:'-10px'}}>Login</h1>
            <input type="text"
              placeholder='username'
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              className='input-field animation a3'
            />
            <input type="password"
              placeholder='password'
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='input-field animation a4'
            />
            <p className="animation a5" style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:'-5px'}}>Not a Member? <Link to='/signup' style={{color:'#7E8EF1',paddingLeft:'4px'}}> Sign Up</Link></p>
             <p className="animation a5"><a href="#" style={{color:'black',paddingTop:'-10px'}}>Forgot password?</a></p>
            <button className="animation a6">Login</button>
          </form>
        </div>
      </div>
      <div className="right"></div>
    </div>
  )
}

export default LoginPage