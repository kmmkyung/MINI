import React, { useState } from 'react';
import styled from 'styled-components';
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase.ts";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  border: 2px solid #fff;
  padding: 20px;
  border-radius: 20px;
  font-size: clamp(1.2rem, 1.2vw, 1.6rem);
  color: #fff;
  background-color: #000;
  width: 100%;
  resize: none;
  transition: all 0.4s;

  &:focus{
    outline: none;
    border-color: #1d9bf0;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 10px;
`;

const AttachFileButton = styled.label`
  cursor: pointer;
  font-size: clamp(1.2rem, 1.2vw, 1.4rem);
  width: 100%;
  color: #1d9bf0;
  border: 2px solid #1d9bf0;
  padding: 10px 0px;
  border-radius: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  svg{
    width: 1.2rem;
    height: 1.2rem;
    fill: #1d9bf0;
  }
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitButton = styled.input`
  width: 100%;
  background-color: #1d9bf0;
  color: #fff;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  cursor: pointer;
  font-size: clamp(1.2rem, 1.2vw, 1.4rem);


  &:hover, &:active{
    opacity: 0.8;
  }
`;

export default function PostTweetForm(){
  const [isLoading, setIsLoading] = useState(false)
  const [tweet, setTweet] = useState('');
  const [file, setFile] = useState<File|null>(null);

  function onChange(event: React.ChangeEvent<HTMLTextAreaElement>){
    setTweet(event.target.value);
  }

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>){
    const files = event.target.files;
    if(files && files.length === 1){
      setFile(files[0]);
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLTextAreaElement>){
    event.preventDefault();
    const user = auth.currentUser;
    if( !user || isLoading || tweet==='' || tweet.length > 180) return;
    try{
      setIsLoading(true)
      await addDoc(collection(db, 'tweet'),{tweet, createdAt:Date.now(), username:user.displayName||'Anonymous', userId:user.uid})
    }
    catch(event){
      console.log(event)
    }
    finally{
      setIsLoading(false)
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <TextArea value={tweet} onChange={onChange} placeholder='무슨 일이 일어나고 있나요?' rows={5} maxLength={180}></TextArea>
      <ButtonWrap>
        <AttachFileButton htmlFor='file'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" />
          </svg>
          {file ? 'Photo added':'Add photo'}
        </AttachFileButton>
        <AttachFileInput id='file' type='file' accept='image/*' onChange={onFileChange} />
        <SubmitButton type='submit' value={isLoading? 'Posting...' : '게시하기'}/>
      </ButtonWrap>
    </Form>
  )
}