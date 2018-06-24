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
    this.state = {
      contacts : [],
      grupoSelecionado: undefined
    };
  }

  componentDidMount(){
    this.buscaGrupos();
  }

  buscaGrupos = () => {
    return axios.post('http://localhost:8081/grupos', { idUsuario: 1 })
    .then((response) => {
      var grupos = response.data;

      for(var g in grupos){
        grupos[g].name = grupos[g].nome;
        grupos[g].image = faker.internet.avatar();
      }

      var gSel = this.state.grupoSelecionado;
      if(gSel !== undefined)
        gSel = grupos[gSel.id];

      this.setState({
        contacts: grupos,
        grupoSelecionado: gSel
      });
    });
  }

  updateChat = () => {
    return this.buscaGrupos();
  }

  selContato = (grupo) => {
    console.log(grupo);
    this.setState({
      contacts: this.state.contacts,
      grupoSelecionado: grupo
    });
  };

  render() {
    return (
      <Container fluid style={{ margin: '1em', backgroundColor: '#dddddd' }}>
        <Grid style={{ height: '100vh' }}>
          <Grid.Column width={3} style={{ height: '100%' }}>
            <ContactList contacts={this.state.contacts} selContato={this.selContato}/>
          </Grid.Column>
          <Grid.Column width={13} style={{ paddingLeft: '1%', paddingRight: '2.5%' }}>
            <ChatWindow grupo={this.state.grupoSelecionado} updateChat={this.updateChat}/>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}
