import _ from 'lodash';
import React from "react";
import faker from 'faker';
import axios from "axios";
import { Container, Header, Grid } from 'semantic-ui-react';

import '../Pages.css';

import ContactList from '../containers/ContactList';
import ChatWindow from '../containers/ChatWindow';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contacts : [{}] };
  }

  componentDidMount(){
    axios.get('http://localhost:8081/usuarios')
    .then((response) => {
      response.data.forEach(function(u){
        u.name = u.nome;
        u.image = faker.internet.avatar();
      });
      this.setState({contacts: response.data});
    });
  }

  render() {
    return (
      <Container fluid style={{ margin: '1em', backgroundColor: '#dddddd' }}>
        <Grid style={{ height: '100vh' }}>
          <Grid.Column width={3} style={{ height: '100%' }}>
            <ContactList contacts={this.state.contacts}/>
          </Grid.Column>
          <Grid.Column width={13} style={{ paddingLeft: '1%', paddingRight: '2.5%' }}>
            <ChatWindow />
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}
