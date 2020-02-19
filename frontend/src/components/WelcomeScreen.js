import React from 'react';
import '../index.css';

export function WelcomeScreen(props) {
    return (
        <main>
            <div className='welcome_screen'>
                <h2>You're not logged in.</h2>
                <button className='sign_button' onClick={ props.onSignUpClick }>Sign Up</button>
                <button className='sign_button' onClick={ props.onSignInClick }>Sign in</button>
            </div>
        </main>
    );
}
