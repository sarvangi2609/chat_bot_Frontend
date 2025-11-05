

import { useState } from "react";

export default function Main() {
  const [messages, setMessages] = useState([]); // chat history
  const [input, setInput] = useState("");

  // When user clicks Send
  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const newMessage = { type: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Mock AI / code output logic
    setTimeout(() => {
      // If message contains word "code", show code block
      if (input.toLowerCase().includes("code")) {
        const codeResponse = {
          type: "code",
          text: `console.log("Hello from AI code response!");`,
        };
        setMessages((prev) => [...prev, codeResponse]);
      } else {
        const normalResponse = {
          type: "bot",
          text: `🤖 AI: You said "${input}"`,
        };
        setMessages((prev) => [...prev, normalResponse]);
      }
    }, 500);
  };

  // Copy handler for code snippet
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Code copied!");
  };

  // Run handler (you can later link backend execution)
  const handleRun = (text) => {
    alert(`Running code:\n\n${text}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white items-center py-6 px-4">
      <div className="w-full max-w-3xl bg-gray-800 rounded-2xl shadow-lg flex flex-col justify-between p-4">
        
        {/* OUTPUT SECTION */}
        <div className="flex-1 overflow-y-auto bg-gray-900 rounded-lg p-4 mb-4 border border-gray-700 h-[400px]">
          {messages.length === 0 && (
            <p className="text-gray-500 text-center mt-10">Start chatting...</p>
          )}

          {messages.map((msg, index) => (
            <div key={index} className={`mb-4`}>
              {msg.type === "user" && (
                <div className="text-right">
                  <p className="bg-blue-600 inline-block px-4 py-2 rounded-lg max-w-[80%] text-sm">
                    {msg.text}
                  </p>
                </div>
              )}

              {msg.type === "bot" && (
                <div className="text-left">
                  <p className="bg-gray-700 inline-block px-4 py-2 rounded-lg max-w-[80%] text-sm">
                    {msg.text}
                  </p>
                </div>
              )}

              {msg.type === "code" && (
                <div className="relative bg-gray-800 rounded-lg p-3 font-mono text-sm border border-gray-700">
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => handleCopy(msg.text)}
                      className="bg-gray-700 hover:bg-gray-600 text-xs px-3 py-1 rounded"
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => handleRun(msg.text)}
                      className="bg-green-600 hover:bg-green-700 text-xs px-3 py-1 rounded"
                    >
                      Run
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap mt-6">{msg.text}</pre>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* INPUT SECTION */}
        <div className="flex items-center bg-gray-700 rounded-full p-2">
          <input
            type="text"
            placeholder="Write your code or message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-transparent text-gray-100 p-2 focus:outline-none rounded-full"
          />
          <button
            onClick={handleSend}
            className="ml-3 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-full font-semibold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
