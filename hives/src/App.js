import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter, Link } from "react-router-dom";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import axios from "axios";
import logo from './assets/logo.png';
import socketIOClient from "socket.io-client";

import './App.css';
import Global from './containers/Global';

import Dashboard from './containers/Dashboard';
import Chat from './containers/Chat';
import Opportunity from './containers/Opportunity';
import Signup from './containers/Signup';
import Candidates from './containers/Candidates';

export default class App extends Component {

  componentDidMount(){
    Global.socket = socketIOClient(Global.endpoint);
  }

  render() {
    return (
      <Router>
        <div>
          <PrivateRoute path="/" component={Dashboard}/>
          <PrivateRoute path="/chat" component={Chat} />
          <Route exact path="/login" component={Login}/>
          <Route path="/opportunity" component={Opportunity}/>
          <Route path="/candidates" component={Candidates} />
          <Route path="/signup" component={Signup}/>
          <Route path="/dashboard" to='/'/>
        </div>
      </Router>
    );
  }
}

export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    Global.user = null;
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

export const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
        <Button color="yellow"
          onClick={() => {
            fakeAuth.signout(() => history.push("/login"));
          }}
        >
          Sign out
        </Button>
    ) : (
      <p>You are not logged in.</p>
    )
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: "/" }
          }}
        />
      )
    }
  />
);

class Login extends React.Component {

  state = {
    redirectToReferrer: false,
    username: '',
    password: '',
    loginIncorrect: false,
    serverOffline: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/usuario/login', {
      login: this.state.username,
      senha: this.state.password,
    })
    .then((response) => {
      Global.user = response.data;
      console.log(Global.user);
      this.login();
    })
    .catch((error) => {
      // console.log(error.response.status);
      if(error.response !== undefined){
        if(error.response.status === 403){
          this.setState({ loginIncorrect: true, serverOffline: false });
        }        
      }
      else {
        this.setState({ serverOffline: true, loginIncorrect: false });
      }
    });
  };

  login = () => {
    this.setState({ loginIncorrect: false });
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  }

  render() {

    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer, username, password, loginIncorrect, serverOffline } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className='login-form'>
        {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='yellow' textAlign='center'>
              <Image src={logo} />
              {' '}Log-in to your account
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Message
                  hidden={ loginIncorrect === false }
                  negative
                  header='Error!'
                  content='Incorrect User or Password.'
                />
                <Message
                  hidden={serverOffline === false}
                  negative
                  header='Error!'
                  content='Server is not available at the moment.'
                />
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                  value={ username }
                  onChange={(e) => this.setState({ username: e.target.value })}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  value={ password }
                  onChange={(e) => this.setState({ password: e.target.value })}
                />

              <Button color='yellow' fluid size='large' onClick={this.handleSubmit}>Login</Button>
              </Segment>
            </Form>
            <Message>
              New to us?
              <div>
                <Link to="/signup">
                  <button name='signup' class="blue ui button">Sign up</button>
                </Link>
              </div>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
