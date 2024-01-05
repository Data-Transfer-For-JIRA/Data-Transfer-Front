import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Router } from './Common/Router'
import "./App.css"

const router = createBrowserRouter(Router);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
