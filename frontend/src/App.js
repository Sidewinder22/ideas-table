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
      errors: null,
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

    this.handleSignUpSubmit = 
      this.handleSignUpSubmit.bind(this);
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

  handleSingUpClick() {
    this.setState({main: 
      <SignUpScreen
        onSingUpSubmit = { this.handleSignUpSubmit }
      />
    });
  }

  handleSingInClick() {
    this.setState({main:
      <SignInScreen />
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
          console.log(`SignUp response ${response}`)

          if (responseObject.response == 'ok') {
            this.setState({
              main: <SignInScreen />,
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

  render() {
    return (
      <div className='app'>

        <Header />

        <Nav
          onSpecificCategoryClick = { this.handleSpecificCategoryClick }
          onCleanSpecificCategoryClick = { this.handleCleanSpecificCategoryClick }
        />

        <main>
          { this.state.main }
          { this.state.errors ? <div className='sign_error'>{ this.state.errors }</div> : ''}
        </main>
        
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
