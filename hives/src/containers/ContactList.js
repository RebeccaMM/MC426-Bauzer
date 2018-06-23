import _ from 'lodash';
import React from "react";
import { Menu, Icon, Label, Divider, Header, Container, Image } from 'semantic-ui-react';
import { Link } from "react-router-dom";

import ContactSearch from '../components/ContactSearch';

const itemStyle = {
  fontWeight: 'bold',
}
const selectedItemStyle = {
  fontWeight: 'bold',
}

export default class ContactList extends React.Component {
  state = {
    activeItem: undefined,
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const { contacts } = this.props;

    const contactItems = _.map(contacts,(c) => {
      return (
        <Label as='a' size='large' style={{ padding: '0.25em 0.5em', width: '100%'}} key={c.name} onClick={() => this.props.selContato(c.id)}>
          <img src={c.image} style={{ margin: '0em 0.5em' }}/>
          {c.name}
            <Label circular color='yellow' key={'qtty_'+c.name} content={10} style={{float:'right'}}/>
        </Label>
        /*return <Menu.Item
          name={c.name}
          style={activeItem === c.name ? selectedItemStyle : itemStyle }
          active={activeItem === c.name}
          onClick={this.handleItemClick}
        >
        </Menu.Item>*/
      )
    });

    return (
      <Container style={{ height:'100%', padding: '2em', backgroundColor:'#333333' }} textAlign='left'>
        <Header as='h2' style={{color:'white'}}>Inbox</Header>
        <Divider />
        <Header as='h3' style={{color:'white'}}>Contacts</Header>
        <ContactSearch contacts={contacts} fluid style={{marginBottom:'0.75em'}}/>
        <Label.Group style={{ height: '80%', overflowY: 'auto', overflowX: 'hidden' }}>
          {contactItems}
        </Label.Group>
      </Container>

    )
  }
}
