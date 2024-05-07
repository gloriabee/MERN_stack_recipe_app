import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import RecipeForm from './pages/RecipeForm.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element:<App />,
    children:[
      {
        path:'/',
        element: <Home/>
      },
      {
        path:'/about',
        element: <About/>
      },
      {
        path:'/contact',
        element: <Contact/>
      },
      {
        path:'/recipes/create',
        element: <RecipeForm/>
      },
      {
        path:'/recipes/edit/:id',
        element: <RecipeForm/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
