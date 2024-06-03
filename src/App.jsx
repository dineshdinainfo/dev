import { useState } from "react";
import "./App.css";
import Chat from "./components/chatbots";
function App() {
  const [active, setActive] = useState(false);
  return (
    <>
      chatBot
      {active ? (
        <Chat />
      ) : (
        <div className="chatbot-activate" onClick={() => setActive(true)}>
          <img
            src="https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg?w=740&t=st=1717139306~exp=1717139906~hmac=819768a74aa9d85ee741e7404e4d02495a55363b51e9e53f9d4fb103597e3164"
            alt="!"
          />
        </div>
      )}
    </>
  );
}

export default App;
