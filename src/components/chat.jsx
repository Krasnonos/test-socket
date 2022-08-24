import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [messageRecived, setMessageRecived] = useState([]);
  const [messageSended, setMessageSended] = useState([]);

  useEffect(() => {
    socket.on('recive_message', data => {
      setMessageRecived([...messageRecived, data.message]);
    });
  }, [messageRecived]);

  const sendMessage = e => {
    e.preventDefault();
    socket.emit('send_message', { message: message });
    console.log(message);
    setMessageSended([...messageSended, message]);
    setMessage('');
  };

  return (
    <>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="message..."
          onChange={e => {
            setMessage(e.target.value);
          }}
        />
        <button type="submit">Send message</button>
      </form>
      {messageRecived.map(msg => (
        <p key={msg} className="recived">
          {msg}
        </p>
      ))}
      {messageSended.map(msg => (
        <p key={msg} className="recived">
          {msg}
        </p>
      ))}
    </>
  );
};

export default ChatPage;

// test
