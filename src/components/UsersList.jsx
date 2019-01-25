import * as React from "react";


export default class UsersList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="side-bar">
                <div className="heading">
                <h2>Active users:</h2>
                </div>
                <div className="users">
                        {
                            this.props.users.map((user) => {
                                return (
                                    <div className="user " key={user.nickname} onClick={() => this.props.privateMessage(user.nickname)}>
                                        # {user.nickname}
                                    </div>
                                )
                            })
                        }
                </div>

                <div className="heading">
                <h2>Chats:</h2>
                </div>
                <div className="users">
                        {
                            this.props.chats.map((chat)=> {
                                if (chat.title) {
                                    const lastMessage = chat.messages[chat.messages.length - 1];
                                    const username = chat.users.find((user) => {return user !== this.props.user.nickname}) || "Public";
                                    const classNames = (this.props.active && this.props.active.id === chat.id) ? 'active' : '';
                                    return (
                                        <div key={chat.id} className={`user ${classNames}`} onClick={() => {this.props.setActive(chat)}}>
                                            <div className="user-info">
                                                <div className="name">{username}</div>
                                                {lastMessage && <div className="last-message">{lastMessage.message}</div>}
                                            </div>
                                        </div>
                                    )
                                }
                                return null;
                            })
                        }
                </div>
            </div>
        )
    }
}