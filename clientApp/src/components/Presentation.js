import React from "react";

import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardFooter,
  CardTitle,
  CardGroup,
  CardColumns,
  Button
} from "shards-react";

const Presentation = ({ nextStep }) => {
  return (
    <div className="w-75 mx-auto mt-5 ">
      <Card>
        <CardHeader>
          <CardGroup className="py-3 px-3 bg-primary-custom text-white">
            <CardColumns>
              <CardTitle className="text-white">Vote Simulator</CardTitle>
            </CardColumns>
          </CardGroup>
        </CardHeader>
        <CardBody>
          <CardGroup className="py-3 px-3 text-white bg-primary-custom font-weight-bold">
            <CardText>Help us to choose the best candidate.</CardText>
          </CardGroup>
        </CardBody>
        <CardFooter>
          <Button
            theme="secondary"
            onClick={() => nextStep()}
            className="btn btn-block"
          >
            BEGIN{" "}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Presentation;
