import React, { Component } from 'react';
import '../index.css';

export class SignUpScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            email: '',
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
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

    handleEmailChange(event) {
        this.setState({
            email: event.target.value,
        });
    }

    handleSubmitChange(event) {
        event.preventDefault()

        this.props.onSingUpSubmit(
            this.state.username,
            this.state.password,
            this.state.email
        );
    }

    render() {
        return (
            <>
                <h2>Sign Up</h2>
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

                            <label htmlFor='email'>Email</label>
                            <input
                                type='email' 
                                placeholder='Enter email' 
                                name='email' 
                                value={ this.state.email }
                                onChange={ this.handleEmailChange }
                                required
                            />
                        </div>

                        <input type='submit' name='submit' required />
                    </form>
            </>
        );
    }
}