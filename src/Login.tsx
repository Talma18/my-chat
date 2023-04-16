import React, { Component } from 'react';
import { proxy } from './Proxy';
import { TextInput } from './TextInput';

type State = {
    email: string;
    password: string;
    displayName: string;
    register: boolean;
  };

export class Login extends Component<{}, State> {
    state = { email: "", password: "", displayName: "", register: false }

    textInput = React.createRef<TextInput>();

    render() {
        return (
            <div className="login">
                <img src="logo512.png" width="256" />
                {this.state.register &&
                    <TextInput type="text" placeholder="Display Name (Agent Smith)" value={this.state.displayName} onChange={ e => this.setState( { displayName: e } ) }  onEnter={ () => this.onClick() } autofocus={ false } ref={this.textInput} />}

                <TextInput type="email" placeholder="Email (someone@example.com)" value={ this.state.email } onChange={ e => this.onChangeEmail(e) } onEnter={ () => this.onClick() } autofocus={ true } />
                <TextInput type="password" placeholder="Password" value={ this.state.password } onChange={ e => this.setState( { password: e } ) } onEnter={ () => this.onClick() } autofocus={ false }/>

                <button type="button" onClick={() => this.onClick()}>
                    {this.state.register ? "Register" : "Login"}
                </button>
                <a href="https://www.google.hu/search?q=privacy">Privacy Policy</a>

                <p>{this.state.register ? "Switch back to " : "Have no account yet? Go and "}
                    <a href="" onClick={e => {
                        e.preventDefault();
                        this.setState(state => ({ register: !state.register })); // pass a function instead of object
                    }}>
                        {this.state.register ? "Login" : "Register"}
                    </a>
                </p>
            </div>);
    }


    onChangeEmail(e: string) {
        if (this.state.register && e.toLowerCase() === 'ex9sh3') {
            this.textInput.current?.setState({ value: 'Matyi :)' });
        }
        this.setState({ email: e });
    }

    onClick() {
        if (this.state.register)
            proxy.sendPacket({
                type: "register", email: this.state.email, password: this.state.password,
                displayName: this.state.displayName, staySignedIn: false
            });
        else
            proxy.sendPacket({
                type: "login", email: this.state.email, password: this.state.password,
                staySignedIn: false
            });
    }
}
