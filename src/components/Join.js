import axios from '../axios';
import React, { useState } from 'react'
// import { Link } from "react-router-dom";
import './Join.css'
import { Link, useHistory } from 'react-router-dom';


const Join=()=> {
  const [loginData, setLoginData] = useState();
  const [data, setData] = useState();
  let history = useHistory();

  // console.log(loginData);

  sessionStorage.setItem("info",JSON.stringify(data))

  const handleChange= e=>{
      setLoginData({...loginData,[e.target.name]:e.target.value})
  }
  const handleSubmit= async e=>{
    e.preventDefault()

    const res= await axios.post("/login",loginData)
    console.log(res)
    try{
      console.log(res)
      setData(res.data)
      history.push("/chat")
    } catch(error){
      console.log(error.message,"hgvgvyh")
    }
    
  }



    return (
        <form className="joinOuterContainer" onSubmit={handleSubmit}>
        <div className="joinInnerContainer">
          <h1 className="heading">Join</h1>
          <div>
            <input placeholder="Email" required className="joinInput" type="email" name="email" onChange={handleChange} />
          </div>
          <div>
            <input placeholder="Password" required className="joinInput mt-20" type="password" name="password" onChange={handleChange} />
          </div>
          <button className={'button mt-20'} type="submit">Sign In</button>
           <Link className='link' to="/register">Register now</Link>
        </div>
      </form>
    )
}

export default Join