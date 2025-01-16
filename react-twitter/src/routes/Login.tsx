import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.ts';
import { Error, Input, Switcher, Title, Wrapper, Form } from '../components/auth.ts';
import LoginGithub from '../components/LoginButton.tsx';

export default function Login(){
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const errors = [
    {"Firebase: Error (auth/invalid-credential)." : '이메일 / 비밀번호를 확인해주세요'}
  ]

  function onChange(event: React.ChangeEvent<HTMLInputElement>){
    const {target:{name,value}} = event;
      if(name === 'email'){
      setEmail(value);
    }
    else if(name === 'password'){
      setPassword(value);
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    setError('');
    if(isLoading ||  email === '' || password === '') return;
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/')
    }
    catch(error) {
      if(error instanceof FirebaseError){
        console.log(error.message)
        const findError = errors.find(err => Object.keys(err)[0] === error.message);
        if (findError) {
          setError(Object.values(findError)[0]);
        }
        setIsLoading(false)
      }
    }
  }
  
  return (
    <Wrapper>
      <Title>Login 𝕏</Title>
      <Form onSubmit={onSubmit}>
        <Input name='email' value={email} placeholder='Email' type='email' required onChange={onChange}/>
        <Input name='password' value={password} placeholder='Password' type='password' required onChange={onChange}/>
        <Input type='submit' value={isLoading? 'Loading...' : 'Log in'}/>
      </Form>
      {error !== '' ? <Error>{error}</Error> : null}
      <Switcher>
        계정이 없으세요? <Link to ="/createAccount">Create one &rarr;</Link>
      </Switcher>
      <LoginGithub/>
    </Wrapper>
  )
}