import * as React from "react";
import { Message } from "../shared-types";
import * as classNames from "classnames";
export interface MessageItemProps {
    message: Message;
}

export const OWNER_NAME = "me";

export default function MessageItem({message}: MessageItemProps) {    
    const img = message.from.avatar ? <img className="avatar-image" src={message.from.avatar} width="200px" /> : null
    const isOwner = message.from.name === OWNER_NAME;
    const liClasses = classNames("message-item", {"owner": isOwner});
    return (
        <li className={liClasses}>
            {img}
            <span className="message-content">
                <b>{message.from.name}: </b>
                <span className="message-body">{message.body}</span>
            </span>
        </li>
    );    
}