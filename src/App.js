import { useEffect, useState} from "react"
import './App.css';
// import Pusher from "pusher-js"
import Chat from "./components/Chat";
import axios from "./axios"
import Join from "./components/Join";
import {  BrowserRouter as Router,  Route} from "react-router-dom";
import Register from "./components/Register";
import { io } from 'socket.io-client';
// const ENDPOINT = "http://localhost:5050";
const ENDPOINT = "https://sasocketserver.herokuapp.com";

function App() {
  const [messages, setMessages] = useState([])
  
  useEffect(() => {
   axios.get("/message/all").then(res=>{
    //  console.log(res.data)
     setMessages(res.data)
   })
  }, []);
  const deleteChat =()=>{
    axios.post("/message/deleteall").then(()=>{
      setMessages([]) 
    })
}
  useEffect(() => {    
    const socket = io(ENDPOINT, { transport : ['websocket'] });

    socket.on("msg", data => {
      console.log(data);
      setMessages([...messages,data])
      // console.log("fuck");
    });

    return ()=> socket.disconnect();
  },[messages])
  // console.log(messages)
  return (
    <Router>
    <div className="app">
      <div className="appContainer">
        <Route path="/" exact>
        <Join />      
        </Route>
        <Route path="/register" >
        <Register />
        </Route>
        <Route path="/chat">
           <Chat messages={messages} deleteChat={deleteChat}/>
        </Route>

      </div>
    </div>
    </Router>
  );
}

export default App;
