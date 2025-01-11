import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import { API_KEY } from "../config";
import Chat from "./Chat";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function Dialogue() {
  const [prompt, setPrompt] = useState("");

  const [history, setHistory] = useState(() => {
    let hi = localStorage.hi;
    let hiExists = hi ? JSON.parse(hi) : null;
    return hiExists ? hiExists['_history'] : [];
  });

  const chat = model.startChat({ history });

  const askGem = async (prompt) => {
    
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
  
   
    localStorage.hi = JSON.stringify({ _history: updatedHistoryWithResponse });
  };
  

  return (
    <div className="dialogueWindow">
      <Chat history={history} />

      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          askGem(prompt);
          setPrompt("");
        }}
        className="form"
      >
        <input
          value={prompt}
          className="formInput"
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button className="formButton">ASK Gemini</button>
      </form>
    </div>
  );
}
