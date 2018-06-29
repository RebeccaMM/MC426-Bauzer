import React from "react";
import { Container, Header, Grid, Card, Button, Divider, Popup, Input } from 'semantic-ui-react';
import axios from 'axios';
import Global from "./Global";

export default class Opportunity extends React.Component {

  state = {
    jobs : [],
    apply_state : 0,
    vacancy_state: 0,
    title: '',
    description: '',
    name_candidate:'',
    email:'',
    phone:'',
    vacancyId: -1,
  }

  componentWillMount() {
    axios.get('http://localhost:8081/vagas')
      .then((response) => {
        this.setState({ jobs: response.data });
        for (let j of this.state.jobs) {
          axios.post('http://localhost:8081/usuario',{ id: j.idEmpresa })
            .then((response) => {
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

  handleCreateOpportunityApplication = (idEmpresa, e) => {
    e.preventDefault();

    var interesse = {
      nomeInteressado:this.state.name_candidate,
      email: this.state.email,
      telefone: this.state.phone,
      idVaga:idEmpresa,
    };

    if (interesse.email !== '' && interesse.telefone !== '' && interesse.nomeInteressado !== '') {
      axios.post('http://localhost:8081/interesse', {
        interesse:interesse
      })
        .then((response) => {
          console.log(response);
          this.setState({apply_state: 1});
        })
        .catch((error) => {
          this.setState({apply_state: -1});
          console.log(error);
        });
    }

  }

  handleCreateOpportunity = (e) => {
    e.preventDefault();

    var vacancy = {
      empresa: Global.user.id,
      titulo: this.state.title,
      descricao: this.state.description
    };

    // console.log(vacancy);

    if (vacancy.titulo !== '') {
      axios.post('http://localhost:8081/vaga/addVaga', {
        vaga:vacancy
      })
        .then((response) => {
          console.log(response);
          this.setState({ vacancy_state: 1 });
        })
        .catch((error) => {
          console.log(error);
          this.setState({ vacancy_state: -1 });
        });
    }
  }

  render() {
    const { jobs, apply_state, vacancy_state } = this.state;
    const vagas = jobs.map((j) => {
      const form = <div>
          <Input size='tiny' icon='user' placeholder='Name' style={{ margin: "0.5em" }}
            onChange={(e) => this.setState({name_candidate: e.target.value})}/>
          <Input size='tiny' icon='at' placeholder='Email' style={{ margin: "0.5em" }}
            onChange={(e) => this.setState({email: e.target.value})}/>
          <Input size='tiny' icon='phone' placeholder='Phone' style={{ margin: "0.5em" }}
            onChange={(e) => this.setState({phone: e.target.value})}/>
        <Button fluid style={{ margin: "0 0.5em" }} onClick={(e) => { this.handleCreateOpportunityApplication.bind(this, j.idEmpresa)(e);
           }}>Confirm Apply</Button>
        </div>;

      const confirm = <p style={{ color : "green" }} icon='phone'>Applied!</p> ;
      const server_error = <p style={{color:"red"}} icon='phone'>Oops! Server error</p>;

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
                apply_state === 0 ? form : (apply_state === 1 ? confirm : server_error)
              }
              size='large'
              on='click'
              style={{backgroundColor:"white"}}
              onClose={() => this.setState({ apply_state : 0 })}
            />

          }
        />
      )
    }); 

    
    const confirm = <p style={{ color: "green" }}>Opportunity created!</p>;
    const server_error = <p style={{ color: "red" }}>Oops! Server error</p>;
    const form =
      <div class="ui form">
        <div class="field">
          <label>Title</label>
          <input name='title' icon='briefcase' placeholder='Title' style={{ margin: "0.5em" }}
            onChange={(e) => this.setState({ title: e.target.value })}
          />
        </div>
        <div class="field">
          <label>Description</label>
          <textarea onChange={(e) => this.setState({ description: e.target.value })}>
          </textarea>
        </div>
        <Button fluid style={{ margin: "0 0.5em" }}
          onClick={this.handleCreateOpportunity}>Create</Button>
      </div>;

    return (
      <Container fluid style={{ height: '100%', padding: '2em' }} textAlign='left'>
        <Container fluid style={{ height: '100%', padding: '2em' }} textAlign='left'>
          <Header as='h1' style={{ color: 'black' }}>Job Opportunities</Header>
          <Popup
            trigger={<button class="ui blue right floated labeled icon button">
              <i class="plus icon"></i>
              Create Opportunity
            </button>
            }
            content={
              vacancy_state === 0 ? form : (vacancy_state === 1 ? confirm : server_error)
            }
            size='large'
            on='click'
            style={{ backgroundColor: "white" }}
            onClose={() => this.setState({ vacancy_state: 0 })}
          />

        </Container>
        <Divider />
        <Card.Group>
          {vagas}
        </Card.Group>
      </Container>
    )
  }
}
