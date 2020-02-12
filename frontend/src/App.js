import React, { Component } from 'react';
import './index.css';
import NewWidgetButton from './components/NewWidgetButton';
import SavedNotification from './components/SavedNotification';
import { RenderWidgets } from './RenderWidgets';
import { SortList } from './components/SortList';
import { Header } from './grid_elements/Header';
import { Aside } from './grid_elements/Aside';
import { Nav } from './grid_elements/Nav';
import { Footer } from './grid_elements/Footer';

export const API = 'http://127.0.0.1:5000/api/' ;
// export const API = 'https://ideas.api.sidewinder22.pl/api/' ;
const USER_QUERY = 'users/2';
export const IDEAS_QUERY = 'ideas';

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
    this.handleSortList =
      this.handleSortList.bind(this);
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

  handleSortList(event) {
    let sortedIdeas = this.state.ideas;

    if (event.target.value === 'ID') {
      sortedIdeas.sort((a, b) => {
        let result = 0;

        if (a.id < b.id) {
          result = -1;
        }
        else if (a.id > b.id) {
          result = 1;
        }

        return result;
      });

      this.setState({ideas: sortedIdeas});
    }
    else if (event.target.value === 'Title') {
      sortedIdeas.sort((a, b) => {
        let result = 0;

        if (a.title < b.title) {
          result = -1;
        }
        else if (a.title > b.title) {
          result = 1;
        }

        return result;
      });

      this.setState({ideas: sortedIdeas});
    }
    else if (event.target.value === 'Category') {
      sortedIdeas.sort((a, b) => {
        let result = 0;

        if (a.category < b.category) {
          result = -1;
        }
        else if (a.category > b.category) {
          result = 1;
        }

        return result;
      });
    }
    else if (event.target.value === 'Date') {
      sortedIdeas.sort((a, b) => {
        let result = 0;

        a = new Date(a.timestamp);
        b = new Date(b.timestamp);
        if (a < b) {
          result = 1;
        }
        else if (a > b) {
          result = -1;
        }

        return result;
      });
    }

    this.setState({ideas: sortedIdeas});
    
  }

  render() {
    return (
      <div className='app'>

        <Header />

        <Aside 
          user = { this.state.user } 
        />

        <Nav />

        <main>
          <div className='ideas_bar'>
            <SavedNotification
              savedNotifCallback = { this.handleSavedNotifCallback }
            />

            <h1>Ideas</h1>

            <NewWidgetButton
              onChange = { this.handleNewWidgetButtonChange }
            />

            <SortList 
              onChange = { this.handleSortList } 
            /> 
          </div>

          <RenderWidgets
            ideas = { this.state.ideas }
            onCloseButtonChange = { this.handleCloseButtonChange }
            onWidgetChange = { this.handleWidgetChange }
          />
        </main>

        <Footer />
      </div>
    );
  }
}

export default App;
