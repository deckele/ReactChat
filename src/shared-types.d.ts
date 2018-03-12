export interface Message {
    from: User;
    body: string;
}

export interface User {
    name: string;
    avatar?: string;
}