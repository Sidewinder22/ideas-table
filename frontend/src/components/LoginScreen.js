import React, { Component } from 'react';
import '../index.css';

export class LoginScreen extends Component {
    render() {
        return (
            <main>
                <h2>You're not logged in.</h2>
                    {/* <button className='sign_button' onClick={ this.props.onSingUpClick }>Sign Up</button> */}
                    {/* <button className='sign_button' onClick={ this.handleSingInClick }>Sign in</button> */}
                    <form onSubmit={ this.props.onSignUpSubmit }>
                        <div className='login_form'>
                            <label htmlFor='username'>Username</label>
                            <input type='text' placeholder='Enter username' name='username' required />

                            <label htmlFor='password'>Password</label>
                            <input type='password' placeholder='Enter password' name='password' required />

                            <label htmlFor='email'>Email</label>
                            <input type='email' placeholder='Enter email' name='email' required />
                        </div>

                        {/* <label for='submit'>Submit</label> */}
                        <input type='submit' name='submit' required />
                    </form>
            </main>
        );
    }
}