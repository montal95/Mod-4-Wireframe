import React, { Component } from "react";
import { Container, Card } from "semantic-ui-react";
import { currentUser } from "../actions/auth";
import { connect } from "react-redux";
import IndexCard from "../components/IndexCards";

class Home extends Component {
  state = { notes: [] };

  fetchNotes = async () => {
    const reqObj = {
      method: "GET",
      headers: {
        id: `${this.props.auth.id}`,
      },
    };
    const res = await fetch("http://localhost:5000/api/v1/notes", reqObj);
    const notes = await res.json();
    this.setState({ notes: [...notes] });
  };

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

  componentDidMount() {
    const token = localStorage.getItem("flatbookToken");
    if (!token) {
      this.props.history.push("/login");
    } else {
      this.checkToken(token);
    }
  }

  render() {
    return (
      <Container text>
        <h2>Your Notes</h2>
        <Card.Group>
          {this.state.notes.map((note) => (
            <IndexCard note={note} key={note.id}/>
          ))}
        </Card.Group>
      </Container>
    );
  }
}

const setStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const setDispatchToProps = {
  currentUser,
};

export default connect(setStateToProps, setDispatchToProps)(Home);
