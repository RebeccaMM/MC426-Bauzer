import React from "react";
import { Container, Header, Grid, Card, Button, Divider, Popup, Input } from 'semantic-ui-react';
import axios from 'axios';
import Global from "./Global";

export default class Candidates extends React.Component {

    state = {
        candidates : [],
    }

    componentWillMount() {
        axios.get('http://localhost:8081/interesse/getInteressados').
          then((response) => {
              
          })

    }
    render() {
        return (<div></div>)
    }
}