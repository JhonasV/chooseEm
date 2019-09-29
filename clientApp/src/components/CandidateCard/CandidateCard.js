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
  voteStatictics,
  is_statistics,
  is_confirm
}) => {
  const renderCardHeaderContent = (is_review, is_confirm, is_statistics) => {
    if (is_statistics)
      return <Progress value={voteStatictics}>{voteStatictics}</Progress>;

    if (is_confirm)
      return (
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
      );

    if (is_review) return null;
  };

  return (
    <Card className="ml-auto mr-auto card-sizes">
      <CardHeader>
        {renderCardHeaderContent(is_review, is_confirm, is_statistics)}
      </CardHeader>
      <CardImg
        src={candidate_avatar}
        style={{ maxHeight: "270px", minHeight: "250px" }}
      />
      <CardBody>
        <CardTitle>{candidate_party}</CardTitle>
        <p>{candidate_name}</p>
      </CardBody>
    </Card>
  );
};

export default CandidateCard;
