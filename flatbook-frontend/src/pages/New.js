import React from "react";
import { Container, Button, Form } from "semantic-ui-react";

const New = () => {
  return (
    <Container>
      <Form size="large">
        <Form.Field>
          <label>Title</label>
          <input placeholder="Title" />
        </Form.Field>
        <Form.TextArea label="Content" placeholder="Content..." />
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default New;
