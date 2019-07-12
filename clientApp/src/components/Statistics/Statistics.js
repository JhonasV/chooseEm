import React, { Component } from "react";
import { Row, Col, Alert } from "shards-react";
import Loader from "react-loader-spinner";
// import { Row, Col, Alert, Button } from "shards-react";
import CandidateCard from "../CandidateCard/CandidateCard";
import style from "../VoterForm/VoterForm.module.css";
const URL = "http://localhost:5000/api/voto/estadisticas";
export default class Statistics extends Component {
  state = { parties: [], isLoading: true };
  renderCandidates = () => {
    const { parties, isLoading } = this.state;
    return parties.map(partyCandidate => (
      <Col key={partyCandidate.partido._id}>
        {isLoading ? (
          <Loader
            // className={style.loaderMargin}
            type="Triangle"
            color="#00BFFF"
            height="100"
            width="100"
          />
        ) : (
          <CandidateCard
            id={partyCandidate.partido._id}
            candidate_name={partyCandidate.partido.nombre_candidato}
            candidate_party={partyCandidate.partido.nombre_partido}
            candidate_avatar={partyCandidate.partido.avatar_candidato}
            is_checked={true}
            is_review={true}
            voteStatictics={partyCandidate.porcentaje}
          />
        )}
      </Col>
    ));
  };
  fetchStatictics = async () => {
    // const { values } = this.props;
    const response = await fetch("/api/voto/estadisticas");
    const data = await response.json();
    this.setState({ parties: data, isLoading: false });
  };
  componentDidMount() {
    this.fetchStatictics();
  }

  render() {
    const is_vote_proccessed = localStorage.getItem("vote_proccessed");

    // const { setStep } = this.props;
    return (
      <div>
        <h5>Top Charts</h5>
        {is_vote_proccessed && this.state.parties.length > 0
          ? [
              <Alert theme={"success"} key={1}>
                <span>Vote proccesed succesfully!</span>
              </Alert>,
              window.localStorage.removeItem("vote_proccessed")
            ]
          : null}

        {/* <Button onClick={() => setStep(1)} theme="secondary">
          Go back to the start
        </Button> */}
        <hr />
        <div>
          <Row>{this.renderCandidates()}</Row>
          <hr />
        </div>
      </div>
    );
  }
}
