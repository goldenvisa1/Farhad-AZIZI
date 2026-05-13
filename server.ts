import express from "express";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  const PORT = 3000;

  // Real-time Chat Logic
  // Each client (user) gets their own room or we can use the socket ID
  // In a real support app, we'd persist messages in a DB. 
  // For this demo, we'll keep it in-memory.
  const conversations: Record<string, any[]> = {};

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("join_chat", (userId: string) => {
      socket.join(userId);
      console.log(`User ${userId} joined their chat room`);
      
      // Send message history if any
      if (conversations[userId]) {
        socket.emit("message_history", conversations[userId]);
      } else {
        conversations[userId] = [{
          id: "welcome",
          text: "درود بر شما! خوش آمدید به یورو نوبل. چطور می‌توانیم شما را در مسیر مهاجرت به اروپا همراهی کنیم؟",
          sender: "support",
          timestamp: new Date().toISOString()
        }];
        socket.emit("message_history", conversations[userId]);
      }
    });

    socket.on("send_message", (data: { userId: string, text: string }) => {
      const { userId, text } = data;
      const newMessage = {
        id: Math.random().toString(36).substr(2, 9),
        text,
        sender: "user",
        timestamp: new Date().toISOString()
      };

      if (!conversations[userId]) conversations[userId] = [];
      conversations[userId].push(newMessage);

      // In a real app, an admin would reply. 
      // For this interactive experience, let's simulate a support reply 
      // after a short delay to make it feel "live" and "concurrent-aware".
      io.to(userId).emit("new_message", newMessage);

      setTimeout(() => {
        const supportReply = {
          id: Math.random().toString(36).substr(2, 9),
          text: "ممنون از پیام شما. یکی از مشاوران متخصص ما در حال بررسی درخواست شماست. لطفا چند لحظه منتظر بمانید.",
          sender: "support",
          timestamp: new Date().toISOString()
        };
        conversations[userId].push(supportReply);
        io.to(userId).emit("new_message", supportReply);
      }, 1500);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
