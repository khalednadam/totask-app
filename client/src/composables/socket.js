import { io } from "socket.io-client";
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
export const socket = io(`http://localhost:3002`);
// export const socket = io(`https://api.totask.app:3002`);
