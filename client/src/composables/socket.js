import { io } from "socket.io-client";
// export const socket = io(undefined);
export const socket = io("http://localhost:3002")
