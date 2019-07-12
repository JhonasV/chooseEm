import React from "react";
import { Row, Col, Button } from "shards-react";

import style from "./CandidateForm.module.css";
import CandidateCard from "../CandidateCard/CandidateCard";

const Form = ({ prevStep, nextStep, values, setGeneralValues, candidates }) => {
  const handleGeneralValuesChange = candidateInfo => {
    setGeneralValues({ ...values, candidate: candidateInfo });
  };
  const handlePrevStep = e => {
    e.preventDefault();
    setGeneralValues({
      ...values,
      voterFormReadOnly: true
    });
    prevStep();
    console.log(values);
  };

  const renderCandidates = () => {
    return candidates.map(candidate => (
      <Col key={candidate._id}>
        <CandidateCard
          id={candidate._id}
          candidate_name={candidate.nombre_candidato}
          candidate_party={candidate.nombre_partido}
          candidate_avatar={candidate.avatar_candidato}
          is_checked={values.candidate.id === candidate._id}
          setFormValues={handleGeneralValuesChange}
          is_review={false}
          values={values}
        />
      </Col>
    ));
  };

  return (
    <div>
      <h4>Choose a candidate!</h4>
      <hr />
      <div>
        <Row>{renderCandidates()}</Row>
        <hr />
        <div>
          <Row style={{ padding: "15px" }}>
            <Col className={style.col_style}>
              <Button
                style={{ width: "25%" }}
                theme="primary"
                onClick={handlePrevStep}
              >
                Go Back
              </Button>
              <Button
                style={{ width: "25%", marginLeft: "5px" }}
                theme="success"
                disabled={values.candidate.id ? false : true}
                onClick={nextStep}
              >
                Review information
              </Button>
            </Col>
          </Row>
        </div>
        {/* </FormShard> */}
      </div>
    </div>
  );
};

export default Form;
