import * as React from "react";
import MessageBoard from "./message-board";
import SignIn from "./sign-in";
import { User } from "../shared-types";
import mock from "../mock-data";
import { getRandomItemFromArray } from '../utils/random';

export interface MainLayoutProps {
}
export interface MainLayoutState {
    loggedInUser: User;
}

const defaultUser: User = {
    name: "guest",
}

export default class MainLayout extends React.Component<MainLayoutProps, MainLayoutState> {
    constructor(props: MainLayoutProps) {
        super(props);
        this.state = { loggedInUser: defaultUser};
    }

    handleSignIn = (user: User): void => {
        if (!user.avatar) {
            const url = getRandomItemFromArray(mock.avatars);
            this.setState({loggedInUser: {
                name: user.name,
                avatar: url
            }});
        }
    }

    handleLogOut = (): void => {
        this.setState({loggedInUser: defaultUser});
    }
    
    render() {
        const {name, avatar} = this.state.loggedInUser;
        const isLoggedIn = name !== "guest";
        return (
            <div className="app-wrapper">
                <SignIn onSignIn={this.handleSignIn} modalOptions={{isOpen: !isLoggedIn}}/>
                <div className="sign-in-info-wrapper">
                    <span>logged in as: <b>{name}</b></span>
                    {avatar && <img className="avatar-image" src={avatar} />}
                    {isLoggedIn && <button className="logg-out-button" onClick={this.handleLogOut}>logg out</button>}
                </div>
                <h1 className="chat-title">Chat Away!</h1>
                <MessageBoard loggedInUser={this.state.loggedInUser} />
            </div>
        );
    }
}