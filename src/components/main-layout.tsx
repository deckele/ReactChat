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
        let avatar = sessionStorage.getItem(user.name);
        if (!avatar) {
            avatar = getRandomItemFromArray(mock.avatars) as string;
            sessionStorage.setItem(user.name, avatar);
        }
        this.setState({
            loggedInUser: {
                name: user.name,
                avatar
            }
        });        
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
                    <span className="sign-in-info">Logged in as: <b>{name}</b></span>
                    {avatar && <img className="avatar-image" src={avatar} />}
                    {isLoggedIn && <span className="sign-in-info logg-out-button" onClick={this.handleLogOut}>Logg out</span>}
                </div>
                <h1 className="chat-title">Chat Away!</h1>
                <MessageBoard loggedInUser={this.state.loggedInUser} />
            </div>
        );
    }
}