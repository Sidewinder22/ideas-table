import React, { Component } from 'react';
import '../index.css';

export class Aside extends Component {

    introduction() {
        return (
            <div className='user'>
                <ul>
                    <li>user: { this.props.user.username}</li>
                    <li>id: { this.props.user.id }</li>
                    <li>email: { this.props.user.email }</li>
                </ul>
            </div>
        );
    }

    render() {
        return (
            <aside>
                <h2>User</h2>
                <button onClick={ this.props.onLogoutButtonChange }>
                    Logout
                </button>
                { this.introduction() }
            </aside>
        );
    }
}