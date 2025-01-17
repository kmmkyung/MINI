import { collection, getDocs, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase.ts";
import Tweet from "./Tweet.tsx";
import { Unsubscribe } from "firebase/auth";

export interface ITweet {
  id:string;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  overflow-y: scroll;
`;

export default function TimeLine(){
  const [tweets, setTweets] = useState<ITweet[]>([]);

  useEffect(()=>{
    let unsubscribe:Unsubscribe | null = null;
    async function fetchTweets(){
      const tweetsQuery = query(collection(db,"tweet"), orderBy('createdAt','desc'), limit(25));
      // const snapshot = await getDocs(tweetsQuery)
      // const tweet = snapshot.docs.map((doc)=>{
      //   const {tweet, userId, username, createdAt } = doc.data()
      //   return { tweet, userId, username, createdAt, id:doc.id }
      // })
  
      unsubscribe = await onSnapshot(tweetsQuery, (snapshot)=>{
        const tweets = snapshot.docs.map((doc)=>{
          const {tweet, userId, username, createdAt } = doc.data()
          return { tweet, userId, username, createdAt, id:doc.id }
        })
        setTweets(tweets);
      })
    }
    fetchTweets()
    return () => {
      unsubscribe && unsubscribe()
    }
  },[])

  return (
    <Wrapper>
      {tweets.map(tweet => <Tweet key={tweet.id} {...tweet}></Tweet>)}
    </Wrapper>
  )
}