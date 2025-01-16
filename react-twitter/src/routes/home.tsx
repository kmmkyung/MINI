import React from 'react';
import PostTweetForm from '../components/PostTweetForm.tsx';
import styled from 'styled-components';

const Wrapper = styled.div`
`;

export default function Home(){

  return (
    <Wrapper>
      <PostTweetForm>
      </PostTweetForm>
    </Wrapper>
  )
}