import React, { Component } from 'react';
import './index.css';
import Widget from './components/Widget';

const API = 'http://127.0.0.1:5000/api/' ;
const USER_QUERY = 'user/2';
const IDEAS_QUERY = 'ideas';

function RenderWidgets(props) {
  const ideas = props.ideas;

  const result = ideas.map((idea) => 
      <Widget
        key = { idea.id }
        title= { idea.title }
        category = { idea.category }
        body = { idea.body }
        timestamp = { idea.timestamp }
      />
  );

  return (
    <div className='widgets'>
      { result }
    </div> 
  );
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        id: null,
        username: '',
        email: '',
      },
      ideas: [],
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

    fetch(API + IDEAS_QUERY, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    .then(response => response.json())
    .then(ideas =>  {
      let ideasObject = JSON.parse(ideas)
      this.setState({ ideas: ideasObject })
    });
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

        <h1>Ideas</h1>
        <RenderWidgets
          ideas = { this.state.ideas }
        />
      </div>
    );
  }
}

export default App;
