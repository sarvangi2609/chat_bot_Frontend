
import { useState, useEffect, useRef } from "react";

export default function Main() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [input]);

  // Send handler
  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { type: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    setTimeout(() => {
      const aiResponse = {
        type: "bot",
        text: `🤖 AI:\n${input}`,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white items-center py-6 px-4">
      <div className="w-full max-w-3xl bg-gray-800 rounded-2xl shadow-lg flex flex-col justify-between p-4">
        
        {/* Chat Output */}
        <div className="flex-1 overflow-y-auto bg-gray-900 rounded-lg p-4 mb-4 border border-gray-700 h-[400px]">
          {messages.length === 0 && (
            <p className="text-gray-500 text-center mt-10">Start chatting...</p>
          )}

          {messages.map((msg, index) => (
            <div key={index} className={`mb-4`}>
              {msg.type === "user" && (
                <div className="text-right">
                  <pre className="bg-blue-600 inline-block px-4 py-2 rounded-lg max-w-[80%] text-sm whitespace-pre-wrap font-mono text-left overflow-x-auto">
                    {msg.text}
                  </pre>
                </div>
              )}

              {msg.type === "bot" && (
                <div className="text-left">
                  <pre className="bg-gray-700 inline-block px-4 py-2 rounded-lg max-w-[80%] text-sm whitespace-pre-wrap font-mono text-left overflow-x-auto">
                    {msg.text}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Section */}
        <div className="flex items-end bg-gray-700 rounded-xl p-3 mt-2">
          <textarea
            ref={textareaRef}
            placeholder="Write your code here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="flex-1 bg-transparent text-gray-100 resize-none p-2 focus:outline-none font-mono text-sm overflow-hidden leading-relaxed min-h-[50px] max-h-[200px] whitespace-pre-wrap"
          ></textarea>
          <button
            onClick={handleSend}
            className="ml-3 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-semibold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
