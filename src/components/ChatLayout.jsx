import * as React from "react";
import Event from "../Events";
import UsersList from "./UsersList";
import MessagesList from "./MessagesList";
import NewMessageForm from "./NewMessageForm";
import { createMessage } from "../Factories";

export default class ChatLayout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            chats: [],
            active: null
        };

        this.setActive = this.setActive.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.addChat = this.addChat.bind(this);
        this.usersChanged = this.usersChanged.bind(this);
        this.sendPrivateMessage = this.sendPrivateMessage.bind(this);

        this.props.socket.on(Event.USER_CONNECTED, this.usersChanged);
        this.props.socket.on(Event.USER_DISCONNECTED, this.usersChanged);
    }

    usersChanged(users) {
        this.setState({users: users.filter(user => user.nickname != this.props.user.nickname)});
    }

    componentDidMount() {
        this.props.socket.emit(Event.PUBLIC_CHAT, this.addChat);
        this.props.socket.on(Event.PRIVATE_MESSAGE, this.addChat);
    }

    sendPrivateMessage(nickname) {
        const toCompare = [nickname, this.props.user.nickname];
        console.log(this.state.chats);
        const toOpen = this.state.chats.find(ch => ch.users.every(x => toCompare.includes(x)));
        console.log(toOpen);
        if (!!toOpen) {
            this.props.socket.emit(Event.PRIVATE_MESSAGE, this.props.user.nickname, nickname);
        }
        else {
            this.setActive(toOpen);
        }
    }


    render() {
        return (
            <div className="container">

                <UsersList privateMessage={this.sendPrivateMessage} users={this.state.users} socket={this.props.socket} chats={this.state.chats} user={this.props.user} active={this.state.active} setActive={this.setActive}/>
                <div className="chat-room-container">
                {
                    this.state.active !== null ? (
                        <div className="chat-room">
                            <MessagesList name={this.state.active.title} messages={this.state.active.messages} user={this.props.user}/>
                            <NewMessageForm sendMessage={this.sendMessage}/>
                        </div>
                    ) :
                        <div className="chat-room choose">
                            <h3>Pick a chat room.</h3>
                        </div>
                }
                </div>
            </div>
        )
    }

    setActive(active) {
        this.setState({active: active});
    }

    sendMessage(message) {
        let chatId = this.state.active.id;
        let messageItem = createMessage(message, this.props.user.nickname);
        this.props.socket.emit(Event.MESSAGE_SENT, messageItem, chatId);
    }

    addChat(chat) {
        const newChats = [...this.state.chats, chat];
        this.setState({chats: newChats, active: chat});
        let eventName = Event.MESSAGE_RECEIVED+"-"+chat.id;
        this.props.socket.on(eventName, (message) => this.messageReceived(message, chat.id));
    }

    messageReceived(message, chatId) {
        let newChats = this.state.chats.map((chat) => {
            if (chat.id === chatId) {
                chat.messages.push(message);
            }
            return chat;
        });

        this.setState({chats: newChats});
    }
}