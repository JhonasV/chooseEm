import React from "react";
import { Row, Col, Button } from "shards-react";
import Loading from "../Loading";
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
      <Col
        key={candidate._id}
        sm={12}
        md={6}
        lg={4}
        className="mb-3 ml-auto mr-auto"
      >
        <CandidateCard
          id={candidate._id}
          candidate_name={candidate.nombre_candidato}
          candidate_party={candidate.nombre_partido}
          candidate_avatar={candidate.avatar_candidato}
          is_checked={values.candidate.id === candidate._id}
          setFormValues={handleGeneralValuesChange}
          is_review={false}
          is_confirm={true}
          values={values}
        />
      </Col>
    ));
  };

  return (
    <div className={"bg-primary-custom"}>
      <h4 className="text-white font-weight-bold">Choose a candidate!</h4>
      <hr />
      <div className="form-styles-custom">
        <Row>
          {candidates ? (
            renderCandidates()
          ) : (
            <Loading active={candidates ? false : true} />
          )}
        </Row>
        <hr />
        <div>
          <Row>
            <Col sm={12} md={6} lg={4} className="mb-3">
              <Button
                className="btn-block"
                theme="primary"
                onClick={handlePrevStep}
              >
                <i class="fas fa-arrow-circle-left"></i> Go Back
              </Button>
            </Col>
            <Col sm={12} md={6} lg={4} className="mb-3">
              <Button
                className="btn-block"
                theme="success"
                disabled={values.candidate.id ? false : true}
                onClick={nextStep}
              >
                <i class="fas fa-search"></i> Review information
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
