import React, { Component } from 'react';
import './index.css';
import { Header } from './grid_elements/Header';
import { Aside } from './grid_elements/Aside';
import { Nav } from './grid_elements/Nav';
import { Footer } from './grid_elements/Footer';
import { Main } from './grid_elements/Main';
import { SignUpScreen } from './components/SignUpScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { SignInScreen } from './components/SignInScreen';

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
      main: null,
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
    this.setState({main:
        <WelcomeScreen
        onSignUpClick = { this.handleSingUpClick }
        onSignInClick = { this.handleSingInClick }
      />
    });

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

    this.setState({main: 
      <SignUpScreen />
    });
  }

  handleSingInClick(event) {
    console.log(`handleSingInClick`)

    this.setState({main:
      <SignInScreen />
    });
  }

  render() {
    return (
      <div className='app'>

        <Header />

        <Nav
          onSpecificCategoryClick = { this.handleSpecificCategoryClick }
          onCleanSpecificCategoryClick = { this.handleCleanSpecificCategoryClick }
        />

        { this.state.main }
        
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
