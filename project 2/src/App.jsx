import React, { useState } from "react";
import "./App.css";

const Navbar = () => (
    <nav className="navbar">
        <div className="logo">HealthCare+</div>
        <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#appointments">Appointments</a></li>
            <li><a href="#records">Records</a></li>
            <li><a href="#health-track">Health Track</a></li>
            <li><a href="#login">Login/Signup</a></li>
        </ul>
    </nav>
);

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const toggleChatbox = () => setIsOpen(!isOpen);
    
    const sendMessage = () => {
        if (input.trim()) {
            setMessages(prev => [...prev, input.trim()]);
            setInput("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <>
            <div className="chatbot" onClick={toggleChatbox}>
                <i className="fas fa-comments"></i>
            </div>
            {isOpen && (
                <div className="chatbox">
                    <div className="chatbox-header">Chat with us</div>
                    <div className="chatbox-body">
                        {messages.map((msg, index) => (
                            <p key={index}>{msg}</p>
                        ))}
                    </div>
                    <div className="chatbox-footer">
                        <input 
                            value={input} 
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message..." 
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default App; 