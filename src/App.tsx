import { useEffect } from 'react'
import { Route, Routes,Navigate } from 'react-router-dom';
import Root from './layouts/root'
import 'aos/dist/aos.css';
import AOS from 'aos'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import 'react-phone-number-input/style.css'
import VerfiyEmail from './pages/auth/Verify'
import ForgotPass from './pages/auth/ForgotPass'
import ResetPass from './pages/auth/ResetPass'
import { useStateContext } from './context/userContext'
import { UserContextProps } from './types'


/*interface ProtectedRouteProps {
  children: ReactNode; // This type ensures children can be any valid React node (JSX elements, strings, numbers, etc.)
}*/

function App() {
  const {user} = useStateContext() as UserContextProps
  //const user = {id:1}
  /*const isAuthenticated = () => {
    return user // or use context or state management
  };

  // Route Guard for protected routes
  const ProtectedRoute = ({ children }:ProtectedRouteProps) => {
   
    if (!isAuthenticated()) {
      // Redirect to login if not authenticated
      return <Navigate to="/login" />;
    }
    return children;
  };

// Route Guard for unauthenticated routes
const AuthRoute = ({ children }:ProtectedRouteProps) => {
  if (isAuthenticated()) {
    // Redirect to home if already authenticated
    return <Navigate to="/" />;
  }
  return children;
};
  

  const router = createBrowserRouter([
    { 
      path: "/",
      element: <ProtectedRoute><Root/></ProtectedRoute>,
      children: [
        {
          path: "",
      element: <Home/>
        },
        {
          path: "/deposit",
      element: <Deposit/>
        },
        {
          path: "/topup",
      element: <Topup/>
        },
        {
          path: '/withdraw',
          element: <Withdraw/>
        },
        {
          path: '/ledger',
          element: <Ledger/>
        },
        {
          path: '/topups',
          element: <Topups/>
        },{
          path: '/referrals',
          element: <Referrals/>
        }
        ,{
          path: '/profile',
          element: <Profile/>
        }
      ]
    },
  
    {
      path:'/',
      element:<AuthRoute><Auth/></AuthRoute>,
      children: [
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'signup',
          element: <Signup />
        },{
          path:'/verify',
          element: <VerfiyEmail/>
        },
        {
          path:'/forgot-password',
          element: <ForgotPass/>
        }
        ,
        {
          path:'/reset-password',
          element: <ResetPass/>
        }
      ]
    }
  ]
  )
  */

  
  useEffect(() => {
    AOS.init();
  }, [])
  
  return (
  
  <div className={`flex flex-col dark`}>

    <div>
      <Root />
    </div>
 
    <div className='bg-primary h-full  w-full overflow-hidden register '> 
    <div className='cover h-full w-full overflow-hidden '>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPass />} />
      <Route path="/reset-password" element={<ResetPass />} />
      <Route path="/verify" element={<VerfiyEmail />} />
      <Route path="*" element={<Navigate to="/" />} />
 </Routes>
 </div>
 </div>


</div>
  )
}
export default App
