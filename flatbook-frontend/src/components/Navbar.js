import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutSuccess } from "../actions/auth";
import { wipeAllNotes } from "../actions/notes";

class Navbar extends Component {
  clickLogout = () => {
    localStorage.removeItem("flatbookToken");
    this.props.logoutSuccess();
    this.props.wipeAllNotes();
    this.props.history.push("/login");
  };

  render() {
    const { activeItem } = this.props.location.pathname;
    const token = localStorage.getItem("flatbookToken");
    const loginButton = (
      <Menu.Item
        as={NavLink}
        to="/login"
        name="login"
        active={activeItem === "/login"}
      />
    );
    const logoutButton = <Menu.Item name="logout" onClick={this.clickLogout} />;

    return (
      <div id="navbar">
        <Menu pointing secondary size="huge">
          <Menu.Item
            as={NavLink}
            to="/notes"
            name="home"
            active={activeItem === "/home" || activeItem === "/"}
          >
            Flatbook
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item
              as={NavLink}
              to="/new"
              name="new"
              active={activeItem === "/new"}
            >
              New Note
            </Menu.Item>
            {token ? logoutButton : loginButton}
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

const mapDispatchToProps = {
  wipeAllNotes,
  logoutSuccess,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    notes: state.notes,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
