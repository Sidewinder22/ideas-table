import React, { Component } from 'react';
import './index.css';
import Widget from './components/Widget';
import NewWidgetButton from './components/NewWidgetButton';

const API = 'http://127.0.0.1:5000/api/' ;
const USER_QUERY = 'users/2';
const IDEAS_QUERY = 'ideas';

function RenderWidgets(props) {
  const ideas = props.ideas;

  const result = ideas.map((idea) =>  {
      return (<Widget
        id = { idea.id }
        key = { idea.id }
        title= { idea.title }
        category = { idea.category }
        body = { idea.body }
        timestamp = { idea.timestamp }
      />
      );}
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

    this.handleChange = this.handleChange.bind(this);
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

  handleChange(event) {
    console.log('New Idea')

    fetch(API + IDEAS_QUERY, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'New Idea',
        user_id: this.state.user.id,
      })
    })
      .then(response => response.json())
      .then(idea => {
        // console.log(`idea ${idea}`)
        let newIdeas = this.state.ideas;

        let ideaObject = JSON.parse(idea)
        newIdeas.push(ideaObject)
        this.setState({ ideas: newIdeas})
        console.log(newIdeas)
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

        <NewWidgetButton
          onChange = { this.handleChange }
        />

        <RenderWidgets
          ideas = { this.state.ideas }
        />
      </div>
    );
  }
}

export default App;
