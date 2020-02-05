import React, { Component } from 'react';
import './App.css';

const API = 'http://127.0.0.1:5000/api/' ;
const DEFAULT_QUERY = 'user/1';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        id: null,
        user: '',
        mail: '',
      },
    };
  }

  componentDidMount() {
    fetch(API + DEFAULT_QUERY, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  render() {
    return (
      <>
        <h1>Hi, Frontend</h1>
        <ul>
          <li>id: { this.state.data.id }</li>
          <li>user: { this.state.data.user }</li>
          <li>mail: { this.state.data.mail }</li>
        </ul>
        <p>1</p>
      </>
    );
  }
}

export default App;
