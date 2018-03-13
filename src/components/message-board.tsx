import * as React from "react";
import * as io from "socket.io-client";
import { Message, User } from "../shared-types";
import MessageItem, { OWNER_NAME } from "./message-item";

export interface MessageBoardProps {
    loggedInUser: User;
}
export interface MessageBoardState {
    messages: Message[];
}

export default class MessageBoard extends React.Component<MessageBoardProps, MessageBoardState> {
    private socket: SocketIOClient.Socket;
    constructor(props: MessageBoardProps) {
        super(props);
        this.state = { messages: [] };
    }

    componentDidMount(): void {
        this.socket = io("/", {timeout: 1000});
        this.socket.on("message", (message: Message) => {
            this.setState({ messages: [message, ...this.state.messages] });
        });
    }

    handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        const body = event.currentTarget.value;
        const { name, avatar } = this.props.loggedInUser;
        const currentDate = new Date().getTime();
        const uniqueMessageId = `${name}:${currentDate}`
        if (event.keyCode === 13 && body) {
            const messageForOwner: Message = {
                body,
                from: { name: OWNER_NAME, avatar: avatar },
                id: uniqueMessageId
            };
            const messageForBroadcast: Message = {
                body,
                from: { name: name, avatar: avatar },
                id: uniqueMessageId
            };
            this.socket.emit("message", messageForBroadcast).emit("");
            this.setState({ messages: [messageForOwner, ...this.state.messages] });
            event.currentTarget.value = "";
        }
    }

    render() {
        const messages = this.state.messages.map(message => <MessageItem key={message.id} message={message} />);
        return (
            <div className="chat-area">
                <input className="chat-input" type="text" placeholder="Enter a message..." onKeyUp={this.handleSubmit} />
                <ul className="messages-list">{messages}</ul>
            </div>
        );
    }
}