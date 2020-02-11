import React, { Component } from 'react';
import './index.css';
import NewWidgetButton from './components/NewWidgetButton';
import SavedNotification from './components/SavedNotification';
import { RenderWidgets } from './RenderWidgets';

// const API = 'http://127.0.0.1:5000/api/' ;
const API = 'https://ideas.api.sidewinder22.pl/api/' ;
const USER_QUERY = 'users/2';
const IDEAS_QUERY = 'ideas';

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
      savedNotifCallback: null,
    };

    this.handleNewWidgetButtonChange = 
      this.handleNewWidgetButtonChange.bind(this);
    this.handleCloseButtonChange = 
      this.handleCloseButtonChange.bind(this);
    this.handleWidgetChange = 
      this.handleWidgetChange.bind(this);
    this.handleSavedNotifCallback = 
      this.handleSavedNotifCallback.bind(this);
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

  handleNewWidgetButtonChange(event) {
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
        let newIdeas = this.state.ideas;
        let ideaObject = JSON.parse(idea)

        newIdeas.push(ideaObject)
        this.setState({ ideas: newIdeas})
      });
  }

  handleCloseButtonChange(id) {
    console.log(`Delete idea Id: ${id}`)

    fetch(API + IDEAS_QUERY + '/' + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: ''
    })
      .then(response => response.json())
      .then((idea) => {
        let ideaObject = JSON.parse(idea)
        let array = this.state.ideas;
        
        let index = array.findIndex((element) => {
          return element.id === Number(ideaObject.id);
        });

        array.splice(index, 1);

        this.setState({
          ideas: array,
        })
      })
  }

  handleWidgetChange() {
    if (this.state.savedNotifCallback != null) {
      this.state.savedNotifCallback();
    }
  }

  handleSavedNotifCallback(callback) {
    this.setState({savedNotifCallback: callback});
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

        <div className='ideas_bar'>
          <SavedNotification
            savedNotifCallback = { this.handleSavedNotifCallback }
          />

          <h1>Ideas</h1>

          <NewWidgetButton
            onChange = { this.handleNewWidgetButtonChange }
          />
        </div>

        <RenderWidgets
          ideas = { this.state.ideas }
          onCloseButtonChange = { this.handleCloseButtonChange }
          onWidgetChange = { this.handleWidgetChange }
        />
      </div>
    );
  }
}

export default App;
