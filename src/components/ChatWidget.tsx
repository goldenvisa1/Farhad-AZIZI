import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, User, Headset, Circle } from "lucide-react";
import { io, Socket } from "socket.io-client";

interface Message {
  id: string;
  text: string;
  sender: "user" | "support";
  timestamp: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userId, setUserId] = useState<string>("");
  
  const socketRef = useRef<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate or retrieve persistent user ID
    let storedId = localStorage.getItem("euro_nobel_chat_id");
    if (!storedId) {
      storedId = Math.random().toString(36).substr(2, 9);
      localStorage.setItem("euro_nobel_chat_id", storedId);
    }
    setUserId(storedId);

    // Initialize socket connection
    const socket = io();
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected to chat server");
      socket.emit("join_chat", storedId);
    });

    socket.on("message_history", (history: Message[]) => {
      setMessages(history);
    });

    socket.on("new_message", (message: Message) => {
      setMessages((prev) => {
        // Prevent duplicates
        if (prev.find(m => m.id === message.id)) return prev;
        return [...prev, message];
      });
      if (message.sender === "support") {
        setIsTyping(false);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || !socketRef.current) return;

    socketRef.current.emit("send_message", {
      userId,
      text: inputValue
    });

    setInputValue("");
    setIsTyping(true);
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-[60]">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom left" }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-white w-[350px] sm:w-[400px] h-[550px] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-gold-500/10 mb-4"
              dir="rtl"
            >
              {/* Header */}
              <div className="bg-zinc-900 p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gold-500 rounded-2xl flex items-center justify-center text-black">
                      <Headset className="w-6 h-6" />
                    </div>
                    <Circle className="w-3 h-3 text-green-500 fill-current absolute -bottom-1 -left-1 border-2 border-zinc-900" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">پشتیبانی آنلاین یورو نوبل</h4>
                    <p className="text-gold-500/70 text-[10px] font-bold">پاسخگوی سوالات شما هستیم</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Messages Area */}
              <div 
                ref={scrollRef}
                className="flex-grow p-6 overflow-y-auto space-y-4 bg-[#FCFAF7] scrollbar-thin scrollbar-thumb-gold-500/20"
              >
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: msg.sender === "user" ? -10 : 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`max-w-[80%] p-4 rounded-3xl text-sm font-medium leading-relaxed ${
                        msg.sender === "user" 
                          ? "bg-gold-500 text-black rounded-tl-none" 
                          : "bg-white border border-zinc-100 text-zinc-900 shadow-sm rounded-tr-none"
                      }`}
                    >
                      {msg.text}
                      <span className={`block text-[8px] mt-1 opacity-50 ${msg.sender === "user" ? "text-black" : "text-zinc-500"}`}>
                        {new Date(msg.timestamp).toLocaleTimeString("fa-IR", { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white border border-zinc-100 p-3 rounded-2xl rounded-tr-none flex gap-1">
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input Area */}
              <form 
                onSubmit={handleSendMessage}
                className="p-4 bg-white border-t border-zinc-100"
              >
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="پیام خود را بنویسید..."
                    className="w-full bg-zinc-100/50 border-none rounded-2xl py-4 pr-4 pl-12 focus:ring-2 focus:ring-gold-500/30 outline-none text-sm font-medium transition-all"
                  />
                  <button 
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="absolute left-2 w-10 h-10 bg-gold-500 text-black rounded-xl flex items-center justify-center hover:bg-gold-400 transition-all disabled:opacity-50 disabled:grayscale"
                  >
                    <Send className="w-5 h-5 rotate-180" />
                  </button>
                </div>
                <p className="text-[9px] text-zinc-400 text-center mt-3 font-bold">تیم یورو نوبل معمولا در کمتر از ۵ دقیقه پاسخ می‌دهد</p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-[2rem] shadow-2xl flex items-center justify-center transition-all ${
            isOpen ? "bg-white text-zinc-900 rotate-90" : "bg-gold-500 text-black shadow-gold-500/30"
          }`}
        >
          {isOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
            </span>
          )}
        </motion.button>
      </div>
    </>
  );
}
