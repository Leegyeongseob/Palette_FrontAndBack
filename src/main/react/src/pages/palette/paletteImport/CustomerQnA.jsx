import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HelpQ = styled(Link)`
  width: 18%;
  height: 70%;
  display: flex;
  align-items: center;
  border: 1px solid gray;
  justify-content: center;
  margin-left: 2%;
  text-decoration: none;
  color: #000;
  &:hover {
    font-weight: bolder;
  }
`;

const HelpQText = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  font-size: 0.75vw;
  align-items: center;
  border: none;
`;

const QnAItem = ({ q }) => {
  return (
    <>
      <HelpQ to="/customer/help">
        <HelpQText>{q}</HelpQText>
      </HelpQ>
    </>
  );
};

export default QnAItem;
