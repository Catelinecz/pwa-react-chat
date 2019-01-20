import * as React from "react";

export default class MessagesList extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        if (this.props.recipient) {
            return (
                <div className="message-list">
                    <div className="join-room">
                        &larr; Join a room!
                    </div>
                </div>
            )
        }
        return (
            <div className="message-list">
                {
                    this.props.messages.map((message, index) => this.renderMessage(message))
                }
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