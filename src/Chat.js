import axios from './axios'
import React, { useEffect, useRef, useState } from 'react'

const Chat = ({messages}) => {
    const time=new Date()    
    const messagesEndRef = useRef(null)
    const [input, setinput] = useState("")
      

        const sendMessage= async e=>{
            e.preventDefault()
            if(input){

                await axios.post('/message/new',{
                     name:"Sabit",
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
            <div className="userName">Sabit</div>
            <div className="chatContent">

                {messages.map((message,id)=>(
                    <div className={message.recived?"messageBody recived" : "messageBody"} key={id}  ref={messagesEndRef}  >
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
