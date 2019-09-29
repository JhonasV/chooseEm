import React, { useState } from "react";
import { Redirect } from "react-router-dom";
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
import Loading from "../Loading";
// const URL = "http://localhost:5000/api/voto";
const genreOptions = [
  { value: "m", name: "Male" },
  { value: "f", name: "female" }
];
const ReviewForm = ({ values, setStep, prevStep, setGeneralValues }) => {
  const [isOpen, OpenToggle] = useState(false);
  const [isVoteConfirmOpen, setVoteConfirmOpen] = useState(false);
  const [isDisable, setDisableOnDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
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
    if (response.ok) {
      setRedirect(true);
    }

    setIsLoading(false);
  };

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

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: "/charts",
          state: { message: "Vote proccesed succesfully!" }
        }}
      />
    );
  }

  return (
    <div className="bg-primary-custom">
      <h4 className="text-white font-weight-bold">Vote Review</h4>
      <hr />
      {isDisable ? (
        <Alert theme={"warning"} key={1}>
          <span>The vote has been cancelled!</span>
          <Button theme="primary" onClick={onTryAgainClick}>
            Try Again
          </Button>
        </Alert>
      ) : null}
      <div className={"form-styles-custom"}>
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
              <label>ID</label>
              <FormInput
                type="text"
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
          {/* <Col md="2" sm="2" lg="2" /> */}
          <Col md="4 ml-auto mr-auto">
            <CandidateCard
              id={values.candidate.id}
              candidate_name={values.candidate.candidate_name}
              candidate_party={values.candidate.candidate_party}
              candidate_avatar={values.candidate.candidate_avatar}
              is_checked={false}
              is_review={true}
              values={values}
            />
          </Col>
        </Row>
        <div>
          <Row className="py-5 px-5">
            <Col className="mt-2 mb-2 w-100">
              <Button
                onClick={modalToggle}
                theme="danger"
                disabled={isDisable}
                className="text-nowrap btn-block"
              >
                <i class="fas fa-window-close"></i> Cancel
              </Button>
            </Col>
            <Col className="mt-2 mb-2">
              <Button
                disabled={isDisable}
                className="text-nowrap btn-block"
                theme="primary"
                onClick={prevStep}
              >
                <i class="fas fa-arrow-circle-left"></i> Back
              </Button>
            </Col>
            <Col className="mt-2 mb-2">
              <Button
                theme="success"
                className="text-nowrap btn-block"
                onClick={confirmVoteModalToggle}
                disabled={isDisable}
              >
                <i class="fas fa-user-check"></i> Submit
              </Button>
            </Col>
          </Row>
        </div>
        {/* Confirmation Modal */}
        <Modal open={isOpen} toggle={modalToggle}>
          <ModalHeader>Vote Cancel Confirmation</ModalHeader>
          <ModalBody>Are you sure to cancel the vote attemp?</ModalBody>
          <ModalFooter>
            <Button onClick={cancelVote} theme="secondary">
              <Loading active={isLoading} button={true} /> Confirm
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
              <Loading active={isLoading} button={true} /> Confirm
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
