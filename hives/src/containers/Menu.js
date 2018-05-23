import React from "react";
import {
  Link,
} from "react-router-dom";

import { AuthButton } from "../App";

export default class Menu extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/chat">Chat</Link></li>
          <li><AuthButton /></li>
        </ul>
      </div>
    )
  }
}
