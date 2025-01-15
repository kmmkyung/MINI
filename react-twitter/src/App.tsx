import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './components/layout';
import Home from './routes/home';
import Profile from './routes/Profile';

const router = createBrowserRouter([
  {
    path:'/',
    element: <Layout/>,
    children: [
      {path:"", element: <Home/>},
      {path:"profile", element: <Profile/>},
    ]
  }
])
function App() {
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
