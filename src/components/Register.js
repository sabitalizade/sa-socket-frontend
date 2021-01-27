import axios from '../axios';
import React, { useState } from 'react'
import './Join.css'
import { Link, useHistory } from 'react-router-dom';


const Register=()=> {
  const [registerData, setRegisterData] = useState();
  const [data, setData] = useState();
  let history = useHistory();

  // console.log(registerData)

  sessionStorage.setItem("info",JSON.stringify(data))

  const handleChange= e=>{
      setRegisterData({...registerData,[e.target.name]:e.target.value})
  }
  const handleSubmit= async e=>{
    e.preventDefault()

    const res= await axios.post("/register",registerData)
    console.log(res)
    try{
      console.log(res)
      setData(res.data)
      history.push("/chat")
    } catch(error){
      console.log(error)
    }

    // axios.post("/register",registerData)
    // .then(res=>{
    //   setData(res.data)
    //   history.push("/chat")
    // })
  }



    return (
        <form className="joinOuterContainer" onSubmit={handleSubmit}>
        <div className="joinInnerContainer">
          <h1 className="heading">Register</h1>
          <div>
            <input placeholder="Username" className="joinInput" type="text" name="username" onChange={handleChange} />
          </div>
          <div>
            <input placeholder="Email" className="joinInput  mt-20" type="email" name="email" onChange={handleChange} />
          </div>
          <div>
            <input placeholder="Password" className="joinInput mt-20" type="password" name="password" onChange={handleChange} />
          </div>
          <button className={'button mt-20'} type="submit">Register now</button>
          <Link className='link' to="/">Join</Link>
        </div>
      </form>
    )
}

export default Register