import React, { useState } from "react";
import { model } from "../Chat";

function chatBot() {
  const [msg, setMsg] = useState([]);
  const [input, setInput] = useState("");
  const [selectedIntent, setSelectedIntent] = useState(false);

  const handleSubmit = (e) => {
    // debugger;
    e.preventDefault();

    // if (!input.trim()) return;
    setMsg((msg) => [{ author: "user", text: input }, ...msg]);
    setTimeout(() => processInput(input), 10);
    setInput(" ");
  };
  const processInput = (input) => {
    const normalized = normalizeString(input);
    const intent = matchIntent(normalized);
    console.log(intent, "intent");

    const responses = generatorResponse(intent);
    console.log(responses, "responses");
    setMsg((msg) => [{ author: "bot", text: responses }, ...msg]);
  };
  const arrayIncludesString = (arr, string) => {
    console.log(arr, "stringsss");
    for (let word of arr) {
      if (!string.includes(word)) {
        console.log("arrayinclueddd");

        return false;
      }
    }

    return true;
  };

  const generatorResponse = (intent) => {
    console.log(intent, "generatorResponse");
    if (model.responses && model.responses[intent]) {
      const responses = model.responses[intent];
      console.log(responses, "responses");
      const randomIndex = Math.floor(Math.random() * responses.length);
      console.log(responses[randomIndex].answer, "respomsessss");
      return responses[randomIndex].answer;
    }
    return " I'm soryy, i don't understanding";
  };
  function normalizeString(input) {
    return input.replace(/[^a-zA-Z ]/g, "");
  }

  const matchIntent = (input) => {
    // console.log(userinput, "match");
    if (model.intents) {
      for (const [intent, patterns] of Object.entries(model.intents)) {
        for (const pattern of patterns) {
          const array = pattern.split(" ");
          console.log(array, "array");
          if (arrayIncludesString(array, input)) {
            console.log(intent, "intentmatch");
            return intent;
          }
        }
      }
    }
  };
  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <img src="https://img.freepik.com/free-vector/cute-robot-flying-cartoon-illustration-people-technology-icon-concept_138676-1892.jpg?w=740&t=st=1717141085~exp=1717141685~hmac=dfe026aa4ea0c0e61456e0fa8fbe2b376bd211a49e0c31f2aae275868948726b" />
        chatBot
      </div>
      <div className="messages">
        {msg.map((message, index) => {
          return (
            <div
              key={message.text + index}
              className={`message ${message.author}`}
            >
              {message.text}
              {console.log(message, "message")}
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your query..."
          wrap="soft"
        />
        <button type="submit">send</button>
      </form>
    </div>
  );
}

export default chatBot;
