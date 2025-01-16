import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useRef } from 'react';
import styled from 'styled-components'
import { auth } from '../firebase.ts';
import { useNavigate } from 'react-router-dom';

const Wrapper  = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: min(10vw, 40px);
`;

const Button = styled.span`
  background-color: #fff;
  font-weight: 500;
  width: 100%;
  color: #000;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: clamp(1.2rem, 1.2vw, 1.4rem);
`;

const Logo = styled.img`
  height: 25px;
`;

export default function LoginGithub(){
  const navigate = useNavigate()
  const googleRef = useRef(null);
  const githubRef = useRef(null);
  
  const onClick = async(event) => {
    try{
      const gitProvider = new GithubAuthProvider();
      const googleProvider = new GoogleAuthProvider();
      if(event.currentTarget === githubRef.current){
        await signInWithPopup(auth,gitProvider)
      }
      else if(event.currentTarget === googleRef.current){
        await signInWithPopup(auth,googleProvider)
      }
      navigate('/')
    }
    catch(error){
      console.error(error)
    }
  }
  return (
    <Wrapper>
      <Button onClick={onClick} ref={googleRef}>
        <Logo src='/svg/google-logo.svg'/>
        Google Login
      </Button>
      <Button onClick={onClick} ref={githubRef}>
        <Logo src='/svg/github-logo.svg'/>
        Github Login
      </Button>
    </Wrapper>
  )
}