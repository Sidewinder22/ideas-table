import React, { Component } from 'react';
import './index.css';
import { Header } from './grid_elements/Header';
import { Aside } from './grid_elements/Aside';
import { Nav } from './grid_elements/Nav';
import { Footer } from './grid_elements/Footer';
import { Main } from './grid_elements/Main';
import { SignUpScreen } from './components/SignUpScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoginScreen } from './components/LoginScreen';

const BACKEND = 'http://127.0.0.1:5000/';
// const BACKEND = 'https://ideas.api.sidewinder22.pl/';
export const API = BACKEND + 'api/';
export const USERS_QUERY = 'users';
const AUTH_QUERY = 'auth';
export const IDEAS_QUERY = 'ideas';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      main: null,
      nav: null,
      aside: null,
      errors: null,
    };

    this.mainElement = React.createRef();

    this.handleSpecificCategoryClick =
      this.handleSpecificCategoryClick.bind(this);
    this.handleCleanSpecificCategoryClick =
      this.handleCleanSpecificCategoryClick.bind(this);
    this.handleLogoutChange = 
      this.handleLogoutChange.bind(this);

    this.handleSingUpClick = 
      this.handleSingUpClick.bind(this);
    this.handleSingInClick = 
      this.handleSingInClick.bind(this);

    this.handleSignUpSubmit = 
      this.handleSignUpSubmit.bind(this);
    this.handleSignInSubmit = 
      this.handleSignInSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({main:
        <WelcomeScreen
        onSignUpClick = { this.handleSingUpClick }
        onSignInClick = { this.handleSingInClick }
      />
    });
  }

  handleSpecificCategoryClick(event) {
    this.mainElement.current.displaySpecificCategory(event.target.value);
  }
  
  handleCleanSpecificCategoryClick() {
    this.mainElement.current.cleanSpecificCategory();
  }

  handleLogoutChange(event){
    this.setState({
      main: <LoginScreen
        onSignInSubmit = { this.handleSignInSubmit }
      />,
      nav: null,
      aside: null,
      errors: null,
    })
  }

  handleSingUpClick() {
    this.setState({main: 
      <SignUpScreen
        onSingUpSubmit = { this.handleSignUpSubmit }
      />
    });
  }

  handleSingInClick() {
    this.setState({main:
      <LoginScreen
        onSignInSubmit = { this.handleSignInSubmit }
      />
    });
  }

  handleSignUpSubmit(username, password, email) {
    fetch(API + USERS_QUERY,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email
      })})
      .then(response => response.json())
      .then(response => {
          let responseObject = JSON.parse(response)

          if (responseObject.response === 'ok') {
            this.setState({
              main: <LoginScreen
                onSignInSubmit = { this.handleSignInSubmit }
              />,
              errors: null,
            });
          }
          else {
            this.setState({
              errors: responseObject.response
            });
          }
      })
  }

  handleSignInSubmit(username, password) {
    fetch(BACKEND + AUTH_QUERY,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })})
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(response => {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('username', username);

          this.setState({
            main: <Main 
              ref = { this.mainElement }
            />,
            nav: <Nav
              onSpecificCategoryClick = { this.handleSpecificCategoryClick }
              onCleanSpecificCategoryClick = { this.handleCleanSpecificCategoryClick }
            />,
            aside: <Aside 
              onLogoutButtonChange = { this.handleLogoutChange }
              username = { username }
            />,
            errors: null,
          });

          setTimeout(
            () => {
              this.handleLogoutChange();
            },
            5 * 60 * 1000
          );
      })
      .catch(error => {
          this.setState({
            errors: 'Wrong username or password'
          });
        });
  }

  render() {
    return (
      <div className='app'>

        <Header />

        <nav>
          { this.state.nav }
        </nav>

        <main>
          { this.state.main }
          { this.state.errors ? <div className='login_error'>{ this.state.errors }</div> : ''}
        </main>
        
        <aside>
          { this.state.aside }
        </aside>

        <Footer />
      </div>
    );
  }
}

export default App;
