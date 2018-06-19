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
        this.state.jobs = response.data;
        for (let j of this.state.jobs) {
          axios.post('http://localhost:8081/usuario',{ id: j.idEmpresa })
            .then((response) => {
              j.empresa = response.data[0].nome;
              console.log(this.state.jobs);
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
    return (
      <Container fluid style={{ height:'100%', padding: '2em' }} textAlign='left'>
        <Header as='h1' style={{color:'black'}}>Job Opportunities</Header>
        <Divider />
        <Card.Group>
          <Card
            header='Software Engineer'
            meta='São Paulo'
            description='Fintech job, CLT, 40h/week.'
            extra={
              <a>
                <Button color='green' fluid>
                    Apply
                </Button>
              </a>
            }
          />

        </Card.Group>
      </Container>
    )
  }
}
