import axios from '../axios';
import React, { useState } from 'react'
import { Message } from 'semantic-ui-react'
import './Join.css'
import { Link, useHistory } from 'react-router-dom';
import { Helmet } from "react-helmet";

const Join=()=> {
  const [loginData, setLoginData] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [errmessage, setErrmessage] = useState()
  let history = useHistory();


  sessionStorage.setItem("info",JSON.stringify(data))

  const handleChange= e=>{
      setLoginData({...loginData,[e.target.name]:e.target.value})
  }
  const handleSubmit= async e=>{
    e.preventDefault()
    setLoading(true)
    axios.post("/login",loginData).then(res=>{
      console.log(res)
      setData(res.data)
      setLoading(false)
      history.push("/chat")
    }).catch(error=>{
        setLoading(false)
        setErrmessage(error.response.data)
      })
        
  }



    return (
        <form className="joinOuterContainer" onSubmit={handleSubmit}>
          <Helmet>
                <meta charSet="utf-8" />
                <title>Join to Chat</title>
                <meta name="description" content="fuck it" />
            </Helmet>
        <div className="joinInnerContainer">
        
          {
            errmessage && <Message style={{margin:"0 auto"}}  color='red'>{errmessage}</Message>
          }
          
          <h1 className="heading">Join</h1>
          <div>
            <input placeholder="Email" required className="joinInput" type="email" name="email" onChange={handleChange} />
          </div>
          <div>
            <input placeholder="Password" required className="joinInput mt-20" type="password" name="password" onChange={handleChange} />
          </div>
          <button className={loading?"disabled button mt-20":'button mt-20'} disabled={loading} type="submit"  >Sign In</button>
           <Link className='link' to="/register">Register now</Link>
        </div>
      </form>
    )
}



export default Join