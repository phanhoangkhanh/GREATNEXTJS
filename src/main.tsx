import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";


//Nơi phẩn bổ url và component tuong ứng 
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/users",
    element: <div>USER LIST</div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
