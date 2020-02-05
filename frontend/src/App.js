import React, { Component } from 'react';
import './index.css';
import Widget from './components/Widget';

const API = 'http://127.0.0.1:5000/api/' ;
const USER_QUERY = 'user/2';
const IDEA_QUERY = 'idea/2';

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
      <div className='app'>
        <h1>IDeas Table</h1>
        <div className='user'>
          <h2>User</h2>
          <p>
            user: { this.state.user.username},
            id: { this.state.user.id },
            email: { this.state.user.email }
          </p>
        </div>

        <Widget
          title = { this.state.idea.title }
          category = { this.state.idea.category }
          body = { this.state.idea.body }
          timestamp = { this.state.idea.timestamp }
        />
      </div>
    );
  }
}

export default App;
