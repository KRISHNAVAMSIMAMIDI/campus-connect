import { useState } from "react";
import "./messages.css";

function Messages() {
  const [message, setMessage] = useState("");

  const [chat, setChat] = useState([
    {
      sender: "club",
      text: "Hello! Welcome to Coding Club 👋",
    },
    {
      sender: "club",
      text: "How can we help you?",
    },
  ]);

  const sendMessage = () => {
    if (message.trim() === "") return;

    setChat([
      ...chat,
      {
        sender: "user",
        text: message,
      },
    ]);

    setMessage("");
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <h2>💬 Coding Club Support</h2>
        <p>Club Representatives</p>
      </div>

      <div className="chat-box">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={
              msg.sender === "user"
                ? "user-message"
                : "club-message"
            }
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
        />

        <button onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Messages;
