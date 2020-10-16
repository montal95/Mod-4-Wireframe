import React, { Component } from "react";
import { Container, Button, Form } from "semantic-ui-react";
import { signupSuccess } from "../actions/auth";
import { connect } from "react-redux";

const URL = process.env.REACT_APP_API_URL;

class Signup extends Component {
  state = {
    email: "",
    password: "",
    name: "",
    error: null,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    };
    const res = await fetch(`${URL}/api/v1/users`, reqObj);
    const data = await res.json();
    if (data.error) {
      this.setState({
        error: data.error,
      });
    } else {
      localStorage.setItem("flatbookToken", data.token);
      this.props.signupSuccess(data);
      this.props.history.push("/notes");
    }
  };

  render() {
    return (
      <Container text>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>E-mail</label>
            <input
              placeholder="E-mail"
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </Form.Field>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder="Name"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              placeholder="Password"
              type="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  signupSuccess,
};

export default connect(null, mapDispatchToProps)(Signup);
