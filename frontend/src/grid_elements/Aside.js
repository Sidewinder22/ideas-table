import React, { Component } from 'react';
import '../index.css';

export class Aside extends Component {

    introduction() {
        return (
            <div className='user'>
                <h2>User</h2>
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
                { this.introduction() }
            </aside>
        );
    }
}