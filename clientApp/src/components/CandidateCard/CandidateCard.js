import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  FormRadio,
  Progress
} from "shards-react";

const CandidateCard = ({
  id,
  candidate_name,
  candidate_party,
  candidate_avatar,
  is_checked,
  setFormValues,
  is_review,
  voteStatictics
}) => {
  return (
    <Card style={{ maxWidth: "300px" }}>
      <CardHeader>
        {is_review === false ? (
          <FormRadio
            candidate={id}
            checked={is_checked}
            onChange={() =>
              setFormValues({
                id,
                candidate_name,
                candidate_avatar,
                candidate_party
              })
            }
          />
        ) : (
          <Progress value={voteStatictics}>{voteStatictics}</Progress>
        )}
      </CardHeader>
      <CardImg src={candidate_avatar} />
      <CardBody>
        <CardTitle>{candidate_party}</CardTitle>
        <p>{candidate_name}</p>
      </CardBody>
    </Card>
  );
};

export default CandidateCard;
