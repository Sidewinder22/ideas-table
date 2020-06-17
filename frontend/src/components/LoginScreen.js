import React, { Component } from 'react';
import '../index.css';

export class LoginScreen extends Component {
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
        event.preventDefault()

        this.props.onSignInSubmit(
            this.state.username,
            this.state.password
        );
    }

    render() {
        return (
            <div className='login'>
                <div className='title'>
                    <h2>Login</h2>
                </div>
                <form onSubmit={ this.handleSubmitChange }>
                    <div className='form'>
                        <div className='row'>
                            <label className='label' htmlFor='username'>Username:</label>
                            <input
                                className='input'
                                type='text'
                                placeholder='Enter username'
                                name='username'
                                value={ this.state.username }
                                onChange={ this.handleUsernameChange }
                                required
                            />
                        </div>

                        <div className='row'>
                            <label className='label' htmlFor='password'>Password:</label>
                            <input
                                className='input'
                                type='password'
                                placeholder='Enter password'
                                name='password'
                                value={ this.state.password }
                                onChange={ this.handlePasswordChange }
                                required
                            />
                        </div>

                        <input className='submit' type='submit' name='submit' required />
                    </div>
                </form>
            </div>
        );
    }
}
