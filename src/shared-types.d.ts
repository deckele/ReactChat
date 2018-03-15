export interface Message {
    from?: User;
    body: string;
    id: string;
}

export interface User {
    name: string;
    avatar?: string;
    id: string;
}