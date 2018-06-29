import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter, Link } from "react-router-dom";
import { Button, Form, Grid, Header, Image, Message, Segment, Radio } from 'semantic-ui-react';
import axios from "axios";
import logo from '../assets/logo.png';
import socketIOClient from "socket.io-client";

import '../App.css';
import Global from './Global';
import { randomFill } from 'crypto';

export default class Signup extends Component {
  state = {
    redirectToReferrer: false,
    name:'',
    username: '',
    password: '',
    password_confirmation:'',
    type_of_user:-1,
    passwdsIncorrect: false,
    serverOffline: false,
    success: false
  };

  handleSubmit = () => {
    if(this.state.name !== '' && this.state.username !== '' && this.state.password !== '' 
      && this.state.password_confirmation !== ''){
      if(this.state.password === this.state.password_confirmation){
        axios.post('http://localhost:8081/usuario/novo', 
        {
            nome : this.state.name,
            login : this.state.username,
            senha : this.state.password,
            tipoUsuario :  this.state.type_of_user
        })
          .then((response) => {
            this.setState({ success: true, passwdsIncorrect:false, serverOffline:false})
            window.location = 'http://localhost:3000/login';
          })
          .catch((error) => {
            console.log(error);
            if(console.response === undefined){
              this.setState({ passwdsIncorrect: false, serverOffline:true });
            }
          });      
      }
      else{
        this.setState({ passwdsIncorrect:true, serverOffline:false });
      }
    }
  };

  render() {

    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer,name, username, password, password_confirmation, passwdsIncorrect, serverOffline,
    success } = this.state;

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
                <Message
                  hidden={success === false}
                  positive
                  header='Success!'
                  content='You have created an account.'
                />
                <Message
                  hidden={passwdsIncorrect === false}
                  negative
                  header='Error!'
                  content='Password confirmation and password are different.'
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
                  placeholder='Name'
                  value={ name }
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
                  value={ password_confirmation }
                  onChange={(e) => this.setState({ password_confirmation: e.target.value })}
                />
                <Form.Field>
                  Account type:
                </Form.Field>
                  <Form.Field>
                    <Radio
                      label='Normal'
                      value='1'
                      checked={this.state.type_of_user === 1}
                      onChange={(e, { value }) => this.setState({ type_of_user: parseInt(value, 10) })}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Radio
                      label='Business'
                      value='0'
                      checked={this.state.type_of_user == 0}
                      onChange={(e, { value }) => this.setState({ type_of_user: parseInt(value, 10) })}
                    />
                  </Form.Field>
              <Button color='yellow' fluid size='large' onClick={this.handleSubmit}>Create account</Button>
              </Segment>
              
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
