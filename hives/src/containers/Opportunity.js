import React from "react";
import { Container, Header, Grid, Card, Button, Divider } from 'semantic-ui-react';
import axios from 'axios';

export default class Opportunity extends React.Component {

  state = {
    jobs : [],
  }

  componentWillMount() {
    axios.get('http://localhost:8081/vagas')
      .then((response) => {
        this.setState({ jobs: response.data });
        for (let j of this.state.jobs) {
          axios.post('http://localhost:8081/usuario',{ id: j.idEmpresa })
            .then((response) => {
              j.empresa = response.data[0].nome;
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }


  render() {

    const vagas = this.state.jobs.map((j) => {
      console.log(j);
      return (
        <Card
          key={j.titulo + j.empresa}
          header={j.titulo}
          meta={j.empresa}
          description={j.descricao}
          extra={
            <a>
              <Button color='green' fluid>
                  Apply
              </Button>
            </a>
          }
        />
      )
    });

    return (
      <Container fluid style={{ height:'100%', padding: '2em' }} textAlign='left'>
        <Header as='h1' style={{color:'black'}}>Job Opportunities</Header>
        <Divider />
        <Card.Group>
          {vagas}
        </Card.Group>
      </Container>
    )
  }
}
