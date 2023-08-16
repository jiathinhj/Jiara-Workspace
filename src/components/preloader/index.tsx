import React from "react";
import styled from "styled-components";

const Preloader = () => {
  return (
    <LoaderContainer>
      <Spinner />
    </LoaderContainer>
  );
};

const LoaderContainer = styled.div`

  width: 100vh;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  // background: rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const Spinner = styled.div`
  width: 64px;
  height: 64px;
  border: 8px solid;
  border-color: #427ac2 transparent #427ac2 transparent;
  border-radius: 50%;
  animation: spin-anim 1.2s linear infinite;
  @keyframes spin-anim {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export default Preloader;
