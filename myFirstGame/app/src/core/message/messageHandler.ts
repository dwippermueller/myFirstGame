import { Message } from "./message.js";

export interface MessageHandler {

    onMessage(message: Message): void
}