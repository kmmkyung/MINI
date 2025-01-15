import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import styled from 'styled-components';
import { auth } from '../firebase.ts';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0;
`;

const Title = styled.h1`
  font-size: 42px;

`;

const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  `;

const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border:none;
  width: 100%;
  font-size:16px;
  transition: all 0.4s;

  &[type='submit']{
    cursor: pointer;
    &:hover{
    opacity:0.8
    }
  }
`;

const Error = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: tomato;
`;

export default function CreateAccount(){
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function onChange(event: React.ChangeEvent<HTMLInputElement>){
    const {target:{name,value}} = event;
    if(name === 'name'){
      setName(value);
    }
    else if(name === 'email'){
      setEmail(value);
    }
    else if(name === 'password'){
      setPassword(value);
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    if(isLoading || name === '' || email === '' || password === '') return;
    try {
      setIsLoading(true);
      // 1. create an account
      const credentials =  await createUserWithEmailAndPassword(auth, email, password);
      console.log(credentials.user);
      // 2. set the name of the user
      await updateProfile(credentials.user, {displayName: name})
      // 3. redirect to the home page
      navigate('/')
    }
    catch(event) {
      
    }
    finally {
      setIsLoading(true)
    }
  }
  
  return (
    <Wrapper>
      <Title>Join 𝕏</Title>
      <Form onSubmit={onSubmit}>
        <Input name='name' value={name} placeholder='Name' type='text' required onChange={onChange}/>
        <Input name='email' value={email} placeholder='Email' type='email' required onChange={onChange}/>
        <Input name='password' value={password} placeholder='Password' type='password' required onChange={onChange}/>
        <Input type='submit' value={isLoading? 'Loading...' : 'Create Account'}/>
      </Form>
    {error !== '' ? <Error>{error}</Error> : null}
    </Wrapper>
  )
}