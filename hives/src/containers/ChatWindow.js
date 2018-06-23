import _ from 'lodash';
import React from "react";
import faker from 'faker'
import { Container, Header, Grid, Input, Form, TextArea, Button} from 'semantic-ui-react';
import '../Pages.css';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msgHistory: '',
      inputMsg: ''
    };

    this.sendMsg = this.sendMsg.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  sendMsg() {
    if(this.state.inputMsg == '')
      return;

    var h = this.state.msgHistory + this.state.inputMsg + '\r\n';
    this.setState({
      msgHistory: h,
      inputMsg: ''
    })
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
    return (
      <Container fluid style={{backgroundColor: '#ddd', height: '100%' }}>
        <Header as="h1">Chat</Header>
        <Form style={{ height: '80%', padding: '0' }}>
          <TextArea
            disabled
            readOnly
            style={{ height: '100%', resize: 'none' }}
            value={this.state.msgHistory}
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
