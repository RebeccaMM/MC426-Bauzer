import React from "react";
import { Menu, Input, Icon } from 'semantic-ui-react';
import { Link } from "react-router-dom";

import { AuthButton } from "../App";

const itemStyle = {
  fontWeight: 'bold',
}
const selectedItemStyle = {
  fontWeight: 'bold',
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
        <Menu.Item
          name='dashboard'
          color="yellow"
          style={activeItem === 'dashboard' ? selectedItemStyle : itemStyle }
          active={activeItem === 'dashboard'}
          onClick={this.handleItemClick}
        >
          <Link to="/">Dashboard</Link>
        </Menu.Item>

        <Menu.Item
          name='chat'
          color="yellow"
          style={activeItem === 'chat' ? selectedItemStyle : itemStyle }
          active={activeItem === 'chat'}
          onClick={this.handleItemClick}
        ><
          Link to="/chat">Chat</Link>
        </Menu.Item>

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
