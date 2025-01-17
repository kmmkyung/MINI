import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { auth, storage, db } from '../firebase.ts';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import ITweet from '../components/TimeLine.tsx'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const AvatarUpload = styled.label`
  width: 80px;
  overflow: hidden;
  height: 80px;
  border-radius: 50%;
  background-color: #1d9bf0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg{
    width: 50px;
  }
`;


const AvatarImg = styled.img`
  width: 100%;
`;


const AvatarInput = styled.input`
  display: none;
`;


const Name = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  margin-top: 10px;
  text-align: center;
`;


export default function Profile(){
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [tweets, setTweets] = useState<ITweet[]>([]);

  async function onAvatarChange(event: React.ChangeEvent<HTMLInputElement>){
    const {files} = event.target
    if(!user) return;
    if(files && files.length ===1){
      const file = files[0]
      const locationRef = ref(storage, `avatar/${user?.uid}`)
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      setAvatar(avatarUrl)
      await updateProfile(user, {photoURL: avatarUrl})
    }
  }

  async function fetchTweets(){
    const tweetQuery = query(
      collection(db,'tweet'),
      where('userId','==', user?.uid),
      orderBy('createdAt','desc'),
      limit(10)
    );
    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map((doc)=>{
      const {tweet, userId, username, createdAt } = doc.data()
      return { tweet, userId, username, createdAt, id:doc.id }
    })
    setTweets(tweets);
  }

  useEffect(()=>{
    fetchTweets()
  },[])

  return (
    <Wrapper>
      <AvatarUpload htmlFor='avatar'>
        {avatar? <AvatarImg src={avatar}/> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
            </svg>}
      </AvatarUpload>
      <AvatarInput onChange={onAvatarChange} id='avatar' type='file' accept='image/*'/>
      <Name>{user?.displayName ?? "Anonymous"}</Name>
    </Wrapper>
  )
}