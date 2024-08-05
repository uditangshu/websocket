"use client"
import { useEffect, useState } from 'react'

export default function() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [latestMessage,setLatestMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log('Connection established');
      newSocket.send('Hello Server!');
      setSocket(newSocket);
    }
    newSocket.onmessage = (message) => {
      console.log('Message received:', message.data);
      setLatestMessage(message.data)
    }
    setSocket(newSocket);
    return () => newSocket.close();
  }, [])

  return (
    <>
     <input onChange = {(e: any)=>{
      setMessages(e.target.value)
     }} className='flex border-spacing-6'></input>
     <button className ='bg bg-grey-500' onClick={()=>{
      socket?.send(messages)
     }}> send </button>
     {latestMessage}
    </>
  )
}