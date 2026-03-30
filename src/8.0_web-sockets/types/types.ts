import { WebSocket } from "ws";

// extend the websocket type to carry our custom fields
export interface AuthenticatedSockets extends WebSocket {
  userId: string;
  username: string;
  isAlive: boolean;
}
