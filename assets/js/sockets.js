import { handleNewUser, handleDisconnected } from "./notification";
import { handleNewMsg } from "./chat";

let socket = null;

export const getSocket = () => {
  return socket;
};

export const initSockets = (connectedSocket) => {
  socket = connectedSocket;

  connectedSocket.on(window.events.newUser, handleNewUser);
  connectedSocket.on(window.events.disconnected, handleDisconnected);
  connectedSocket.on(window.events.newMsg, handleNewMsg);
};
