import * as React from "react";
import { VERIFY_USER } from "../Events";

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nickname: "",
            error: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.verifyUserCallback = this.verifyUserCallback.bind(this);
    }

    render() {
        return (
            <div className="login">
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="nickname">
                        <h1>Please enter your nickname: </h1>
                    </label>
                    <input type="text" ref={(input) => this.textInput = input} id="nickname" value={this.state.nickname} onChange={this.handleChange} placeholder="Enter your nickname and press ENTER"/>
                    <div className="error">{ this.state.error }</div>
                </form>
            </div>
        )
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.nickname) {
            this.props.socket.emit(VERIFY_USER, this.state.nickname, this.verifyUserCallback);
        }
        else {
            this.handleError("Nickname must not be empty.");
        }
    }

    handleChange(e) {
        this.setState({ nickname : e.target.value })
    }

    handleError(error) {
        this.setState({error: error});
    }

    verifyUserCallback(user, nicknameExists) {
        if (nicknameExists) {
            this.handleError("This nickname is already taken.");
        }
        else {
            this.handleError(null);
            this.props.connectUser(user);
        }
    }
}