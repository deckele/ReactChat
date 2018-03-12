import * as React from "react";
import { Message } from "../shared-types";

export interface MessageItemProps {
    message: Message;
}

export default function MessageItem({message}: MessageItemProps) {    
    const img = message.from.avatar ? <img className="avatar-image" src={message.from.avatar} width="200px" /> : null

    return (
        <li className="message-item">
            {img}
            <b>{message.from.name}:</b>
            {message.body}
        </li>
    );    
}