import * as React from "react";
import MessageBoard from "./message-board";
import SignIn from "./sign-in";
import { User } from "../shared-types";
import mock from "../mock-data";
import { getRandomItemFromArray } from '../utils/random';
import socket from '../services/socket.io-service';
import { defaultUser } from '../constants/user-constants';

export interface MainLayoutProps {
}
export interface MainLayoutState {
    loggedInUser: User;
}

export default class MainLayout extends React.Component<MainLayoutProps, MainLayoutState> {
    constructor(props: MainLayoutProps) {
        super(props);
        this.state = { loggedInUser: defaultUser };
    }

    componentDidMount() {
        const { loggedInUser } = this.state;
        socket.on("userConnected", (id: string) => {
            this.setState({loggedInUser: {...loggedInUser, id }});
        });
    }

    handleSignIn = (user: User): void => {
        const id = this.state.loggedInUser.id;
        let avatar = sessionStorage.getItem(user.name);
        if (!avatar) {
            avatar = getRandomItemFromArray(mock.avatars) as string;
            sessionStorage.setItem(user.name, avatar);
        }
        const loggedInUser = {
            name: user.name,
            avatar,
            id
        };
        this.setState({
            loggedInUser
        });
        socket.emit("userSignedIn", loggedInUser).emit("");
    }

    handleLogOut = (): void => {
        const { loggedInUser } = this.state;
        this.setState({loggedInUser: {...loggedInUser, name: defaultUser.name}});
        socket.emit("userLoggedOut", loggedInUser).emit("");
    }
    
    render() {
        const {name, avatar} = this.state.loggedInUser;
        const isLoggedIn = name !== defaultUser.name;
        return (
            <div className="app-wrapper">
                <SignIn onSignIn={this.handleSignIn} modalOptions={{isOpen: !isLoggedIn}}/>
                <div className="sign-in-info-wrapper">
                    <span className="sign-in-info">Logged in as: <b>{name}</b></span>
                    {avatar && <img className="avatar-image" src={avatar} />}
                    {isLoggedIn && <span className="sign-in-info log-out-button" onClick={this.handleLogOut}>Log out</span>}
                </div>
                <h1 className="chat-title">Chat Away!</h1>
                <MessageBoard loggedInUser={this.state.loggedInUser} />
            </div>
        );
    }
}