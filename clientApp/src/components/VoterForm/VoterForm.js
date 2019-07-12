import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import {
  Form as FormShard,
  FormGroup,
  FormInput,
  Row,
  Col,
  FormSelect,
  Button,
  Alert
} from "shards-react";

import style from "./VoterForm.module.css";
const genreOptions = [
  { value: "m", name: "Male" },
  { value: "f", name: "female" }
];
const Form = ({ nextStep, setGeneralValues, values }) => {
  const [isDisable, setIsDisable] = useState(
    values.voterFormReadOnly ? false : values.voterFormReadOnly
  );
  const [isLoading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertState, setAlertState] = useState("");
  const [canContinue, setCanContinue] = useState(
    values.voterFormReadOnly ? false : true
  );
  const [isVoterFormDisable, setVoterFormDisable] = useState(false);

  const isNullOrWhiteSpace = value => {
    let isNullOrWhiteSpace = value !== "";
    return isNullOrWhiteSpace;
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    if (isDisable) return;
    sendFormValues();
  };

  const sendFormValues = async () => {
    setLoading(true);
    const voterInfo = {
      name: values.name,
      dni: values.dni,
      sex: values.sex,
      birthdate: values.birthdate
    };
    const config = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(voterInfo)
    };

    let response = null;
    let data = null;

    try {
      response = await fetch(`${values.API}/voto`, config);
      data = await response.json();
    } catch (error) {
      console.error(error);
    }

    if (data.alreadyVote) {
      setAlertState("warning");

      setAlertMessage(data.message);
      return;
    }
    setCanContinue(false);
    setVoterFormDisable(true);
    setIsDisable(true);
    setLoading(false);
    setAlertState("success");
    setAlertMessage(data.message);
  };

  const handleContinue = e => {
    e.preventDefault();
    nextStep();
  };
  useEffect(() => {
    const submitButtonTrigger = () => {
      let isDisable =
        isNullOrWhiteSpace(values.name) &&
        isNullOrWhiteSpace(values.dni) &&
        isNullOrWhiteSpace(values.sex) &&
        isNullOrWhiteSpace(values.birthdate);
      setIsDisable(isDisable ? false : true);
    };
    submitButtonTrigger();
  }, [values]);

  return (
    <div>
      <div>
        <h4>Voter Registration</h4>
        {alertMessage.length > 0 ? (
          <Alert theme={alertState}>
            <span>{alertMessage}</span>
          </Alert>
        ) : (
          ""
        )}
        <hr />
        <div>
          <FormShard
            style={{ backgroundColor: "#fff", padding: "15px" }}
            onSubmit={handleFormSubmit}
          >
            <Row>
              <Col>
                <FormGroup>
                  <label>Name </label>
                  <FormInput
                    autoComplete="off"
                    type="text"
                    name="name"
                    onChange={e =>
                      setGeneralValues({
                        ...values,
                        [e.target.name]: e.target.value
                      })
                    }
                    placeholder="Your name"
                    disabled={isVoterFormDisable || values.voterFormReadOnly}
                    value={values.name}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <label>ID</label>
                  <FormInput
                    autoComplete="off"
                    type="number"
                    name="dni"
                    onChange={e =>
                      setGeneralValues({
                        ...values,
                        [e.target.name]: e.target.value
                      })
                    }
                    placeholder="Your dni"
                    disabled={isVoterFormDisable || values.voterFormReadOnly}
                    value={values.dni}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <label>Sex </label>
                  <FormSelect
                    autoComplete="off"
                    name="sex"
                    onChange={e =>
                      setGeneralValues({
                        ...values,
                        [e.target.name]: e.target.value
                      })
                    }
                    disabled={isVoterFormDisable || values.voterFormReadOnly}
                    value={values.sex}
                  >
                    <option value="">Choose the sex</option>
                    {genreOptions.map((genre, index) => (
                      <option key={index} value={genre.value}>
                        {genre.name}
                      </option>
                    ))}
                  </FormSelect>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <label>Birthdate </label>
                  <FormInput
                    autoComplete="off"
                    type="date"
                    name="birthdate"
                    onChange={e =>
                      setGeneralValues({
                        ...values,
                        [e.target.name]: e.target.value
                      })
                    }
                    disabled={isVoterFormDisable || values.voterFormReadOnly}
                    value={values.birthdate}
                  />
                </FormGroup>
              </Col>
            </Row>
            <hr />

            <div>
              <Row
                className={style.buttonContainer}
                style={{ padding: "15px" }}
              >
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
                <Col className={"col_style"}>
                  <Button
                    style={{ width: "25%", textAlign: "center" }}
                    theme="primary"
                    disabled={isDisable || values.voterFormReadOnly}
                  >
                    Confirm
                  </Button>
                  <Button
                    style={{
                      width: "25%",
                      marginLeft: "5px",
                      textAlign: "center"
                    }}
                    theme="success"
                    disabled={canContinue}
                    onClick={handleContinue}
                  >
                    Continue
                  </Button>
                </Col>
              </Row>
            </div>
          </FormShard>
        </div>
      </div>
    </div>
  );
};

export default Form;
