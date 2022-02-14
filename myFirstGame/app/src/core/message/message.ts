import { MessageBus } from "./messageBus.js"
import { MessageHandler } from "./messageHandler.js"

export enum MessagePriority {
    NORMAL, HIGH
}

export class Message {

    readonly code: string
    readonly context: any
    readonly sender: any
    readonly priority: MessagePriority

    constructor(code: string, sender: any, context?: any, priority: MessagePriority = MessagePriority.NORMAL) {
        this.code = code
        this.sender = sender
        this.context = context
        this.priority = priority
    }

    static send(code: string, sender: any, context?: any) {
        MessageBus.post(new Message(code, sender, context, MessagePriority.NORMAL))
    }

    static sendPriority(code: string, sender: any, context?: any) {
        MessageBus.post(new Message(code, sender, context, MessagePriority.HIGH))
    }
    
    static subscribe(code: string, handler: MessageHandler) {
        MessageBus.addSubscription(code, handler)
    }

    static unsubscribe(code: string, handler: MessageHandler) {
        MessageBus.removeSubscription(code, handler)
    }

}