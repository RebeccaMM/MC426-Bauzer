import React from "react";
import { Menu } from 'semantic-ui-react'
import {
  Link,
} from "react-router-dom";

import { AuthButton } from "../App";

export default class MainMenu extends React.Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name})

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Menu.Item
          name = 'LogOut'
          active = { activeItem === 'LogOut' }
          onClick = { this.handleItemClick }
        >
          <AuthButton />
        </Menu.Item>

        <Menu.Item
          name = 'Dashboard'
          active = { activeItem === 'Dashboard' }
          onClick = { this.handleItemClick }
        >
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>

        <Menu.Item
          name = 'Chat'
          active = { activeItem === 'Chat' }
          onClick= { this.handleItemClick }
        >
          <Link to="/chat">Chat</Link>
        </Menu.Item>
      </Menu>
    )
  }
}

