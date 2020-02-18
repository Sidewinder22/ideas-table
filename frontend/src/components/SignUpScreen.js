import React, { Component } from 'react';
import '../index.css';

export class SignUpScreen extends Component {
    constructor(props) {
        super(props);

        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }

    handleSubmitClick() {
        console.log(`SingUp, handleSubmitClick`);

    }

    render() {
        return (
            <main>
                <h2>Sign Up</h2>
                    <form onSubmit={ this.handleSubmitClick }>
                        <div className='login_form'>
                            <label htmlFor='username'>Username</label>
                            <input type='text' placeholder='Enter username' name='username' required />

                            <label htmlFor='password'>Password</label>
                            <input type='password' placeholder='Enter password' name='password' required />

                            <label htmlFor='email'>Email</label>
                            <input type='email' placeholder='Enter email' name='email' required />
                        </div>

                        <input type='submit' name='submit' required />
                    </form>
            </main>
        );
    }
}