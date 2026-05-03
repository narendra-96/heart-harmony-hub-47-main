import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

const Conversations = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [list, setList] = useState<any[]>([]);

  // 🔥 Fetch conversations
  const fetchConversations = () => {
    if (!user) return;

    axios
      .get(`http://127.0.0.1:8000/api/conversations/?user=${user.id}`)
      .then((res) => setList(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchConversations();
  }, [user]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Chats</h2>

      {list.length === 0 ? (
        <p>No conversations yet</p>
      ) : (
        list.map((chat) => (
          <div
            key={chat.user_id}
            onClick={() => navigate(`/messages?with=${chat.user_id}`)}
            style={{
              padding: "12px",
              borderBottom: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            <b>User {chat.user_id}</b>
            <p style={{ margin: 0, color: "gray" }}>
              {chat.last_message}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Conversations;