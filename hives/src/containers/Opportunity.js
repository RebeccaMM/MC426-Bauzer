import React from "react";
import { Container, Header, Grid, Card, Button, Divider, Popup, Input } from 'semantic-ui-react';
import axios from 'axios';

export default class Opportunity extends React.Component {

  state = {
    jobs : [],
    apply : -1,
  }

  componentWillMount() {
    axios.get('http://localhost:8081/vagas')
      .then((response) => {
        this.setState({ jobs: response.data });
        for (let j of this.state.jobs) {
          axios.post('http://localhost:8081/usuario',{ id: j.idEmpresa })
            .then((response) => {
              j.empresa = response.data[0].nome;
              this.setState({ jobs : this.state.jobs });
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
    const { jobs, apply } = this.state;
    const vagas = jobs.map((j) => {
      return (
        <Card
          key={jobs.indexOf(j)}
          header={j.titulo}
          meta={j.empresa}
          description={j.descricao}
          extra={
            <Popup
              trigger={<Button color='green'>Apply</Button>}
              content={
                <div>
                  <Input size='tiny' icon='user' placeholder='Name' style={{margin : "0.5em"}}/>
                  <Input size='tiny' icon='at' placeholder='Email'  style={{margin : "0.5em"}}/>
                  <Input size='tiny' icon='phone' placeholder='Phone'  style={{margin : "0.5em"}}/>
                  <Button fluid style={{margin : "0 0.5em"}}>Confirm Apply</Button>
                </div>
              }
              size='large'
              on='click'
              style={{backgroundColor:"green"}}
            />

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
