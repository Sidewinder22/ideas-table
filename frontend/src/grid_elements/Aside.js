import React, { Component } from 'react';
import '../index.css';

import { API } from '../App';
const QUERY = 'user?username='

export class Aside extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
              id: null,
              username: '',
              email: '',
            }
        }
    }

    componentDidMount() {
        const access_token = localStorage.getItem('access_token');

        fetch(API + QUERY + this.props.username, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `JWT ${access_token}`,
          }
        })
          .then(response => response.json())
          .then(user => this.setState({ user }));
    }

    introduction() {
        return (
            <div className='user'>
                <div className='element'>
                    { this.state.user.username} [{ this.state.user.id }]
                </div>
                <div className='element'>
                    { this.state.user.email }
                </div>
            </div>
        );
    }

    render() {
        return (
            <>
                <div className='title'>
                    <h2>User</h2>
                </div>

                <button className='logout' onClick={ this.props.onLogoutButtonChange }>
                    Logout
                </button>
                { this.introduction() }
            </>
        );
    }
}
