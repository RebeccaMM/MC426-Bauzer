import _ from 'lodash';
import React from "react";
import faker from 'faker'
import { Container, Header, Grid } from 'semantic-ui-react';

import '../Pages.css';

import ContactList from '../containers/ContactList';

export default class Chat extends React.Component {
  render() {
    return (
      <Container fluid style={{ margin: '1em', backgroundColor: '#dddddd' }}>
        <Grid>
          <Grid.Column width={3}>
            <ContactList contacts={contacts}/>
          </Grid.Column>
          <Grid.Column width={13} >
              <Header as='h1'>Chat</Header>
          </Grid.Column>
        </Grid>


      </Container>
    )
  }
}

const contacts = _.times(5, () => {
  let name = faker.name.firstName();
  return (
    {
      name: name,
      title: name,
      image: faker.internet.avatar(),
    }
  );
});
