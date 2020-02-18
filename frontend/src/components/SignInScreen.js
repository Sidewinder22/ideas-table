import React, { Component } from 'react';
import '../index.css';

export class SignInScreen extends Component {
    constructor(props) {
        super(props);

        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }

    handleSubmitClick() {
        console.log(`SingIn, handleSubmitClick`);

    }

    render() {
        return (
            <main>
                <h2>Sign In</h2>
                    <form onSubmit={ this.handleSubmitClick }>
                        <div className='login_form'>
                            <label htmlFor='username'>Username</label>
                            <input type='text' placeholder='Enter username' name='username' required />

                            <label htmlFor='password'>Password</label>
                            <input type='password' placeholder='Enter password' name='password' required />
                        </div>

                        <input type='submit' name='submit' required />
                    </form>
            </main>
        );
    }
}