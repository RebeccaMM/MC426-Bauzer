import _ from 'lodash';
import React from "react";
import faker from 'faker'
import { Container, Header, Grid, Input, Form, TextArea, Button} from 'semantic-ui-react';
import '../Pages.css';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: '',
      inputMsg: ''
    };

    this.sendMsg = this.sendMsg.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  sendMsg(i) {
    var h = this.state.history + this.state.inputMsg + '\r\n';
    this.setState({
      history: h,
      inputMsg: ''
    })
    this.inputMsgBox.value='';
  }

  handleInput(e){
    this.setState({
      history: this.state.history,
      inputMsg: e.target.value
    });
  }

  render() {
    return (
      <Container fluid style={{backgroundColor: '#ddd', height: '100%' }}>
        <Header as="h1">Chat</Header>
        <Form style={{ height: '80%', padding: '0' }}>
          <TextArea  readOnly style={{ height: '100%', resize: 'none' }} value={this.state.history} />
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
          onChange={ this.handleInput }
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
