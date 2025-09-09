"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./page.module.css";
import { use, useState } from "react";
export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [streamingResponse, setStreamingResponse] = useState("");

  const handleChat = async () => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Contect-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = res.json();
      setResponse(data.response);

      setLoading(false);
    } catch (error) {
      setResponse(error.message);
    }
  };
  return (
    <div className={styles.page}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-red-400 p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md"
        >
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 animate-pulse">
            🤖 Let's Chat !
          </h1>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="Enter your message ...."
            className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-pink-400 focus:outline-none resize-none bg-white/80"
          />

          <div className="mt-6 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 2000); // fake loading
              }}
              className=" px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:from-pink-500 hover:to-red-500 transition-all duration-300 "
            >
              {loading ? "⏳ Loading..." : "💬 Chat"}
            </motion.button>
          </div>
          <div>
            {response}
         
          </div>
        </motion.div>
      </div>
    </div>
  );
}
