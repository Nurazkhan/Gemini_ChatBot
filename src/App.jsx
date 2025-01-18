import React from 'react'
import './App.css'
import Bot from './Bot.jsx'
import Dialogue from './Dialogue'
import Modal from './components/Modal.jsx'
import { API_KEY } from '../config.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
let chatobject = document.getElementById('chat');
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
const availableImages =[
  'CommonBot.webp',
  'BusinessBot.webp',
  'TherapistBot.webp',
]
console.log(Object.keys(sessionStorage))

for(let key of Object.keys(sessionStorage)) {
  console.log(sessionStorage[key])
  roleBasics[key]= roleBasics[key] || JSON.parse( sessionStorage[key])['_history']
}

function App() {
let [chatRole,setchatRole] = useState('CommonBot');
  const [prompt, setPrompt] = useState("");

  const [show, setShow] = useState(false)
  const [history, setHistory] = useState(() => {
    let CommonBot = sessionStorage.CommonBot;
    let hiExists = CommonBot ? JSON.parse(CommonBot) : null;
    return hiExists ? hiExists['_history'] : Com;
  });
  const changeRole = async (role) =>{
    const roleObject = sessionStorage[role]
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
  
   
    sessionStorage[role] = JSON.stringify({ _history: updatedHistoryWithResponse });
    console.log(updatedHistoryWithResponse);
    chatobject.scrollTo(0,1000)
  };

const addNewRole = async(name, info, doNotAnswer, doNot ) => {
   let additional = ''
  if (doNotAnswer){
    additional = "You must answer only with given information. If you dont know answer then you must reply "+ doNot
  }
let customhistory = [{
  "role": "user",
  "parts": [
      {
          "text": "Hello, I am a new role named "+name+". If someone asks you who you are you answer them, I will be "+name+". Here is the information for you" + info + additional
      }
  ]  
},
 {
  "role": "model",
  "parts": [
      {
          "text": "Okay, I understand.  If you ask me who I am, I will respond: \"I am a "+name+" bot.\"  "
      }
  ]
 }]
roleBasics[name]=customhistory;
}


  return (
    <div className='bg-primary'>
      <Dialogue hist = {history} askGem={askGem} prompt ={prompt} setPrompt={setPrompt} chatRole={chatRole} />
      <Bot changeRole = {changeRole} setchatRole={setchatRole} chatRole={chatRole} show={show} setShow={setShow} roleBasics={roleBasics} availableImages={availableImages}/>
      {show && <Modal setShow={setShow} addNewRole={addNewRole}/>}
    </div>
  )
}

export default App