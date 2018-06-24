import _ from 'lodash';
import React from "react";
import faker from 'faker';
import axios from "axios";
import { Container, Header, Input, Form, TextArea, Button} from 'semantic-ui-react';
import '../Pages.css';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      histMsg: '',
      inputMsg: ''
    };

    this.sendMsg = this.sendMsg.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  sendMsg() {
    var msg = this.state.inputMsg;
    console.log('envia:', msg);
    if(msg === '')
      return;

    axios.post('http://localhost:8081/mensagem', {
      idUsuario: 1,
      idGrupo: 1,
      mensagem: msg
    }).then((response) => {
      this.props.updateChat().then(() => {
        this.forceUpdate();
      });
    }).catch((error) => {
      console.log(error);
    });

    this.state.inputMsg = '';
  }

  handleChange(e){
    this.setState({
      msgHistory: this.state.msgHistory,
      inputMsg: e.target.value
    });
  }

  handleKeyPress(k){
    if(k.key == 'Enter')
      this.sendMsg();
  }

  render() {
    if(this.props.grupo == undefined)
      return (<br />)

    return (
      <Container fluid style={{backgroundColor: '#ddd', height: '100%' }}>
        <Header as="h1">Chat  {this.props['grupo'].nome}</Header>
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
