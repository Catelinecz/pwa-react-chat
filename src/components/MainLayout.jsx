import React, { Component } from 'react';
import io from "socket.io-client";
import { USER_CONNECTED, USER_DISCONNECTED } from "../Events";
import LoginForm from "./LoginForm";
import ChatLayout from "./ChatLayout";

//const socketUrl = window.location.hostname;

export default class MainLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            socket: this.initConnection(),
            user: null
        }

        this.connectUser = this.connectUser.bind(this);
        this.disconnectUser = this.disconnectUser.bind(this);
    }

    render() {
        const { title } = this.props;
        return (
            <div className="container">
                {
                    !this.state.user ?
                        <LoginForm socket={this.state.socket} connectUser={this.connectUser}/>
                        :
                        <ChatLayout socket={this.state.socket} user={this.state.user}/>
                }
            </div>
        );
    }

    /**
     * Pripoji socket klienta
     */
    initConnection() {
        const socket = io();
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