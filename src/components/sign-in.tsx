import * as React from "react";
import * as ReactModal from "react-modal";
import { User } from "../shared-types";
import { defaultUser, forbiddenNames } from '../constants/user-constants';

export interface ModalOptions {
    isOpen: boolean;
    onAfterOpen?: () => void;
    onRequestClose?: () => void;
    closeTimeoutMS?: number;
    style?: ModalStyle;
    contentLabel?: string;
    shouldCloseOnOverlayClick?: boolean;
    className?: string;
    portalClassName?: string;
    overlayClassName?: string;
    bodyOpenClassName?: string;
    ariaHideApp?: boolean;
    role?: string;
}
export interface ModalStyle {
    overlay: any;
    content: any;
}

export interface SignInProps {
    modalOptions: ModalOptions;
    onSignIn?: (user: User) => void;
}
export interface SignInState extends Partial<User> {
}

const defaultOptions: ModalOptions = {
    isOpen: false,
    ariaHideApp: false,
    style: {
        overlay: { backgroundColor: "rgba(140,140,160,0.5)", display: "flex" },
        content: { 
            position: "relative", 
            margin: "auto",
            top: "initial",
            bottom: "initial",
            left: "initial",
            rigth: "initial",
        }
    }
};

export default class SignIn extends React.Component<SignInProps, SignInState> {
    constructor(props: SignInProps) {
        super(props);
        this.state = {};
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleUserSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();        
        const { name, avatar } = this.state;
        if (!name) {
            alert("Name is required to chat!");
            return;            
        }
        const isForbiddenName = forbiddenNames.indexOf(name) !== -1;
        if (isForbiddenName) {
            alert(`${name} is not a valid name.`);
            return;
        }
        const user = {name, avatar, id: defaultUser.id};
        this.props.onSignIn && this.props.onSignIn(user);
    }

    render() {
        const { modalOptions } = this.props;
        return (
            <ReactModal {...{...defaultOptions, ...modalOptions}}>
                <form className="sign-in-form" onSubmit={this.handleUserSubmit}>
                    <input className="sign-in-input"
                        placeholder="username..."
                        name="name"
                        type="text"
                        onChange={this.handleInputChange} />
                    <input className="sign-in-submit" type="submit" value="Sign In" />
                </form>
            </ReactModal>
        );
    }
}