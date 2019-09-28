import React, { useState, useEffect } from "react";
import { Row, Col, Alert } from "shards-react";

// import { Row, Col, Alert, Button } from "shards-react";
import CandidateCard from "../CandidateCard/CandidateCard";
import Loading from "../Loading";
const Statistics = ({ location, history }) => {
  const [parties, setParties] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const fetchStatictics = async () => {
    setLoading(true);
    const response = await fetch("/api/voto/estadisticas");
    const data = await response.json();

    setParties(data);
    setLoading(false);
  };

  useEffect(() => {
    const getAsync = async () => await fetchStatictics();
    getAsync();

    if (message === "") {
      setMessage(location.state ? location.state.message : "");
    } else {
      history.replace();
    }
  }, [location.state, history, message]);

  const renderCandidates = () => {
    return parties.map(partyCandidate => (
      <Col
        key={partyCandidate.partido._id}
        sm={12}
        md={6}
        lg={4}
        className={"mb-3"}
      >
        <CandidateCard
          id={partyCandidate.partido._id}
          candidate_name={partyCandidate.partido.nombre_candidato}
          candidate_party={partyCandidate.partido.nombre_partido}
          candidate_avatar={partyCandidate.partido.avatar_candidato}
          is_checked={false}
          is_review={false}
          is_statistics={true}
          voteStatictics={partyCandidate.porcentaje}
        />
      </Col>
    ));
  };

  // const is_vote_proccessed = localStorage.getItem("vote_proccessed");

  return (
    <div>
      <h5>Top Charts</h5>
      {message !== "" ? (
        <Alert theme={"success"} key={1}>
          <span>{message}</span>
        </Alert>
      ) : null}
      <hr />
      <div>
        <Row className="ml-auto mr-auto">
          {isLoading ? <Loading active={isLoading} /> : renderCandidates()}
        </Row>
        <hr />
      </div>
    </div>
  );
};

export default Statistics;
