import * as React from "react";
import * as io from "socket.io-client";
import { Message, User } from "../shared-types";
import MessageItem, { OWNER_NAME } from "./message-item";

export interface MessageBoardProps {
    loggedInUser: User;
}
export interface MessageBoardState {
    messages: Message[];
    hidden?: boolean;
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

    handleChatToggled = () => {
        this.setState({hidden: !this.state.hidden});
    }

    render() {
        const messages = this.state.messages.map(message => <MessageItem key={message.id} message={message} />);
        const hidden = !!this.state.hidden;
        return (
            <div className="chat-area" hidden={hidden}>
                <div className="toggle-icon" onClick={this.handleChatToggled}>
                    <svg>
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                    </svg>
                </div>
                <div className="chat-wrapper">
                    <input className="chat-input" type="text" placeholder="Enter a message..." onKeyUp={this.handleSubmit} />
                    <ul className="messages-list">{messages}</ul>
                </div>
            </div>
        );
    }
}