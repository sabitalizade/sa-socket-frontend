import axios from '../axios'
import React, { useEffect, useRef, useState } from 'react'

const Chat = ({messages}) => {
    const time=new Date()    
    const messagesEndRef = useRef(null)
    const [input, setinput] = useState("")

    const userinfo =JSON.parse(sessionStorage.getItem("info"))
      // console.log(userinfo?.username)




      const getDeviceType = () => {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
          return "tablet";
        }
        if (
          /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
            ua
          )
        ) {
          return "mobile";
        }
        return "desktop";
      };

console.log(getDeviceType());


        const sendMessage= async e=>{
            e.preventDefault()
            if(input){
                await axios.post('/message/new',{
                     name:userinfo?userinfo.username:"Unknown",
                     message:input,
                     timestamp:`${time.getHours()}:${time.getMinutes()}`,
                     recived:false
                 })
                 setinput("")
            }
        }



        const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }
        useEffect(() => {
            scrollToBottom()
        }, [messages])
    return (
        <div className="chatBody">
            <div className="userName">{userinfo?.username}</div>
            <div className="chatContent">

                {messages.map((message,id)=>(
                    <div className={message.name===userinfo?.username?"messageBody recived" : "messageBody"} key={id}  ref={messagesEndRef}  >

                        <span className="username">{message.name}</span>
                        <span className="message">{message.message}</span>
                        <span className="time">{message.timestamp}</span>
                    </div>
                )) }                    
               
            </div>
            <form className="sendMessage">
                        <input onChange={(e)=>setinput(e.target.value)} type="text" value={input} placeholder="Type a message"/>
                        <button onClick={sendMessage} type="submit">&#10095;</button>
              </form>
        </div>
    )
}

export default Chat
