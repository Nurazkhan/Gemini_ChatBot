import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

import Chat from "./Chat";


let chatd = document.getElementById('chat')
export default function Dialogue(props) {

  return (
    <div className="dialogueWindow">
      <Chat history={props.hist} />

      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          props.askGem(props.prompt, props.chatRole);
          props.setPrompt("");
          chatd.scrollTo(0,1000)
        }}
        className="form"
      >
        <input
          value={props.prompt}
          className="formInput"
          onChange={(e) => props.setPrompt(e.target.value)}
        />
        <button className="formButton">ASK Gemini</button>
      </form>
    </div>
  );
}
