import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const apiKey = "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"; // Replace with your actual API key

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `You are a knowledgeable financial assistant that provides insights into the stock market. Your goal is to help users understand the stock {stock} by explaining financial metrics, trends, and important news. 
                
                You will:
                - Provide fundamental analysis (e.g., P/E ratio, revenue growth, EPS, dividend yield).
                - Explain technical indicators (e.g., moving averages, RSI, MACD).
                - Summarize recent news or events that could impact the stock.
                - Offer general market sentiment and risk analysis.
                - Avoid giving direct financial advice but instead guide users in making informed decisions.
      
                Always explain financial terms in simple language when necessary and remain unbiased in your assessments.`
              },
              { role: 'user', content: `Tell me about NVDA` } //${stock}
            ],
          }),
        });
      
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      
        const data = await response.json();
        const botMessage = {
          text: data.choices[0].message.content,
          sender: 'bot',
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
      }

    setInput('');
  };

  return (
    <div className="chatbot">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;