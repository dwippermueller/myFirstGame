import { Message, MessagePriority } from "./message";
import { MessageHandler } from "./messageHandler.js";
import { MessageSubscriptionNode } from "./messageSubscriptionNode";

export class MessageBus {

    private static _subscriptions: { [code: string]: MessageHandler[] } = {}
    private static _normalQueueMessagesPerUpdate = 10
    private static _normalMessageQueue: MessageSubscriptionNode[] = []

    private constructor() { }

    static addSubscription(code: string, handler: MessageHandler) {
        if (MessageBus._subscriptions[code] === undefined) {
            MessageBus._subscriptions[code] = []
        }

        if (MessageBus._subscriptions[code].indexOf(handler) !== -1) {
            console.warn("Attempting to add a duplicate handler to code: " + code + ". Subscription not added.")
        } else {
            MessageBus._subscriptions[code].push(handler)
        }
    }

    static removeSubscription(code: string, handler: MessageHandler) {
        if (MessageBus._subscriptions[code] === undefined) {
            console.warn("Cannot unubscribe handler from code: " + code + " because that code is not subscribed to.")
            return
        }

        const nodeIndex = MessageBus._subscriptions[code].indexOf(handler);
        if (nodeIndex !== -1) {
            MessageBus._subscriptions[code].splice(nodeIndex, 1)
        }
    }

    static post(message: Message) {
        console.log("Message posted: ", message)
        let handlers = MessageBus._subscriptions[message.code]
        if (handlers === undefined) {
            return
        }

        for (let h of handlers) {
            if (message.priority === MessagePriority.HIGH) {
                h.onMessage(message)
            } else {
                MessageBus._normalMessageQueue.push(new MessageSubscriptionNode(message, h))
            }
        }
    }

    static update(time: number) {
        const messageCount = MessageBus._normalMessageQueue.length;
        if (messageCount === 0) {
            return
        }

        const messageLimit = Math.min(MessageBus._normalQueueMessagesPerUpdate, messageCount)
        for (let i = 0; i < messageLimit; i++) {
            const node = MessageBus._normalMessageQueue.pop()
            node?.handler.onMessage(node.message)
        }
    }
}