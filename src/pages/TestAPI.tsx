import axios from "axios";
import { useEffect, useState } from "react";

const TestAPI = () => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  // ✅ NEW: edit state
  const [editId, setEditId] = useState<number | null>(null);

  // ✅ Fetch messages
  const fetchMessages = () => {
    axios.get("http://127.0.0.1:8000/api/messages/")
      .then(res => setMessages(res.data))
      .catch(err => console.log(err));
  };

  // ✅ Add message
  const sendData = () => {
    if (!name || !text) {
      alert("Please enter both name and message");
      return;
    }

    axios.post("http://127.0.0.1:8000/api/add/", {
      name,
      text
    })
    .then(res => {
      setResponse(res.data.message);
      setName("");
      setText("");
      fetchMessages();
    })
    .catch(err => console.log(err));
  };

  // ✅ NEW: Update message
  const updateMessage = () => {
    if (!name || !text) {
      alert("Please enter both name and message");
      return;
    }

    axios.put(`http://127.0.0.1:8000/api/update/${editId}/`, {
      name,
      text
    })
    .then(() => {
      setResponse("Updated successfully");
      setEditId(null);
      setName("");
      setText("");
      fetchMessages();
    })
    .catch(err => console.log(err));
  };

  // ✅ Delete message
  const deleteMessage = (id: number) => {
    axios.delete(`http://127.0.0.1:8000/api/delete/${id}/`)
      .then(() => fetchMessages())
      .catch(err => console.log(err));
  };

  // ✅ Load on start
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Django API Test</h2>

      {/* INPUTS */}
      <input
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Enter message"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br /><br />

      {/* ✅ CHANGE BUTTON */}
      {editId ? (
        <button onClick={updateMessage}>Update Message</button>
      ) : (
        <button onClick={sendData}>Add Message</button>
      )}

      <p>{response}</p>

      <hr />

      {/* DISPLAY */}
      <h3>All Messages</h3>

      {messages.length === 0 ? (
        <p>No messages yet</p>
      ) : (
        messages.map((msg) => (
          <div key={msg.id} style={{ marginBottom: "10px" }}>
            <b>{msg.name}</b>: {msg.text}

            {/* DELETE */}
            <button
              onClick={() => deleteMessage(msg.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>

            {/* ✅ EDIT BUTTON */}
            <button
              onClick={() => {
                setEditId(msg.id);
                setName(msg.name);
                setText(msg.text);
              }}
              style={{ marginLeft: "10px" }}
            >
              Edit
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default TestAPI;