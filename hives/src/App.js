import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter } from "react-router-dom";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import logo from './assets/logo.png';

import './App.css';

import Dashboard from './containers/Dashboard';
import Chat from './containers/Chat';
import Opportunity from './containers/Opportunity';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <PrivateRoute path="/" component={Dashboard}/>
          <PrivateRoute path="/chat" component={Chat} />
          <Route exact path="/login" component={Login}/>
          <Route path="/opportunity" component={Opportunity}/>
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
    redirectToReferrer: false
  };

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {

    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

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
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                />

                <Button color='yellow' fluid size='large' onClick={this.login}>Login</Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a href='http://www.google.com'>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
