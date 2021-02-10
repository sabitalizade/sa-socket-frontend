import axios from '../axios'
import React, { useEffect, useRef, useState } from 'react'

const Chat = ({messages,deleteChat}) => {
    const time=new Date()    
    const messagesEndRef = useRef(null)
    const [input, setinput] = useState("")

    const userinfo =JSON.parse(sessionStorage.getItem("info"))
      // console.log(userinfo?.username)

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
            <div className="userName">{userinfo?.username}<span onClick={deleteChat} className="deleteall">clear chat</span></div>
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
                        <button onClick={sendMessage} type="submit"><img src="./assets/icons/send.svg" alt="" /></button>
              </form>
        </div>
    )
}

export default Chat
