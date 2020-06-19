import React from 'react';
import '../index.css';

export function WelcomeScreen(props) {
    return (
        <main>
            <div className='welcome'>
                <div className='title'>
                    <h2>You're not logged in.</h2>
                </div>
                <button className='login' onClick={ props.onSignInClick }>Login</button>
                or
                <button className='sign_up' onClick={ props.onSignUpClick }>Sign Up</button>
            </div>
        </main>
    );
}
