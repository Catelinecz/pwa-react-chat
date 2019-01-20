import * as React from "react";
import { VERIFY_USER } from "../Events";

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nickname: "",
            error: ""
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    render() {
        return (
            <div className="login">
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="nickname">
                        <h2>Please enter your nickname: </h2>
                    </label>
                    <input type="text" ref={(input) => this.textInput = input} id="nickname" value={this.state.nickname} onChange={this.handleChange} placeholder="Enter your nickname and press ENTER"/>
                    <div className="error">{ this.state.error }</div>
                </form>
            </div>
        )
    }

    handleSubmit(e) {
        console.log("handled");
        e.preventDefault();
        this.props.socket.emit(VERIFY_USER, this.state.nickname, this.verifyUserCallback);
    }

    handleChange(e) {
        this.setState({ nickname : e.target.value })
    }

    handleError(error) {
        this.setState({error: error});
    }

    verifyUserCallback(user, nicknameExists) {
        console.log(user, nicknameExists);
        if (nicknameExists) {
            this.handleError("This nickname is already taken.")
        }
        else {
            this.props.connectUser(user);
        }
    }
}