import React from "react";
import { Menu, Input, Icon } from 'semantic-ui-react';
import { Link } from "react-router-dom";

import { AuthButton } from "../App";

const itemStyle = {
  fontWeight: 'bold',
  width: "10em",
}
const selectedItemStyle = {
  fontWeight: 'bold',
  width: "10em",
}

export default class MainMenu extends React.Component {
  state = {
    activeItem: 'dashboard',
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name})

  render() {
    const { activeItem } = this.state;

    return (
      <Menu inverted size='large' fluid fixed attached='top' style={{ borderRadius: '0px', margin: '0px' }}>
        <Link to="/">
          <Menu.Item
            name='dashboard'
            color="yellow"
            width={3}
            style={activeItem === 'dashboard' ? selectedItemStyle : itemStyle }
            active={activeItem === 'dashboard'}
            onClick={this.handleItemClick}
          >
            Dashboard
          </Menu.Item>
        </Link>
        <Link to="/chat">
          <Menu.Item
            name='chat'
            color="yellow"
            style={activeItem === 'chat' ? selectedItemStyle : itemStyle }
            active={activeItem === 'chat'}
            onClick={this.handleItemClick}
          >
            Chat
          </Menu.Item>
        </Link>
        <Link to="/opportunity">
          <Menu.Item
            name='opportunity'
            color="yellow"
            style={activeItem === 'opportunity' ? selectedItemStyle : itemStyle }
            active={activeItem === 'opportunity'}
            onClick={this.handleItemClick}
          >
            Opportunities
          </Menu.Item>
        </Link>
        <Link to="/candidates">
          <Menu.Item
            name='candidates'
            color="yellow"
            style={activeItem === 'candidates' ? selectedItemStyle : itemStyle }
            active={activeItem === 'candidates'}
            onClick={this.handleItemClick}
          >
            Candidates
          </Menu.Item>
        </Link>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input className='search' icon={<Icon name='search' inverted circular link />} placeholder='Search...' />
          </Menu.Item>
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.handleItemClick}
          >
            <AuthButton />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}
