import React from 'react';
import { ITweet } from './TimeLine';
import styled from 'styled-components';
import { auth, db, storage } from '../firebase.ts';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div``;

const Username = styled.span`
  font-weight: 600;
  font-size: clamp(1.2rem, 1.2vw, 1.4rem);
`;

const Payload = styled.p`
  margin: 10px 0;
  font-size: clamp(1.4rem, 1.2vw, 1.8rem);
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: #fff;
  border: none;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
  font-size: clamp(1.2rem, 1.2vw, 1.4rem);
`;


const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

export default function Tweet({username, tweet, photo, userId, id}:ITweet){
  const user = auth.currentUser;

  async function onDelete(){
    const ok = window.confirm('삭제하시겠습니까?')
    if(!ok || user?.uid !== userId) return;
    try{
      await deleteDoc(doc(db,"tweet",id))
      if(photo) {
        const photoRef = ref(storage, `tweet/${user.uid}/${id}`)
        await deleteObject(photoRef)
      }
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <Payload>{tweet}</Payload>
        {user?.uid === userId ? <DeleteButton onClick={onDelete}>Delete</DeleteButton> : null}
      </Column>
      <Column>
        {photo? (<Photo src={photo}></Photo>) : null}
      </Column>
    </Wrapper>
  )
}