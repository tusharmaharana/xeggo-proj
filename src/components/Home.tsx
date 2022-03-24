import styled from "@emotion/styled";
import React from "react";
import { Button, Container, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <StyledContainer>
      <Row className="flex-column align-items-center w-100">
        <h1 className="text-center mb-3">Be a productivity master!</h1>
        <p className="text-center w-75">Add todo tasks and complete them.</p>
        <Button
          onClick={() => navigate("signup")}
          className="mt-3"
          style={{ width: "7rem" }}
        >
          Get Started
        </Button>
      </Row>

      <Image
        src="/landing.png"
        width="600"
        alt="A man drinking coffee & working"
        fluid
      />
    </StyledContainer>
  );
};

export default Home;

const StyledContainer = styled(Container)`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
