import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export default class Navbar extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div id="navbar">
        <Menu pointing secondary size="huge">
          <Menu.Item
            as={NavLink}
            to="/notes"
            name="home"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          >
            Flatbook
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item
              as={NavLink}
              to="/new"
              name="new"
              active={activeItem === "new"}
              onClick={this.handleItemClick}
            >
              New Note
            </Menu.Item>
            <Menu.Item
              as={NavLink}
              to="/login"
              name="login"
              active={activeItem === "login"}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}
