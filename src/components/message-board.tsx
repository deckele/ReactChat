import * as React from "react";
import { Message, User } from "../shared-types";
import MessageItem from "./message-item";
import { generateUniqueId } from '../utils/random';
import socket from '../services/socket.io-service';
import { defaultUser, OWNER_NAME } from '../constants/user-constants';

export interface MessageBoardProps {
    loggedInUser: User;
}
export interface MessageBoardState {
    messages: Message[];
    hidden?: boolean;
    users: User[];
}

export default class MessageBoard extends React.Component<MessageBoardProps, MessageBoardState> {
    constructor(props: MessageBoardProps) {
        super(props);
        this.state = { messages: [], users: [] };
    }

    componentDidMount(): void {
        socket.on("clientConnected", (allUsers: User[]) => {
            this.setState({ users: allUsers });
        });
        socket.on("clientDisconnected", (allUsers: User[]) => {
            this.setState({ users: allUsers });
        });
        socket.on("message", (message: Message) => {
            const { messages } = this.state;
            this.setState({ messages: [message, ...messages] });
        });
        socket.on("userEnteredRoom", (user: User, allUsers: User[]) => {
            const { messages } = this.state;
            const notification: Message = {
                body: `${user.name} has entered the room!`,
                id: generateUniqueId("messageBoard")
            }
            this.setState({
                users: allUsers,
                messages: [notification, ...messages]
            });
        });
        socket.on("userLeftRoom", (user: User, allUsers: User[]) => {
            const { messages } = this.state;
            const notification: Message = {
                body: `${user.name} has left the room :'(...`,
                id: generateUniqueId("messageBoard")
            }
            this.setState({
                users: allUsers,
                messages: [notification, ...messages]
            });
        });
    }

    isLoggedIn(): boolean {
        const { loggedInUser } = this.props;
        return loggedInUser && loggedInUser.name !== defaultUser.name;
    }

    handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        const body = event.currentTarget.value;
        const { loggedInUser } = this.props;
        const uniqueMessageId = generateUniqueId(loggedInUser.id);
        if (event.keyCode === 13 && body) {
            const messageForBroadcast: Message = {
                body,
                from: loggedInUser,
                id: uniqueMessageId
            };
            const messageForOwner: Message = {
                body,
                from: {...loggedInUser, name: OWNER_NAME},
                id: uniqueMessageId
            };
            socket.emit("message", messageForBroadcast).emit("");
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
                    {this.isLoggedIn() && <div className="connected-users-info">you and {this.state.users.length - 1} others are chatting!</div>}
                    <input className="chat-input" type="text" placeholder="Enter a message..." onKeyUp={this.handleSubmit} />
                    <ul className="messages-list">{messages}</ul>
                </div>
            </div>
        );
    }
}