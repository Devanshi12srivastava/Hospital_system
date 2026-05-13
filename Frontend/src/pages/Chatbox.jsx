import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { MessageCircle, X } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { sendChatMessage } from "../api/chatBotApi";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);


  const { backendUrl } = useContext(AppContext);
  const bottomRef = useRef(null);

  // 👋 initial greeting
  useEffect(() => {
    setMessages([
      { role: "bot", text: "Hi 👋 I am AI Doctor Assistant" },
      { role: "bot", text: "What is your name?" },
    ]);
  }, []);

  // 🚀 send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;

    setMessages((prev) => [...prev, { role: "user", text: userText }]);

    setInput("");

    // 👤 STEP 1: name flow
    if (step === 0) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: `Nice to meet you 😊`,
          },
          {
            role: "bot",
            text: "Ask me about doctors, fees, timing, etc.",
          },
        ]);
      }, 500);

      setStep(1);
      return;
    }

    // 🤖 API CALL
    setLoading(true);

    try {
     const res = await sendChatMessage(backendUrl, userText) 
      setMessages((prev) => [...prev, { role: "bot", text: res.data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Server error ❌" },
      ]);
    }

    setLoading(false);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <>
      {/* 💬 FLOAT BUTTON (BOTTOM RIGHT) */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => {
            if (open) {
              // reset chat on close
              setMessages([
                { role: "bot", text: "Hi 👋 I am AI Doctor Assistant" },
                { role: "bot", text: "What is your name?" },
              ]);

              setStep(0);
            }

            setOpen(!open);
          }}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer hover:scale-110 transition"
        >
          {open ? <X /> : <MessageCircle />}
        </button>
      </div>

      {/* 💬 CHAT WINDOW */}
      {open && (
        <div className="fixed bottom-20 right-5 w-[90%] sm:w-87.5 h-125 bg-white shadow-2xl rounded-2xl flex flex-col z-50 overflow-hidden">
          {/* HEADER */}
          <div className="bg-blue-600 text-white p-3 font-bold">
            🧠 AI Doctor Assistant
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-xl text-sm max-w-[80%]
                  ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-white shadow"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && <div className="text-gray-500 text-sm">Typing...</div>}

            <div ref={bottomRef} />
          </div>

          {/* INPUT */}
          <div className="p-2 border-t flex gap-2">
            <input
              className="flex-1 border rounded-full px-3 py-2 text-sm"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-full cursor-pointer"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
