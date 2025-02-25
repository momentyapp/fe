
import { io } from "socket.io-client";


const socket = io(
  "https://solid-computing-machine-45v95qwrpqx3qx99-8081.app.github.dev",
  {
    path: "/socket",
    transports: ["websocket"],
  }
);

export default socket