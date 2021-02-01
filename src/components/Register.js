import axios from '../axios';
import React, { useState } from 'react'
import './Join.css'
import { Link, useHistory } from 'react-router-dom';
import { Message } from 'semantic-ui-react';


const Register=()=> {
  const [registerData, setRegisterData] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [errmessage, setErrmessage] = useState()

  let history = useHistory();

  // console.log(registerData)

  sessionStorage.setItem("info",JSON.stringify(data))

  const handleChange= e=>{
      setRegisterData({...registerData,[e.target.name]:e.target.value})
  }
  const handleSubmit= async e=>{
    e.preventDefault()
    setLoading(true)
    
    axios.post("/register",registerData).then(res=>{
      console.log(res)
      setData(res.data)
      setLoading(false)
      history.push("/chat")
    }).catch(error=>{
        setLoading(false)   
        setErrmessage(error.response.data)     
        // console.log(error.response.data)
      })

    
  }



    return (
        <form className="joinOuterContainer" onSubmit={handleSubmit}>
        <div className="joinInnerContainer">
        {
            errmessage && <Message style={{margin:"0 auto"}}  color='red'>{errmessage}</Message>
          }
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
          <button className={loading?"disabled button mt-20":'button mt-20'} disabled={loading} type="submit">Register now</button>
          <Link className='link' to="/">Join</Link>
        </div>
      </form>
    )
}

export default Register