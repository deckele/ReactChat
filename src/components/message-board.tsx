import * as React from "react";
import * as io from "socket.io-client";
import { Message, User } from "../shared-types";
import MessageItem from "./message-item";

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
        this.socket = io("/");
        this.socket.on("message", (message: Message) => {
            this.setState({ messages: [message, ...this.state.messages] });
        });
    }

    handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        const body = event.currentTarget.value;
        if (event.keyCode === 13 && body) {
            const message: Message = {
                body,
                from: { name: "me", avatar: this.props.loggedInUser.avatar }
            };
            this.setState({ messages: [message, ...this.state.messages] });
            this.socket.emit("message", message);
            event.currentTarget.value = "";
        }
    }

    render() {
        const messages = this.state.messages.map((message, index) => <MessageItem key={index} message={message} />);
        return (
            <div>
                <input className="chat-input" type="text" placeholder="Enter a message..." onKeyUp={this.handleSubmit} />
                {messages}
            </div>
        );
    }
}