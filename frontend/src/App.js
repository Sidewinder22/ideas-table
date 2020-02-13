import React, { Component } from 'react';
import './index.css';
import { Header } from './grid_elements/Header';
import { Aside } from './grid_elements/Aside';
import { Nav } from './grid_elements/Nav';
import { Footer } from './grid_elements/Footer';
import { Main } from './grid_elements/Main';

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
    };

    this.handleCategoryClick = this.handleCategoryClick.bind(this);
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
  }

  handleCategoryClick(event) {
    console.log(`handleCategoryClick: ${event.target.value}`)
  }

  render() {
    return (
      <div className='app'>

        <Header />

        <Nav
          onCategoryClick = { this.handleCategoryClick }
        />
        
        <Main 
          user_id = { this.state.user.id }
        />

        <Aside 
          user = { this.state.user } 
        />

        <Footer />
      </div>
    );
  }
}

export default App;
