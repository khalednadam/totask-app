import { io } from "socket.io-client";
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
// export const socket = io(`http://:3002/`);
// const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3002";
export const socket = io(undefined);
