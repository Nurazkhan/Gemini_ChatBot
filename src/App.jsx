import React from 'react'
import './App.css'
import Bot from './Bot.jsx'
import Dialogue from './Dialogue'
import { API_KEY } from '../config.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const Com = [
  {
      "role": "user",
      "parts": [
          {
              "text": "Remember Your role is Common Bot. If someone asks you who you are you answer them, I am common bot. I answer any of your question."
          }
      ]
  },
  {
      "role": "model",
      "parts": [
          {
              "text": "Okay, I understand.  If you ask me who I am, I will respond: \"I am a common bot.\"  I will do my best to answer any questions you have.\n"
          }
      ]
  },
  
]
const busBasic = [
  {
      "role": "user",
      "parts": [
          {
              "text": "Remember Your role is Business Bot. If someone asks you who you are you answer them, I am Business bot. I answer any of your question related to business."
          }
      ]
  },
  {
      "role": "model",
      "parts": [
          {
              "text": "Okay, I understand.  If you ask me who I am, I will respond: \"I am a Business bot.\"  "
          }
      ]
  },
  
]
const therapistBasic = [
  {
      "role": "user",
      "parts": [
          {
              "text": "Remember Your role is Therapist Bot. If someone asks you who you are you answer them, I am Mental Therapist bot. I answer any of your question related to Mental health."
          }
      ]
  },
  {
      "role": "model",
      "parts": [
          {
              "text": "Okay, I understand.  If you ask me who I am, I will respond: \"I am a Therapist bot.\"  "
          }
      ]
  },
  
]

const roleBasics = {
  'CommonBot': Com,
  'BusinessBot': busBasic,
  'TherapistBot': therapistBasic,
}

function App() {
let [chatRole,setchatRole] = useState('CommonBot');
  const [prompt, setPrompt] = useState("");

  const [history, setHistory] = useState(() => {
    let CommonBot = localStorage.CommonBot;
    let hiExists = CommonBot ? JSON.parse(CommonBot) : null;
    return hiExists ? hiExists['_history'] : Com;
  });
  const changeRole = async (role) =>{
    const roleObject = localStorage[role]
    let roleObjectexits = roleObject ? JSON.parse(roleObject) : null;
    let final = roleObjectexits ? roleObjectexits['_history'] : roleBasics[role];
    setHistory(final)
    chatRole = role
  }
  const chat = model.startChat({ history });
 
  const askGem = async (prompt, role = "CommonBot") => {
    
    const updatedHistory = [
      ...history,
      { role: 'user', parts: [{ text: prompt }] },
    ];
  

    setHistory(updatedHistory);
  
    
    const result = await chat.sendMessage(prompt);
    const responseText = await result.response.text();
  
    
    const updatedHistoryWithResponse = [
      ...updatedHistory,
      { role: 'model', parts: [{ text: responseText }] },
    ];
  

    setHistory(updatedHistoryWithResponse);
  
   
    localStorage[role] = JSON.stringify({ _history: updatedHistoryWithResponse });
    console.log(updatedHistoryWithResponse);
  };




  return (
    <div className='bg-primary'>
      <Dialogue hist = {history} askGem={askGem} prompt ={prompt} setPrompt={setPrompt} chatRole={chatRole} />
      <Bot changeRole = {changeRole} setchatRole={setchatRole} chatRole={chatRole} />
    </div>
  )
}

export default App