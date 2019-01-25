import * as React from "react";
export default class NewMessageForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            message: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.sendMessage(this.state.message);
        this.setState({message: ''});
    }

    handleChange(e) {
        this.setState({ message : e.target.value })
    }

    render() {
        return (
            <div className="message-input">
                <form className="message-form" onSubmit={this.handleSubmit}>
                    <input id="message" type="text" className="form-control" onChange={this.handleChange} placeholder="Type your message and press ENTER" value={this.state.message}/>
                    <button disabled={this.state.message.length < 1} className="send" type="submit">Send</button>
                </form>
            </div>
        )
    }
}