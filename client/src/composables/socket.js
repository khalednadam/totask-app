import { io } from "socket.io-client";
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
// export const socket = io(`http://:3002/`);
export const socket = io(`https://totask.app`, {
  port: 3000,
});
