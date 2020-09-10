import React from "react";
import { Button, Card } from "semantic-ui-react";

const IndexCards = (props) => {
  console.log(props.note);
  const { id, title, contents } = props.note;
  return (
    <Card>
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Description>{contents}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green">
            Approve
          </Button>
          <Button basic color="red">
            Decline
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default IndexCards;
