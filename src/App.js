import { useEffect, useState} from "react"
import './App.css';
import Pusher from "pusher-js"
import Chat from "./Chat";
import axios from "./axios"

function App() {
  const [messages, setMessages] = useState([])
  
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
      // alert(JSON.stringify(newMessage));
      setMessages([...messages,newMessage])
    });

    return ()=>{
      channel.unbind_all();
      channel.unsubscribe()
    }

  }, [messages])
  // console.log(messages)
  return (
    <div className="app">
      <div className="appContainer">
          <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
