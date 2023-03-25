import React from 'react';
import styled from 'styled-components';

export default function Loading() {
    return (
        <LoadingContainer>
         <div></div>
        </LoadingContainer>
    );
  }

  const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  div {
  width: 10px;
  height: 10px;
  border-radius: 8px;
  background-color: #47a7ff44;

  
  .loader div
  height: 100%;
  width: 100%;
  border-radius: 8px;
  background-color: #47a7ff;
  animation: width7435 5s linear infinite;
  transition: all;
  }
  @keyframes width7435 {
    from {
      /*width: 0;*/
      transform: scaleX(0);
    }
  
    to {
      transform: scaleX(1);
    }
  }
  @keyframes width7435 {
    from {
      /*width: 0;*/
      transform: scaleX(0);
    }
  
    to {
      transform: scaleX(1);
    }
  }
  `
  

