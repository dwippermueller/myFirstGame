import { Message } from "./message.js";
import { MessageHandler } from "./messageHandler";

export class MessageSubscriptionNode {

    message: Message
    handler: MessageHandler

    constructor(message: Message, handler: MessageHandler) {
        this.message = message
        this.handler = handler
    }
}