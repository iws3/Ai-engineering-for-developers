// 3.3 Broadcasting to All Clients

// ________________________________________________
// The wss.clients property is a Set<WebSocket> of all currently connected sockets. You
// can iterate over it to broadcast messages. Always check the socket's readyState before
// sending

import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });
console.log("WebSocket server is running on ws://localhost:8080");

// a typed helper for our message format
interface ServerMessage {
  type: string;
  payload: unknown;
  timestamp: string;
}

function broadcast(
  wss: WebSocketServer,
  message: ServerMessage,
  exclude?: WebSocket,
) {

  const data = JSON.stringify(message);
  wss.clients.forEach((client) => {
    // WebSocket.OPEN === 1. Skip closed/closing sockets, and optionally the
    if (client.readyState === WebSocket.OPEN && client !== exclude) {
      client.send(data);
    }
  });


}
// client !== exclude
// http://127.0.0.1:5500/src/8.0_web-sockets/index.html
// This avoids sending the message back to the sender.
let userCount=0

wss.on("connection", (ws: WebSocket) => {
  ws.on("message", (data: Buffer) => {
    const message = JSON.parse(data.toString());
    // broadcast to everyone except the sender
    broadcast(
      wss,
      {
        type: "chat",
        payload: message,
        timestamp: new Date().toString(),
      },
      ws,
    );
  });
  console.log("User count: ", ++userCount)

});
