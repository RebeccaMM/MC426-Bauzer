import React from "react";
import faker from 'faker';
import axios from "axios";
import JSONfn from 'json-fn';
import { Container, Header, Grid } from 'semantic-ui-react';

import '../Pages.css';
import Global from './Global';

import ContactList from '../containers/ContactList';
import ChatWindow from '../containers/ChatWindow';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts : [],
      grupoSelecionado: undefined,
      user: props.user
    };
  }

  componentDidMount(){
    this.buscaGrupos();
  }

  buscaGrupos = () => {
    return axios.post('http://localhost:8081/grupos', { idUsuario: Global.user.id })
    .then((response) => {
      var grupos = JSONfn.parse(response.data);

      for(var g in grupos){
        grupos[g].name = grupos[g].getNome(Global.user.id);
        grupos[g].title = grupos[g].getNome(Global.user.id);
        grupos[g].image = faker.internet.avatar();
      }

      var gSel = this.state.grupoSelecionado;
      if(gSel !== undefined)
        gSel = grupos[gSel.id];

      this.setState({
        contacts: grupos,
        grupoSelecionado: gSel,
        user: this.state.user
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
      grupoSelecionado: grupo,
      user: this.state.user
    });
  };

  render() {
    Global.socket.on('Mensagem nova', () => {
      this.buscaGrupos();
    })

    return (
      <Container fluid style={{ margin: '1em', backgroundColor: '#dddddd' }}>
        <Grid style={{ height: '100vh' }}>
          <Grid.Column width={3} style={{ height: '100%' }}>
            <ContactList contacts={this.state.contacts} selContato={this.selContato} user={this.state.user}/>
          </Grid.Column>
          <Grid.Column width={13} style={{ paddingLeft: '1%', paddingRight: '2.5%' }}>
            <ChatWindow grupo={this.state.grupoSelecionado} updateChat={this.updateChat} user={this.state.user}/>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}
