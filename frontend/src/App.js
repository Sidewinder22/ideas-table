import React, { Component } from 'react';
import './index.css';
import { Header } from './grid_elements/Header';
import { Aside } from './grid_elements/Aside';
import { Nav } from './grid_elements/Nav';
import { Footer } from './grid_elements/Footer';
import { Main } from './grid_elements/Main';
import { LoginScreen } from './components/LoginScreen';
import { WelcomeScreen } from './components/WelcomeScreen';

export const API = 'http://127.0.0.1:5000/api/' ;
// export const API = 'https://ideas.api.sidewinder22.pl/api/' ;
const USER_QUERY = 'users/1';
const USERS_QUERY = 'users';
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

    this.mainElement = React.createRef();

    this.handleSpecificCategoryClick =
      this.handleSpecificCategoryClick.bind(this);
    this.handleCleanSpecificCategoryClick =
      this.handleCleanSpecificCategoryClick.bind(this);
    this.handleSingUpClick = 
      this.handleSingUpClick.bind(this);
    this.handleSingInClick = 
      this.handleSingInClick.bind(this);
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

  handleSpecificCategoryClick(event) {
    this.mainElement.current.displaySpecificCategory(event.target.value);
  }
  
  handleCleanSpecificCategoryClick() {
    console.log('22')
    this.mainElement.current.cleanSpecificCategory();
  }

  handleSingUpClick(event) {
    console.log(`handleSingUpClick: ${event}`)

  }

  handleSingInClick(event) {
    console.log(`handleSingInClick`)
  }

  render() {
    return (
      <div className='app'>

        <Header />

        <Nav
          onSpecificCategoryClick = { this.handleSpecificCategoryClick }
          onCleanSpecificCategoryClick = { this.handleCleanSpecificCategoryClick }
        />

        <WelcomeScreen
          onSignUpClick = { this.handleSingUpClick }
          onSignInClick = { this.handleSingInClick }
        />

        {/* <LoginScreen
          onSignUpClick = { this.handleSingUpClick }
          onSignInClick = { this.handleSingInClick }
        /> */}
        
        {/* <Main 
          ref = { this.mainElement }
          user_id = { this.state.user.id }
        /> */}

        <Aside 
          user = { this.state.user } 
        />

        <Footer />
      </div>
    );
  }
}

export default App;
