import React, { Component } from "react";
import { Container, Card } from "semantic-ui-react";
import { currentUser } from "../actions/auth";
import { getNotes } from "../actions/notes";
import { connect } from "react-redux";
import IndexCard from "../components/IndexCards";

class Home extends Component {
  componentDidMount() {
    const token = localStorage.getItem("flatbookToken");
    if (!token) {
      this.props.history.push("/login");
    } else {
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
    const res = await fetch(
      "http://localhost:5000/api/v1/current_user",
      reqObj
    );
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
    const res = await fetch("http://localhost:5000/api/v1/notes", reqObj);
    const notes = await res.json();
    this.props.getNotes(notes);
  };

  openNote = (id) => {
    this.props.history.push(`/notes/${id}`);
  };

  render() {
    const cards = () => {
      if (this.props.notes) {
        return this.props.notes.map((note) => (
          <IndexCard note={note} key={note.id} openNote={this.openNote} />
        ));
      } else {
        return <p>Please add new notes</p>;
      }
    };
    return (
      <Container text>
        <h2>Your Notes</h2>
        <Card.Group>{cards()}</Card.Group>
      </Container>
    );
  }
}

const setStateToProps = (state) => {
  return {
    auth: state.auth,
    notes: state.notes,
  };
};

const setDispatchToProps = {
  currentUser,
  getNotes,
};

export default connect(setStateToProps, setDispatchToProps)(Home);
