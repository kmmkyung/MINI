import React, {useEffect, useState} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import styled, { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

import Layout from './components/Layout.tsx';
import Home from './routes/home.tsx';
import Profile from './routes/Profile.tsx';
import Login from './routes/Login.tsx';
import CreateAccount from './routes/CreateAccount.tsx';
import Loading from './components/Loading.tsx';
import { auth } from './firebase.ts';

const router = createBrowserRouter([
  {
    path:'/',
    element: <Layout/>,
    children: [
      {path:"", element: <Home/>},
      {path:"profile", element: <Profile/>},
    ]
  },
  {path:"/login", element: <Login/>},
  {path:"/createAccount", element: <CreateAccount/>}
])

const GlobalStyles = createGlobalStyle`
  ${reset};
  * { box-sizing: border-box; }
  body { background-color: #000; color: #fff; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto'; }
`

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  async function init(){
    await auth.authStateReady();  
    setIsLoading(false)
  }
  useEffect(()=>{
    init();
  },[])

  return (
    <Wrapper>
      <GlobalStyles/>
      { isLoading ? <Loading/> :  <RouterProvider router={router}></RouterProvider> }
    </Wrapper>
  );
}

export default App;
