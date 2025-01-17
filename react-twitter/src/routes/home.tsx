import React from 'react';
import styled from 'styled-components';
import PostTweetForm from '../components/PostTweetForm.tsx';
import TimeLine from '../components/TimeLine.tsx';

const Wrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-rows: 1fr 5fr;
`;

export default function Home(){

  return (
    <Wrapper>
      <PostTweetForm/>
      <TimeLine/>
    </Wrapper>
  )
}