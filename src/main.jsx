import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Login from './components/shared/Login'
import Signup from './components/shared/Signup'
import Jobs from './pages/Jobs'
import Browse from './pages/Browse'
import { Toaster } from './components/ui/sonner'
import { Provider } from 'react-redux'
import { store } from './redux/Store'
import Profile from './pages/Profile'
import JobDescription from './pages/JobDescription'
import Companies from './admin/Companies'
import CreateComapny from './admin/CreateComapny'
import CompanyEdit from './admin/CompanyEdit'
import AdminJobs from './admin/AdminJobs'
import CreateAdminJobs from './admin/CreateAdminJobs'
import Applicants from './pages/Applicants'
import ProtectedRoutes from './admin/ProtectedRoutes'





const root = createRoot(document.getElementById('root'));


const allroutes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <Signup/>
  },
  {
    path: '/jobs',
    element: <Jobs/>
  },
  {
    path: '/browse',
    element: <Browse/>
  },
  {
    path: '/profile',
    element: <Profile/>
  },
  {
    path: '/description/:id',
    element: <JobDescription/>
  },

  // ---------Admin Routes--------
  {
    path: '/admin/companies',
    element: <ProtectedRoutes><Companies/></ProtectedRoutes>,
  },
  {
    path: '/admin/companies/create',
    element: <ProtectedRoutes><CreateComapny/></ProtectedRoutes>,
  },
  {
    path: '/admin/companies/:id',
    element: <ProtectedRoutes><CompanyEdit/></ProtectedRoutes>,
  },
  
  {
    path: '/admin/jobs',
    element: <ProtectedRoutes><AdminJobs/></ProtectedRoutes>,
  },

  {
    path: '/admin/jobs/create',
    element: <ProtectedRoutes><CreateAdminJobs/></ProtectedRoutes>,
  },
  {
    path: '/admin/jobs/:id',
    element: <ProtectedRoutes><CreateAdminJobs/></ProtectedRoutes>,
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: <ProtectedRoutes><Applicants/></ProtectedRoutes>,
  }


]);
root.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={allroutes} />
    </Provider>
    <Toaster />
  </StrictMode>
);


