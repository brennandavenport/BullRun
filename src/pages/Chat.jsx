import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { styled } from '@mui/system';

const ChatContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  height: '75vh', // 4:3 aspect ratio
  maxWidth: '1000px',
  margin: 'auto',
  padding: '16px',
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
});

const MessagesContainer = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  padding: '16px',
  marginBottom: '16px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  border: '1px solid #ddd',
});

const Message = styled(Box)(({ sender }) => ({
  maxWidth: '70%',
  padding: '12px 16px',
  marginBottom: '12px',
  borderRadius: sender === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
  backgroundColor: sender === 'user' ? '#1976d2' : '#e0e0e0',
  color: sender === 'user' ? '#fff' : '#000',
  alignSelf: sender === 'user' ? 'flex-end' : 'flex-start',
  '& p': {
    margin: '4px 0',
  },
  '& ul': {
    margin: '4px 0',
    paddingLeft: '20px',
  },
  '& li': {
    marginBottom: '4px',
  },
}));

const InputArea = styled(Box)({
  display: 'flex',
  gap: '8px',
});

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const apiKey = "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"; // Replace with your actual API key
    /*
  useEffect(() => {
    // Send the initial API request on page load
    const sendInitialMessage = async () => {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini', // Use the appropriate model
            messages: [
              {
                role: 'system',
                content: `You are a knowledgeable financial assistant that provides insights into the stock market. Your goal is to help users understand stocks by explaining financial metrics, trends, and important news. 
                
                You will:
                - Provide fundamental analysis (e.g., P/E ratio, revenue growth, EPS, dividend yield).
                - Explain technical indicators (e.g., moving averages, RSI, MACD).
                - Summarize recent news or events that could impact the stock.
                - Offer general market sentiment and risk analysis.
                - Avoid giving direct financial advice but instead guide users in making informed decisions.
                - Keep all messages under 300 words.
      
                Always explain financial terms in simple language when necessary and remain unbiased in your assessments.`,
              },
              { role: 'user', content: 'Tell me about NVDA' }, // Initial prompt
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
        console.error('Error sending initial message:', error);
      }
    };
    
    sendInitialMessage();
  }, [apiKey]);
    */
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
          model: 'gpt-4o-mini', // Use the appropriate model
          messages: [
            {
              role: 'system',
              content: `You are a knowledgeable financial assistant that provides insights into the stock market. Your goal is to help users understand stocks by explaining financial metrics, trends, and important news. 
                
                You will:
                - Provide fundamental analysis (e.g., P/E ratio, revenue growth, EPS, dividend yield).
                - Explain technical indicators (e.g., moving averages, RSI, MACD).
                - Summarize recent news or events that could impact the stock.
                - Offer general market sentiment and risk analysis.
                - Avoid giving direct financial advice but instead guide users in making informed decisions.
                - Keep all messages under 150 words.
      
                Always explain financial terms in simple language when necessary and remain unbiased in your assessments.`,
            },
            ...messages.map((msg) => ({ role: msg.sender === 'user' ? 'user' : 'assistant', content: msg.text })),
            { role: 'user', content: input },
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

  // Function to format the bot's response with paragraphs, bullet points, etc.
  const formatMessage = (text) => {
    // Replace newlines with <p> tags for paragraphs
    const formattedText = text
      .split('\n')
      .map((line, index) => `<p key=${index}>${line}</p>`)
      .join('');

    // Replace markdown-style bullet points with <ul> and <li> tags
    const bulletFormattedText = formattedText.replace(/\*\s(.*?)\n/g, '<li>$1</li>');
    const finalText = bulletFormattedText.replace(/<li>.*?<\/li>/g, (match) => `<ul>${match}</ul>`);

    return { __html: finalText };
  };

  return (
    <ChatContainer>
      <Typography variant="h5" gutterBottom>
        Financial Chatbot
      </Typography>
      <MessagesContainer>
        {messages.map((message, index) => (
          <Message key={index} sender={message.sender}>
            {message.sender === 'bot' ? (
              <div dangerouslySetInnerHTML={formatMessage(message.text)} />
            ) : (
              message.text
            )}
          </Message>
        ))}
      </MessagesContainer>
      <InputArea>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button variant="contained" color="primary" onClick={sendMessage}>
          Send
        </Button>
      </InputArea>
    </ChatContainer>
  );
};

export default Chatbot;