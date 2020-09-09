import React, { Component } from "react";
import { Container } from "semantic-ui-react";

class Home extends Component {
  state = { notes: [] };

  fetchNotes = async () => {
    const res = await fetch("http://localhost:5000/api/v1/notes");
    const notes = await res.json();
    this.setState({ notes: [...notes] });
  };

  componentDidMount() {
    this.fetchNotes();
  }

  render() {
    return (
      <Container text>
        <h2>Your Notes</h2>
        {this.state.notes.map((note) => (
          <div key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.contents}</p>
          </div>
        ))}
      </Container>
    );
  }
}

export default Home;
