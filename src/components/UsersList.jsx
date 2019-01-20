import * as React from "react";


export default class UsersList extends React.Component {

    constructor(props) {
        super(props);
    }

    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    render() {
        const orderedUsers = [...this.props.users].sort((a, b) => a.nickname > b.nickname);
        return (
            <div className="rooms-list">
                <ul>
                    <h3>Active users:</h3>
                    {orderedUsers.map(user => {
                        const active = user.nickname === this.props.recipient ? 'active' : '';
                        return (
                            <li key={user.nickname} className={"room " + active}>
                                <a
                                    onClick={() => this.props.subscribeToUser(user.nickname)}
                                    href="#">
                                    # {user.nickname}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    renderMessage(message) {

        const {sender, text, datetime} = message;

        return (
            <div className="message">
                <div className="message-username">{sender}</div>
                <div className="message-text">{text}</div>
                {/*<div className="message-datetime">{datetime}</div>*/}
            </div>
        )
    }
}