import * as React from "react";

export default class MessagesList extends React.Component {

    constructor(props){
        super(props);

        this.messageReceived = this.messageReceived.bind(this);
    }

    messageReceived() {
        this.refs.container.scrollTop = this.refs.container.scrollHeight;
    }

    componentDidMount() {
        this.messageReceived();
    }

    componentDidUpdate() {
        this.messageReceived();
    }

    render() {
        return (
            <div className="thread-container" ref='container'>

                    <div className="thread">
                        {
                            this.props.messages.map((message, index) => this.renderMessage(message))
                        }
                    </div>


            </div>
        )
    }

    renderMessage(message) {

        const {sender, text, datetime} = message;

        return (
                    <div key={message.id}
                         className={'message-container ' + (message.sender === this.props.user.nickname && 'right')}>
                        <div className="data">
                            <div className="message">{message.message}</div>
                            <div className="time">{message.sender}</div>
                            <div className="time">{datetime}</div>
                        </div>

                    </div>
        )
    }
}