import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/lib/auth";

const Messages = () => {
  const { user } = useAuth();
  const [params] = useSearchParams();

  const receiver_id = params.get("with");
  const sender_id = user?.id;

  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  // 🔥 Fetch messages
  const fetchMessages = () => {
    if (!sender_id || !receiver_id) return;

    axios
      .get(
        `http://127.0.0.1:8000/api/messages/?sender=${sender_id}&receiver=${receiver_id}`
      )
      .then((res) => setMessages(res.data))
      .catch((err) => console.log(err));
  };

  // 🔥 Send typing
  const sendTyping = (typing: boolean) => {
    if (!sender_id) return;

    axios.post("http://127.0.0.1:8000/api/typing/set/", {
      user_id: sender_id,
      typing,
    });
  };

  // 🔥 Send message
  const sendMessage = () => {
    if (!text.trim()) return;

    axios
      .post("http://127.0.0.1:8000/api/send/", {
        sender_id: String(sender_id),
        receiver_id: String(receiver_id),
        content: text,
      })
      .then(() => {
        setText("");
        fetchMessages();
      })
      .catch(() => alert("API error"));
  };

  // 🔥 Auto refresh + typing
  useEffect(() => {
    if (!sender_id || !receiver_id) return;

    fetchMessages();

    const interval = setInterval(fetchMessages, 2000);

    const typingInterval = setInterval(() => {
      axios
        .get(`http://127.0.0.1:8000/api/typing/get/?user=${receiver_id}`)
        .then((res) => setIsTyping(res.data.typing))
        .catch(() => {});
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(typingInterval);
    };
  }, [sender_id, receiver_id]);

  // 🔥 Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{ padding: "20px" }}>
      {/* HEADER */}
      <h2>Chat with User {receiver_id}</h2>

      {/* TYPING */}
      {isTyping && (
        <p style={{ color: "gray", fontSize: "12px" }}>typing...</p>
      )}

      {/* CHAT BOX */}
      <div
        style={{
          height: "400px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          borderRadius: "8px",
          background: "#fafafa",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              alignSelf:
                msg.sender_id === sender_id ? "flex-end" : "flex-start",
              background:
                msg.sender_id === sender_id ? "#dcf8c6" : "#ffffff",
              padding: "8px 12px",
              borderRadius: "10px",
              marginBottom: "8px",
              maxWidth: "60%",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            {/* TEXT + SEEN */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>{msg.content}</span>

              {msg.sender_id === sender_id && (
                <span style={{ marginLeft: "8px", fontSize: "12px" }}>
                  {msg.seen ? "✔✔" : "✔"}
                </span>
              )}
            </div>

            {/* TIME */}
            <div
              style={{
                fontSize: "10px",
                color: "gray",
                marginTop: "3px",
                textAlign: "right",
              }}
            >
              {new Date(msg.created_at).toLocaleTimeString()}
            </div>
          </div>
        ))}

        {/* 🔥 scroll anchor */}
        <div ref={bottomRef}></div>
      </div>

      {/* INPUT */}
      <div style={{ display: "flex", marginTop: "10px" }}>
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            sendTyping(true);
            setTimeout(() => sendTyping(false), 1000);
          }}
          placeholder="Type message..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            marginLeft: "10px",
            padding: "10px 15px",
            background: "#25d366",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Messages;