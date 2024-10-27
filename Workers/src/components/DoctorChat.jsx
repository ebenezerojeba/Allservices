import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import { AppContext } from "../context/AppContext";
import { DoctorContext } from "../context/DoctorContext";
import { Send, Loader, WifiOff } from "lucide-react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorChat = ({ appointment, isOpen, onClose }) => {
  const { backendUrl } = useContext(AppContext);
  const { dToken } = useContext(DoctorContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const MAX_RETRIES = 5;
  const RETRY_DELAY = 1000;

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const fetchMessages = useCallback(async () => {
    if (!appointment?._id) return;

    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${backendUrl}/api/chat/messages/doctor/${appointment._id}`,
        {
          headers: { token: dToken },
        }
      );

      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load messages");
    } finally {
      setIsLoading(false);
    }
  }, [appointment?._id, backendUrl, dToken]);

  const initializeSocket = useCallback(() => {
    if (!isOpen || !appointment || socketRef.current) return;

    try {
      socketRef.current = io(backendUrl, {
        path: "/socket.io/socketManager.js",
        transports: ["websocket", "polling"],
        secure: true,
        reconnection: true,
        reconnectionAttempts: MAX_RETRIES,
        reconnectionDelay: RETRY_DELAY,
        query: {
          token: dToken,
          appointmentId: appointment._id,
          role: "doctor",
        },
        headers: { token: dToken },
      });

      socketRef.current.on("connect", () => {
        setIsConnected(true);
        setRetryCount(0);
        toast.success("Chat connected successfully");
      });

      socketRef.current.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        setIsConnected(false);
        setRetryCount((prev) => prev + 1);

        if (retryCount >= MAX_RETRIES) {
          toast.error("Unable to connect to chat. Please try again later.");
          socketRef.current?.disconnect();
        }
      });

      socketRef.current.on("disconnect", (reason) => {
        setIsConnected(false);
        if (reason === "io server disconnect") {
          toast.error("Disconnected by server");
        }
      });

      socketRef.current.on("message", (message) => {
        setMessages((prev) => [...prev, message]);
        scrollToBottom();
        // Play notification sound for new messages from patient
        if (message.senderId === appointment.userId) {
          const audio = new Audio("/notification-sound.mp3");
          audio.play().catch((e) => console.log("Audio play failed:", e));
        }
      });
    } catch (error) {
      console.error("Socket initialization error:", error);
      toast.error("Chat initialization failed");
      setIsConnected(false);
    }
  }, [isOpen, appointment, backendUrl, dToken, retryCount, scrollToBottom]);

  useEffect(() => {
    if (isOpen && appointment) {
      initializeSocket();
      fetchMessages();
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off("connect");
        socketRef.current.off("disconnect");
        socketRef.current.off("message");
        socketRef.current.off("connect_error");
        socketRef.current.disconnect();
        setIsConnected(false);
        socketRef.current = null;
      }
    };
  }, [isOpen, appointment, initializeSocket, fetchMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = useCallback(
    (e) => {
      e.preventDefault();
      if (!newMessage.trim() || !socketRef.current || !isConnected) {
        !isConnected && toast.error("Chat is not connected. Please try again.");
        return;
      }

      try {
        const messageData = {
          appointmentId: appointment._id,
          content: newMessage.trim(),
          senderId: appointment.doctorId,
          timestamp: new Date().toISOString(),
        };

        socketRef.current.emit("sendMessage", messageData);
        setMessages((prev) => [...prev, messageData]);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
        toast.error("Failed to send message");
      }
    },
    [newMessage, isConnected, appointment]
  );

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage(e);
      }
    },
    [sendMessage]
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-lg h-[600px] flex flex-col shadow-xl">
        <div className="border-b p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img
                src={appointment?.userData?.image}
                alt={appointment?.userData?.name}
                className="w-8 h-8 rounded-full"
              />
              <h3 className="text-lg font-semibold">
                Chat with {appointment?.userData?.name}
              </h3>
              {!isConnected && <WifiOff className="w-4 h-4 text-red-500" />}
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex justify-center items-center h-full text-gray-500">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={`${message.timestamp}-${index}`}
                className={`flex ${
                  message.senderId === appointment.doctorId
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.senderId === appointment.doctorId
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm break-words">{message.content}</p>
                  <span className="text-xs opacity-75 mt-1 block">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendMessage} className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={!isConnected}
            />
            <button
              type="submit"
              disabled={!isConnected || !newMessage.trim()}
              className="bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorChat;
