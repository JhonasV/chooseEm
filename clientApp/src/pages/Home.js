import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import style from "./Home.module.css";
//Components
import VoterForm from "../components/VoterForm/VoterForm";
import CandidateForm from "../components/CandidateForm/CandidateForm";
import ReviewForm from "../components/ReviewForm/ReviewForm";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Presentation from "../components/Presentation";
const Home = ({ candidates }) => {
  const [step, setStep] = useState(0);
  const [generalValues, setGeneralValues] = useState({
    name: "",
    dni: "",
    sex: "",
    birthdate: "",
    candidate: {},
    voterFormReadOnly: false,
    API: "/api"
  });

  const nextFormStep = () => {
    setStep(currentStep => currentStep + 1);
  };

  const prevFormStep = () => {
    setStep(currentStep => currentStep - 1);
  };

  const renderStep = step => {
    switch (step) {
      case 0:
        return <Presentation nextStep={nextFormStep} />;
      case 1:
        return (
          <VoterForm
            nextStep={nextFormStep}
            // setNextStep={setNextStep}
            setGeneralValues={setGeneralValues}
            values={generalValues}
          />
        );
      case 2:
        return (
          <CandidateForm
            prevStep={prevFormStep}
            nextStep={nextFormStep}
            // setPrevStep={setNextStep}
            setGeneralValues={setGeneralValues}
            values={generalValues}
            // setNextStep={setNextStep}
            candidates={candidates}
          />
        );
      case 3:
        return (
          <ReviewForm
            setGeneralValues={setGeneralValues}
            values={generalValues}
            nextStep={nextFormStep}
            prevStep={prevFormStep}
            setStep={setStep}
          />
        );
      case 4:
        // return <Statistics setStep={setStep} values={generalValues} />;
        return <Redirect to={`/charts`} />;
      default:
        break;
    }
  };
  return (
    <div
      className={
        step === 0 ? "" : `px-5 py-3 ${style.vp_border} bg-primary-custom mb-5`
      }
    >
      {step === 0 ? null : <Breadcrumb currentStep={step} />}
      {renderStep(step)}
    </div>
  );
};

export default Home;
