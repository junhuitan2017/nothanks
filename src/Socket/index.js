import { io } from "socket.io-client";

const socket = process.env.NODE_ENV === "production" ? io() : io("http://localhost:8080");

// Event names
export const GAME_EVENT = "GAME EVENT";
export const SPECIAL_EVENT = "SPECIAL EVENT";
export const DISCONNECT_EVENT = "DISCONNECT EVENT";

export default socket;