import React, { Component } from 'react';
import '../index.css';

export class SignInScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmitChange = this.handleSubmitChange.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({
            username: event.target.value,
        });
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value,
        });
    }
    handleSubmitChange(event) {
        console.log(`SingIn, handleSubmitClick`);
        event.preventDefault()

        this.props.onSignInSubmit(
            this.state.username,
            this.state.password
        );
    }

    render() {
        return (
            <>
                <h2>Sign In</h2>
                    <form onSubmit={ this.handleSubmitChange }>
                        <div className='login_form'>
                            <label htmlFor='username'>Username</label>
                            <input 
                                type='text'
                                placeholder='Enter username'
                                name='username'
                                value={ this.state.username }
                                onChange={ this.handleUsernameChange }
                                required
                            />

                            <label htmlFor='password'>Password</label>
                            <input
                                type='password' 
                                placeholder='Enter password' 
                                name='password' 
                                value={ this.state.password }
                                onChange={ this.handlePasswordChange }
                                required
                            />
                        </div>

                        <input type='submit' name='submit' required />
                    </form>
            </>
        );
    }
}