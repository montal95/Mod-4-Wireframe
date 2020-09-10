import React from "react";
import { Button, Card, Icon } from "semantic-ui-react";

const IndexCards = (props) => {
  const { id, title, contents} = props.note;
  return (
    <Card>
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Description>{contents}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button inverted color="green" onClick={() => props.openNote(id)}>
            <Icon name="magnify" size="large" />
          </Button>
          <Button inverted color="red">
            <Icon name="trash alternate outline" size="large" />
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default IndexCards;
