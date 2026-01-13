import { useEffect, useState } from 'react';
import type { MyEvent } from './Profile'
import { io } from "socket.io-client";
import { useLocation } from 'react-router-dom';
const ChatRoom = () => {
  const location = useLocation();
  const { state } = location as unknown as { state: { event: MyEvent } };
  const [ActiveChatEventId, setActiveChatEventId] = useState(state.event._id);
  const [messages, setMessages] = useState<Array<{eventId: string, message: string, sender: string}>>([])
  const [inputValue, setinputValue] = useState('')
  const socket = io("http://localhost:8000", {
    auth: {
      token: localStorage.getItem("token")
    }
  });
  const openChat = (eventId: string) => {
    socket.emit("join-event-room", { eventId });
    setActiveChatEventId(eventId);
  }
  useEffect(() => {
    openChat(state.event._id);
  }, [])
  
  const sendMessage = (eventId: string, message: string) => {
    socket.emit("send-message", {eventId, message})
  }
  useEffect(() => {
  socket.on("receive-message", (msg) => {
    setMessages(prev => [...prev, msg]);
  });

  return () => {
    socket.off("receive-message");
  };
}, []);
  // console.log("ChatRoom event:", state.event);
  return (
    <>
      <div className='w-full h-screen bg-gray-400'>
        <div className='msg '>
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 m-2 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
              <span className='bg-white p-2 rounded'>{msg.message}</span>
            </div>
          ))}
        </div>
        <div>
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setinputValue(e.target.value)} />
          <button onClick={()=> sendMessage(ActiveChatEventId, inputValue)}>Send</button>
        </div>
      </div>
    </>
  )
}

export default ChatRoom
