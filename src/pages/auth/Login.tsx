import {useEffect, useState} from 'react'
import Section from '../../components/front/section'
import { useForm } from "react-hook-form"
import { grid,loader,stroke } from '../../assets/images'
import {toast} from 'react-hot-toast'
import { LoginFormData, UserContextProps } from '../../types'
import Cookies from 'js-cookie';
import { useStateContext } from '../../context/userContext'
import { Link,useNavigate } from 'react-router-dom'
import TwoFA from './TwoFA'
import { postAPI } from '../../utils/fetchData'


const Login = () => {

    const { refetchUser} = useStateContext() as UserContextProps;
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [twofa, setTwoFa] = useState<boolean>(false)
    const [msg, setMsg] = useState<string>('')

    const navigate = useNavigate()

  const { register, handleSubmit, setValue } = useForm<LoginFormData>();

  const onSubmit = async (data:LoginFormData,) => {
    setIsLoading(true)
    if (data.rememberMe) {

      localStorage.setItem('email', data.email);
      Cookies.set('password', data.password, { expires: 7 }); // Set cookie to expire in 7 days
        
    } else {
      localStorage.removeItem('username');
      Cookies.remove('password');
    }
    try {
       
      const res = await postAPI('users/login', data);
    
      if (res.data?.user?.twoFa === 1) {
        setMsg(res.data.msg)
        setTwoFa(true)
        toast.success('OTP code has been sent to your email');
        setIsLoading(false)
      } else {
        try {
          Cookies.set('user', JSON.stringify(res.data.user));
          refetchUser();
         navigate('/');
        } catch (err: any) {
          console.log(err);
          setIsLoading(false)
        }
      }
    } catch (error: any) {
      error.response?.data?.error && toast.error(error.response?.data?.error);
      setIsLoading(false)
      console.error('Login error:', error);

    }
    
  

  };

 
  /*useEffect(()=>{
    if(redirectToHome){
      navigate('/')
    }
  },[redirectToHome])*/

  useEffect(() => {
  toast.dismiss()

    const storedUsername = localStorage.getItem('username');
    const storedPassword = Cookies.get('password');

    if (storedUsername && storedPassword) {
      setValue('email', storedUsername);
      setValue('password', storedPassword);
    }
  }, [setValue])

  if(twofa === true){
    return <TwoFA msg={msg}/>
  }
  return (
    <div>
    <Section  className='relative px-4 h-screen'>


<div className="absolute z-[-5] top-0 left-0 max-w-full bg-grid">
<img
 className="w-full "
 src={grid}
 width={550}
 height={550}
 alt="Grid"
/>
</div>

<div data-aos="fade-up" data-aos-delay="400" data-aos-duration="1500" className='flex items-center flex-col'>
<div onClick={() => navigate('/')} className='cursor-pointer'>

<div
  className="flex mx-auto h-12 w-auto "
>   
              😎
              </div>
</div>
<h1  className="font-rubik font-bold text-center mt-10 text-3xl no-underline sm:text-5xl bg-gradient-to-r from-[#f6b430] to-[#fe9240] text-transparent bg-clip-text">

SIGN IN
</h1>
<img src={stroke} alt="" className='sm:max-w-[220px] max-w-[150px] mt-2 mb-10' />


</div>
   <form className="sm:mt-10 space-y-6" onSubmit={handleSubmit(onSubmit)} >
  
     <div className="-space-y-px flex flex-col  gap-5 rounded-md shadow-sm">
     
       <div >
         <label htmlFor="email-address" className="sr-only">
           Email address
         </label>
         <input
           id="email-address"
           type="email"
           autoComplete="email"
           {...register('email')}
           required
           className="relative block w-full appearance-none rounded-md border sm:min-w-[400px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
           placeholder="Email address"
         />
       </div>
       <div>
         <label htmlFor="password" className="sr-only">
           Password
         </label>
         <input
           id="password"
           type="password"
           {...register('password')}
           autoComplete="current-password"
           required
           className="relative block w-full appearance-none rounded-md border sm:min-w-[400px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
           placeholder="Password"
         />
       </div>
     </div>

     <div className="flex gap-5 items-center justify-between">
       <div className="flex items-center">
         <input
           id="remember-me"
           type="checkbox"
           {...register('rememberMe')}
           className="h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary"
         />
         <label htmlFor="remember-me" className="ml-2 block text-sm  text-slate-300">
           Remember me
         </label>
       </div>

       <div className="">
         <Link to="/forgot-password" className=" text-sm  bg-gradient-to-r from-[#f6b430] to-[#fe9240] text-transparent bg-clip-text">
           Forgot your password?
         </Link>
       </div>
     </div>

     <div>
       <button
         type="submit"
         className="group relative flex w-full justify-center rounded-md bg-gradient-to-r from-[#fe9240] to-[#f49417]  py-2 px-4 text-sm font-poppins text-white focus:outline-none "
       >
         {isLoading? (<img src={loader} alt=""  className='w-[30px] h-[30px] object-contain' />)
         :
         <>
         <span className="absolute inset-y-0 left-0 flex items-center pl-3">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
<path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" />
</svg>

         </span>
         Sign in
     </>
}
       </button>
     </div>
     <p className="mt-2 text-center text-sm text-slate-300">
       Return to {' '}
       <Link to="/signup" className="font-medium bg-gradient-to-r from-[#f6b430] to-[#fe9240] text-transparent bg-clip-text">
         Register
       </Link>
     </p>
   </form>
 </Section>
 </div>

  )
}

export default Login


