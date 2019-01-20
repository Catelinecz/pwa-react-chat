import * as React from "react";

export default class NewMessageForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            name: this.props.nick
        };

        this.handleChange = this.handleChange.bind(this)
        this.nameChangeHandler = this.nameChangeHandler.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();

            var messageNew = {
                sender: this.props.nick,
                recipient: this.props.recipient,
                text: this.state.message,
                datetime: new Date(Date.now())
            };
            this.setState({message: ''});
            this.props.sendMessage(messageNew);

        // if (!this.state.name)
        // {
        //     this.props.changeName(this.props.nick, this.state.name);
        // }
    }

    handleChange(e) {
        this.setState({ message : e.target.value })
    }

    nameChangeHandler(e) {
        this.setState({ name : e.target.value })
    }

    render() {
        return (
            <form className="send-message-form" onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} placeholder="Type your message and press ENTER" type="text" value={this.state.message}/>
                <input onChange={this.nameChangeHandler} placeholder="Type your name and press ENTER" type="text" value={this.props.nick}/>
                <button type="submit"/>
            </form>
        )
    }
}