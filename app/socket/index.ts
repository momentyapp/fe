import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_HOST, {
  path: "/socket",
  transports: ["websocket"],
});

export default socket;
