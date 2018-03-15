import * as io from "socket.io-client";

class SocketIoService {
    private socket: SocketIOClient.Socket;
    constructor() {
        this.socket = io("/");
    }

    public on = (event: string, callback: Function) => {
        this.socket.on(event, callback);
        return this;
    }

    public emit = (event: string, ...args: any[]) => {
        this.socket.emit(event, ...args);
        return this;
    }
}

export default new SocketIoService();