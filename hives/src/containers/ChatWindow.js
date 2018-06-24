import React from "react";
import axios from "axios";
import { Container, Header, Input, Form, TextArea, Button} from 'semantic-ui-react';
import '../Pages.css';

import Global from './Global';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMsg: '',
      user: props.user
    };

    this.sendMsg = this.sendMsg.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  sendMsg() {
    var msg = this.state.inputMsg;
    if(msg === '')
      return;

    msg = Global.user.nome + ': ' + msg;

    Global.socket.emit('Mensagem enviada', {
      idUsuario: Global.user.id,
      idGrupo: this.props.grupo.id,
      mensagem: msg
    });

    this.setState({ inputMsg: '' });
  }

  handleChange(e){
    this.setState({
      inputMsg: e.target.value,
      user: this.state.user
    });
  }

  handleKeyPress(k){
    if(k.key === 'Enter')
      this.sendMsg();
  }

  render() {
    if(this.props.grupo === undefined)
      return (<br />)

    return (
      <Container fluid style={{backgroundColor: '#ddd', height: '100%' }}>
        <Header as="h1">Chat {this.props.grupo.getNome(Global.user.id)}</Header>
        <Form style={{ height: '80%', padding: '0' }}>
          <TextArea
            disabled
            readOnly
            style={{ height: '100%', resize: 'none' }}
            value={this.props['grupo'].messages.map(function(g){ return g.mensagem }).join('\r\n')}
          />
        </Form>
        <Input
          action={
            <Button
              color='teal'
              icon='send'
              labelPosition='right'
              content='Enviar'
              onClick={ this.sendMsg }
            />}
          value={ this.state.inputMsg }
          onChange={ this.handleChange }
          onKeyPress={ this.handleKeyPress }
          style={{ width: '100%' }} placeholder='Mensagem...'/>
      </Container>
    )
  }
}

// const contacts = _.times(5, () => {
//   let name = faker.name.firstName();
//   return (
//     {
//       name: name,
//       title: name,
//       image: faker.internet.avatar(),
//     }
//   );
// });
