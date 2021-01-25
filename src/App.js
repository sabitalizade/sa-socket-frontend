import { useEffect, useState} from "react"
import './App.css';
import Pusher from "pusher-js"
import Chat from "./components/Chat";
import axios from "./axios"
import Join from "./components/Join";
import {
  BrowserRouter as Router,  
  Route,
  
} from "react-router-dom";
import Register from "./components/Register";

function App() {
  const [messages, setMessages] = useState([])

  // console.log(name)
  useEffect(() => {
   axios.get("/message/all").then(res=>{
     setMessages(res.data)
   })
  }, []);

  useEffect(() => {
   
    var pusher = new Pusher('5e158d5fe3e9f7113dc8', {
      cluster: 'eu'
    });
  
    var channel = pusher.subscribe('asyachannel');
    channel.bind('asyaevent', (newMessage)=> {      
      setMessages([...messages,newMessage])
    });

    return ()=>{
      channel.unbind_all();
      channel.unsubscribe()
    }
  }, [messages])
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
           <Chat messages={messages}/>
        </Route>

      </div>
    </div>
    </Router>
  );
}

export default App;
