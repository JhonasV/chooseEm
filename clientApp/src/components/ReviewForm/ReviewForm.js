import React, { useState } from "react";
import Loader from "react-loader-spinner";
import {
  Row,
  Col,
  FormInput,
  FormGroup,
  FormSelect,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Alert
} from "shards-react";
// import ConfirmComponent from "../ConfirmComponent";
import CandidateCard from "../CandidateCard/CandidateCard";
import { Link } from "react-router-dom";
import style from "../VoterForm/VoterForm.module.css";
// const URL = "http://localhost:5000/api/voto";
const genreOptions = [
  { value: "m", name: "Male" },
  { value: "f", name: "female" }
];
const ReviewForm = ({
  values,
  setStep,
  prevStep,
  nextStep,
  setGeneralValues
}) => {
  const [isOpen, OpenToggle] = useState(false);
  const [isVoteConfirmOpen, setVoteConfirmOpen] = useState(false);
  const [isDisable, setDisableOnDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sendVoteHandle = async () => {
    setIsLoading(true);
    const config = {
      method: "post",
      body: JSON.stringify({
        dni: values.dni,
        candidateId: values.candidate.id
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    };
    const response = await fetch(`/api/voto/seleccion`, config);

    const data = await response.json();

    const { voto } = data;
    if (voto) {
      localStorage.setItem("vote_proccessed", voto);
      nextStep();
    }
    setIsLoading(false);
  };
  // useEffect(() => {
  //   OpenToggle(!isOpen);
  // }, [isOpen]);

  const modalToggle = () => {
    OpenToggle(!isOpen);
  };

  const onTryAgainClick = () => {
    //Go back to the first step
    setStep(1);
    //Enable the buttoms in Review view
    setDisableOnDelete(false);
    //Reset general values to initial values.
    setGeneralValues({
      name: "",
      dni: "",
      sex: "",
      birthdate: "",
      candidate: {},
      voterFormReadOnly: false,
      API: "/api"
    });
  };

  const confirmVoteModalToggle = () => {
    setVoteConfirmOpen(!isVoteConfirmOpen);
  };

  const cancelVote = async () => {
    setIsLoading(true);
    const response = await fetch(`${values.API}/voto/cancel/${values.dni}`, {
      method: "delete"
    });

    const data = await response.json();
    setDisableOnDelete(data.isCanceled);
    setIsLoading(false);
    modalToggle();
  };

  return (
    <div>
      <h4>Vote Review</h4>
      <hr />
      {isDisable ? (
        <Alert theme={"warning"} key={1}>
          <span>The vote has been cancelled!</span>
          <Button theme="primary" onClick={onTryAgainClick}>
            Try Again
          </Button>
        </Alert>
      ) : null}
      <Row>
        <Col md="6">
          <FormGroup>
            <label>Name</label>
            <FormInput
              type="text"
              name="name"
              value={values.name}
              disabled={true}
            />
          </FormGroup>
          <FormGroup>
            <label>DNI</label>
            <FormInput
              type="number"
              name="dni"
              placeholder="Your dni"
              disabled={true}
              value={values.dni}
            />
          </FormGroup>
          <FormGroup>
            <label>Sex</label>
            <FormSelect name="sex" disabled={true} value={values.sex}>
              <option value="">Choose the sex</option>
              {genreOptions.map((genre, index) => (
                <option
                  key={index}
                  // selected={genre.value === formValues.sex}
                  value={values.sex}
                >
                  {genre.name}
                </option>
              ))}
            </FormSelect>
          </FormGroup>
          <FormGroup>
            <label>Birthdate</label>
            <FormInput
              type="date"
              name="birthdate"
              disabled={true}
              value={values.birthdate}
            />
          </FormGroup>
        </Col>
        <Col md="2" sm="2" lg="2" />
        <Col md="4">
          <CandidateCard
            id={values.candidate.id}
            candidate_name={values.candidate.candidate_name}
            candidate_party={values.candidate.candidate_party}
            candidate_avatar={values.candidate.candidate_avatar}
            is_checked={true}
            is_review={true}
            values={values}
          />
        </Col>
      </Row>
      <div>
        <Row className={"col_style"} style={{ padding: "15px" }}>
          <Col>
            {isLoading ? (
              <Loader
                className={style.loaderMargin}
                type="Triangle"
                color="#00BFFF"
                height="100"
                width="100"
              />
            ) : null}
          </Col>
          <Col>
            <Button
              onClick={modalToggle}
              style={{ width: "25%", marginRight: "5px" }}
              theme="danger"
              disabled={isDisable}
            >
              Cancel attemp
            </Button>
            <Button
              disabled={isDisable}
              style={{ width: "25%" }}
              theme="primary"
              onClick={prevStep}
            >
              Go Back
            </Button>
            <Button
              style={{ width: "25%", marginLeft: "5px" }}
              theme="success"
              onClick={confirmVoteModalToggle}
              disabled={isDisable}
            >
              Finish
            </Button>
          </Col>
        </Row>

        {/* Confirmation Modal */}
        <Modal open={isOpen} toggle={modalToggle}>
          <ModalHeader>Vote Cancel Confirmation</ModalHeader>
          <ModalBody>Are you sure to cancel the vote attemp?</ModalBody>
          <ModalFooter>
            <Button onClick={cancelVote} theme="secondary">
              Confirm
            </Button>
            <Button onClick={modalToggle} theme="primary">
              Close
            </Button>
          </ModalFooter>
        </Modal>

        <Modal open={isVoteConfirmOpen} toggle={confirmVoteModalToggle}>
          <ModalHeader>Submit vote confirmation</ModalHeader>
          <ModalBody>Are you sure to submit the vote attemp?</ModalBody>
          <ModalFooter>
            <Button onClick={sendVoteHandle} theme="secondary">
              Confirm
            </Button>
            <Button onClick={confirmVoteModalToggle} theme="primary">
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default ReviewForm;
