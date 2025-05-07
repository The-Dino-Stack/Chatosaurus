import React, { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { usePluginData } from '@docusaurus/useGlobalData';

export default function Chat() {
    const pluginData = usePluginData('chatosaurus');

    const [messages, setMessages] = useState([
        { type: 'assistant', content: 'Hey! What do you want to know about the docs? 😊' },
    ]);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const formatChatHistory = (history) => {
        return history
            .map(msg => `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
            .join('\n');
    };

    const handleSend = async (userInput) => {
        const newMessages = [...messages, { type: 'user', content: userInput }];
        setMessages(newMessages);

        try {
            const chatHistory = formatChatHistory(newMessages);
            const response = await fetch("http://localhost:5051/prompt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": pluginData.apiKey,
                },
                body: JSON.stringify({ prompt: chatHistory }),
            });

            const data = await response.json();

            if (!response.ok || !data.answer) {
                throw new Error(data.error || 'Unknown error from API');
            }

            setMessages(prev => [...prev, { type: 'assistant', content: data.answer }]);
        } catch (error) {
            console.error('Error fetching API response:', error);
            setMessages(prev => [
                ...prev,
                {
                    type: 'assistant',
                    content: 'Sorry, I encountered an error while processing your request.',
                },
            ]);
        }
    };

    if (!pluginData || typeof pluginData !== 'object') {
        console.error('Invalid plugin data:', pluginData);
        return <div>Error loading plugin data.</div>;
    }

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((msg, idx) => (
                    <ChatMessage key={idx} type={msg.type} content={msg.content} />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <ChatInput onSend={handleSend} />
        </div>
    );
}