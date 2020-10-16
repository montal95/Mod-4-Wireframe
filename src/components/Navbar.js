import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutSuccess, currentUser } from "../actions/auth";
import { getNotes, wipeAllNotes } from "../actions/notes";

const URL = process.env.REACT_APP_API_URL;

class Navbar extends Component {
  clickLogout = () => {
    localStorage.removeItem("flatbookToken");
    this.props.logoutSuccess();
    this.props.wipeAllNotes();
    this.props.history.push("/login");
  };

  componentDidMount() {
    const token = localStorage.getItem("flatbookToken");
    if (token) {
      this.checkToken(token);
    }
  }

  checkToken = async (token) => {
    const reqObj = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await fetch(`${URL}/api/v1/current_user`, reqObj);
    const data = await res.json();
    if (data.error) {
      this.props.history.push("/login");
    } else {
      this.props.currentUser(data);
      this.fetchNotes();
    }
  };

  fetchNotes = async () => {
    const reqObj = {
      method: "GET",
      headers: {
        id: `${this.props.auth.id}`,
      },
    };
    const res = await fetch(`${URL}/api/v1/notes`, reqObj);
    const notes = await res.json();
    this.props.getNotes(notes);
  };

  render() {
    const { activeItem } = this.props.location.pathname;
    const token = localStorage.getItem("flatbookToken");
    const loginButtons = (
      <Menu.Menu position="right">
        <Menu.Item
          as={NavLink}
          to="/signup"
          name="signup"
          active={activeItem === "/signup"}
        />
        <Menu.Item
          as={NavLink}
          to="/login"
          name="login"
          active={activeItem === "/login"}
        />
      </Menu.Menu>
    );
    const logoutButtons = (
      <Menu.Menu position="right">
        <Menu.Item
          as={NavLink}
          to="/notes/new"
          name="new"
          active={activeItem === "/notes/new"}
        >
          New Note
        </Menu.Item>
        <Menu.Item name="logout" onClick={this.clickLogout} />
      </Menu.Menu>
    );

    return (
      <div id="navbar">
        <Menu pointing secondary size="huge">
          <Menu.Item
            as={NavLink}
            to="/notes"
            name="home"
            active={activeItem === "/notes"}
          >
            Flatbook
          </Menu.Item>
          {token ? logoutButtons : loginButtons}
        </Menu>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getNotes,
  wipeAllNotes,
  logoutSuccess,
  currentUser,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    notes: state.notes,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
