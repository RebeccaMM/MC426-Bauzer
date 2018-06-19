import _ from 'lodash';
import React from "react";
import faker from 'faker'
import { Container, Header, Grid, Input, Form, TextArea, Button} from 'semantic-ui-react';
import '../Pages.css';

var msg = '';
var inputValue;

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: ''
    };

    this.sendMsg = this.sendMsg.bind(this);
  }

  sendMsg(i) {
    var h = this.state.history + inputValue + '\r\n';
    this.setState({
      history: h
    })
  }

  render() {
    return (
      <Container fluid style={{backgroundColor: '#ddd', height: '100%' }}>
        <Header as="h1">Chat</Header>
        <Form style={{ height: '80%', padding: '0' }}>
          <TextArea  readonly style={{ height: '100%' }} value={this.state.history} />
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
          onChange={ e => inputValue = e.target.value }
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
