import React, { useState, useRef } from 'react';

export default function ChatInput({ onSend }) {
    const [input, setInput] = useState('');
    const textareaRef = useRef(null);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (input.trim()) {
                onSend(input.trim());
                setInput('');
            }
        }
    };

    return (
        <div className="chat-input-container">
      <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask something… (Shift+Enter for newline)"
          className="chat-textarea"
          rows={1}
      />
            <button
                onClick={() => {
                    if (input.trim()) {
                        onSend(input.trim());
                        setInput('');
                    }
                }}
                className="chat-send-button"
            >
                ➤
            </button>
        </div>
    );
}
