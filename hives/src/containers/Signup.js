import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter, Link } from "react-router-dom";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import axios from "axios";
import logo from '../assets/logo.png';
import socketIOClient from "socket.io-client";

import '../App.css';
import Global from './Global';

export default class Signup extends Component {
  state = {
    redirectToReferrer: false,
    name:'',
    username: '',
    password: '',
    password_confirmation:'',
    errorMessage: false,
  };

  render() {

    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer,name, username, password, password_confirmation, errorMessage } = this.state;

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
              {' '}Create your account
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Name'
                  value={ username }
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
                <Form.Input
                  fluid
                  icon='at'
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
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Confirm your password'
                  type='password'
                  value={ password }
                  onChange={(e) => this.setState({ password_confirmation: e.target.value })}
                />

              <Button color='yellow' fluid size='large' onClick={this.handleSubmit}>Create account</Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
