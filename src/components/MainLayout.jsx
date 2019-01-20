import React, { Component } from 'react';
import socketClient from "socket.io-client";
import { USER_CONNECTED, USER_DISCONNECTED } from "../Events";
import LoginForm from "./LoginForm";

const socketUrl = "http://localhost:3231"

export default class MainLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            socket: this.initConnection(),
            user: null
        }
    }

    render() {
        const { title } = this.props;
        return (
            <div className="container">
                <LoginForm socket={this.state.socket} connectUser={this.connectUser}/>
            </div>
        );
    }

    /**
     * Pripoji socket klienta
     */
    initConnection() {
        const socket = socketClient(socketUrl);
        socket.on('connect', () => {
            console.log("Connected");
        });
        console.log(socket);
        return socket;
    }

    /**
     * Pripoji uzivatele
     * @param user { nickname:string }
     */
    connectUser(user) {
        const { socket } = this.state;
        socket.emit(USER_CONNECTED, user);
        this.setState({ user: user });
    }

    /**
     * Odpoji uzivatele
     */
    disconnectUser() {
        const { socket } = this.state;
        socket.emit(USER_DISCONNECTED);
        this.setState({ user: null });
    }
}