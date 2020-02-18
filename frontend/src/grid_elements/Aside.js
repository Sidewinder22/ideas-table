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
                <ul>
                    <li>user: { this.state.user.username}</li>
                    <li>id: { this.state.user.id }</li>
                    <li>email: { this.state.user.email }</li>
                </ul>
            </div>
        );
    }

    render() {
        return (
            <>
                <button onClick={ this.props.onLogoutButtonChange }>
                    Logout
                </button>
                { this.introduction() }
            </>
        );
    }
}