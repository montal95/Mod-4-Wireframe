import React, { Component } from "react";
import { Container, Button, Form } from "semantic-ui-react";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
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
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              placeholder="Password"
              type="password"
              name="password"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    );
  }
}

export default Login;
