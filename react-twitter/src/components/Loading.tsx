import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.span`
  font-size: clamp(1.2rem, 1.2vw, 1.6rem);
`;

export default function Loading(){
  return (
    <Wrapper>
      <Text>Loading</Text>
    </Wrapper>
  )
}