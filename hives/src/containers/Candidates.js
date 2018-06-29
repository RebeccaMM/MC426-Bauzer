import React from "react";
import { Container, Header, Divider, Table, Image } from 'semantic-ui-react';
import axios from 'axios';
import Global from "./Global";
import faker from 'faker';

export default class Opportunity extends React.Component {

  state = {
    interessados : [],
    title: '',
    description: '',
    name_candidate:'',
    email:'',
    phone:'',
    vacancyId: -1,
  }

  componentWillMount() {
    axios.post('http://localhost:8081/interesse/getInteressados', {idEmpresa : Global.user.id})
      .then((response) => {
        this.setState({ interessados: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { interessados } = this.state;
    const interesses = interessados.map((i) => {
      return (
        <Table.Row>
            <Table.Cell>
                <Header as='h4' image>
                    <Image src={faker.internet.avatar()} rounded size='mini' />
                    <Header.Content>
                        {i.nomeInteressado}
                    </Header.Content>
                </Header>
            </Table.Cell>
            <Table.Cell>{i.email}</Table.Cell>
            <Table.Cell>{i.telefone}</Table.Cell>
            <Table.Cell>
                <Header as='h4'>
                    <Header.Content>
                        {i.titulo}
                        <Header.Subheader>
                            {i.descricao}
                        </Header.Subheader>
                    </Header.Content>
                </Header>
            </Table.Cell>
        </Table.Row>
      )
    });

    return (



      <Container fluid style={{ height:'100%', padding: '2em' }} textAlign='left'>
        <Container fluid style={{ height:'100%', padding: '2em' }} textAlign='left'>
          <Header as='h1' style={{color:'black'}}>Candidates</Header>
        </Container>
        <Divider />
        <Table basic='very' celled collapsing style={{width:'100%'}}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Nome</Table.HeaderCell>
                    <Table.HeaderCell>E-mail</Table.HeaderCell>
                    <Table.HeaderCell>Telefone</Table.HeaderCell>
                    <Table.HeaderCell>Vaga</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {interesses}
            </Table.Body>
        </Table>
      </Container>
    )
  }
}
