import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase.ts';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { Error, Input, Switcher, Title, Wrapper, Form } from '../components/auth.ts';

export default function CreateAccount(){
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const errors = [
    {"Firebase: Error (auth/email-already-in-use)." : '이미 존재하는 이메일입니다'},
    {"Firebase: Password should be at least 6 characters (auth/weak-password)." : '비밀번호를 6자리 이상 입력해주세요'},
    {"Firebase: Error (auth/invalid-email)." : '정확한 이메일을 입력해 주세요'},
  ]

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
    setError('');
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
    catch(error) {
      if(error instanceof FirebaseError){
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
      <Title>Join 𝕏</Title>
      <Form onSubmit={onSubmit}>
        <Input name='name' value={name} placeholder='Name' type='text' required onChange={onChange}/>
        <Input name='email' value={email} placeholder='Email' type='email' required onChange={onChange}/>
        <Input name='password' value={password} placeholder='Password' type='password' required onChange={onChange}/>
        <Input type='submit' value={isLoading? 'Loading...' : 'Create Account'}/>
      </Form>
      {error !== '' ? <Error>{error}</Error> : null}
      <Switcher>
        계정이 있으세요? <Link to ="/login">Login &rarr;</Link>
      </Switcher>
    </Wrapper>
  )
}