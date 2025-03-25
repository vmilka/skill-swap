import { useState } from "react";

const Chat = ({ chat, onBack }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hola, ¿cómo estás?", sender: "other" },
    { id: 2, text: "¡Hola! Todo bien, ¿y tú?", sender: "me" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: Date.now(), text: newMessage, sender: "me" }]);
      setNewMessage("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <button onClick={onBack} className="text-blue-500 mb-2">← Volver a chats</button>
      <h2 className="text-2xl font-bold mb-4">Chat con {chat.name}</h2>

      <div className="h-64 overflow-y-auto border p-2 rounded">
        {messages.map((msg) => (
          <div key={msg.id} className={`p-2 my-1 ${msg.sender === "me" ? "text-right" : "text-left"}`}>
            <span className={`inline-block px-3 py-1 rounded-lg ${msg.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 p-2 border rounded-lg"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
