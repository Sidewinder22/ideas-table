import React, { Component } from 'react';
import './App.css';

const API = 'http://127.0.0.1:5000/api/' ;
const USER_QUERY = 'user/1';
const IDEA_QUERY = 'idea/1';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        id: null,
        username: '',
        email: '',
      },
      idea: {
        id: null,
        user_id: null,
        title: '',
        timestamp: null,
        category: '',
        body: '',
      }
    };
  }

  componentDidMount() {
    fetch(API + USER_QUERY, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
      .then(response => response.json())
      .then(user => this.setState({ user }));

    fetch(API + IDEA_QUERY, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    .then(response => response.json())
    .then(idea => this.setState({ idea }));
  }

  render() {
    return (
      <>
        <h1>IDeas Table</h1>
        <h2>User</h2>
        <ul>
          <li>id: { this.state.user.id }</li>
          <li>user: { this.state.user.username }</li>
          <li>email: { this.state.user.email }</li>
        </ul>

        <h2>IDea</h2>
        <ul>
          <li>id: { this.state.idea.id }</li>
          <li>user_id: { this.state.idea.user_id }</li>
          <li>title: { this.state.idea.title }</li>
          <li>timestamp: { this.state.idea.timestamp }</li>
          <li>category: { this.state.idea.category }</li>
          <li>body: { this.state.idea.body }</li>
        </ul>
      </>
    );
  }
}

export default App;
