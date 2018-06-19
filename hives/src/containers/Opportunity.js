import React from "react";
import { Container, Header, Grid, Card, Button, Divider } from 'semantic-ui-react';
import soft from '../assets/soft.jpg';


export default class Opportunity extends React.Component {
  render() {
    return (
      <Container fluid style={{ height:'100%', padding: '2em', backgroundColor:'#333333' }} textAlign='left'>
        <Header as='h1' style={{color:'white'}}>Job Opportunities</Header>
        <Divider />
        <Card.Group>
          <Card
            image={soft}
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
