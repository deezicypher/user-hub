import React,{ createContext, useEffect, useContext, useState } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { useQuery, useMutation, QueryClient } from 'react-query';
import { getAPI, postAPI } from '../utils/fetchData';
import { LoginFormData, SignupFormData, UserContextProps } from "../types";
import {toast} from 'react-hot-toast'
import { Navigate} from 'react-router-dom';




const queryClient = new QueryClient(
  {
     defaultOptions:{
        queries:{
           refetchOnMount:true,
           refetchOnWindowFocus: false,
        }
     }
  }
)

const StateContext = createContext<UserContextProps | undefined>(undefined)

export const StateContextProvider = ({children}:{children:React.ReactNode}) => {
  
  const [redirectToHome, setRedirectToHome] = useState<boolean>(false);


  const userCookie = Cookies.get('user');
  const parsedUser = userCookie ? JSON.parse(userCookie) : null;
const userIsLoggedIn = !!parsedUser?.id



const { data: user, refetch: refetchUser, isLoading: userLoading } = useQuery(
  'user',
  async () => {
    
    const res = await getAPI('/profile-api');
    Cookies.set('user', JSON.stringify(res.data));
    return res.data;
  },{enabled:userIsLoggedIn}
);

  

    // Fetch stats data using react-query
    const { data: stats,isLoading } = useQuery('stats', async () => {
      try{
        const res = await getAPI('/user-stat-api');
      return res.data;
       }catch(error:any){
        error.response?.data?.error && toast.error(error.response?.data?.error);
        throw error
      }
    },{
      enabled: !!user, // Only enable the query when a user is present (logged in)
    });

  const login = useMutation(
    async (data: LoginFormData) => {
      try {
       
        const res = await postAPI('/login-api', data);
        return res.data;
      } catch (error: any) {
        error.response?.data?.error && toast.error(error.response?.data?.error);
        console.error('Login error:', error);
      }
    },
    {
      onSuccess: async (data: any) => {

        if (data?.twofa === true) {
          toast.success('OTP code has been sent to your email');
        } else {
          try {
            Cookies.set('user', JSON.stringify(data.user));
           //await refetchUser();
           setRedirectToHome(true);
          } catch (err: any) {
            console.log(err);
          }
        }
      },
      onError: (error: any) => {
        console.error('Login error:', error);
      },
    },
  );

  const signup = useMutation(
    async (data: SignupFormData) => {
      try {
        const response = await postAPI('/signup-api', data);
        return response.data;
      } catch (error: any) {
        error.response?.data?.error && toast.error(error.response?.data?.error);
        throw error;
      }
    },
    {
      onSuccess: (data: any) => {
        Cookies.set('regdata', JSON.stringify(data));
      },
      onError: (error: any) => {
        console.error('Signup error:', error);
      },
    }
  );

  const verify2fa  = useMutation(async (data:{code:string}) => {
    try{
     const res = await postAPI('/verify-2fa-api', data)
    return res.data
   }catch(error:any){
     error.response?.data?.error && toast.error(error.response?.data?.error);
      throw error
   }
 },{
   onSuccess: async (data:any) => {
     try{
     Cookies.set('user',JSON.stringify(data.user))
     await refetchUser();
     toast.success(data.msg)
     return <Navigate to="/" />;
 
     }catch(err){
       console.log(err)
     }
   } ,
   onError: (error) => {
     console.error('2FA error:', error); 
   }
 })


  const logout = async () => {

    queryClient.removeQueries({ queryKey:"user", exact: true })
     Cookies.remove('tfa');
     Cookies.remove('user')
     Cookies.remove('accesstoken')
     Cookies.remove('lastVisitedURL')
    window.location.href="/login"
  };


const authCheckState = () => {
  const storedToken = Cookies.get('accesstoken'); // Retrieve the token from cookies
  if (storedToken) {
    const token = JSON.parse(storedToken)
    //@ts-ignore
    const decodedToken: { exp: number } = jwtDecode(token);
    if (decodedToken.exp < Date.now() / 1000) {
      logout();
    }
  }
};

useEffect(() => {
  authCheckState();
}, []);

  return (

    <StateContext.Provider 
      value = {{
        signup: signup || null,
        login,
        user,
        userLoading,
        verify2fa,
        stats,
        isLoading,
        refetchUser,
        logout,
        redirectToHome
      }}>
      {children}
    </StateContext.Provider>
  )

}

export const useStateContext = () => useContext(StateContext)