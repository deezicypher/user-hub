
import Section from '../../components/front/section'
import { loader,stroke } from '../../assets/images'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm,SubmitHandler } from "react-hook-form";
import PhoneInput from 'react-phone-number-input'
import { SignupFormData } from '../../types';
import { Link, useNavigate } from 'react-router-dom';
import EmailSent from './EmailSent';
import {toast} from 'react-hot-toast'
import { postAPI } from '../../utils/fetchData';
import Cookies from 'js-cookie';
import { useState } from 'react';

{/*const passMatch = (data:string) => {
    data.matches(
   '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#!@$%^&*()+=]).{8,20}$',
   `Should contains at least 8 characters and at most 20 characters\n 
   Should contains at least one digit\n 
   Should contains at least one upper case alphabet\n 
   Should contains at least one lower case alphabet\n
   Should contains at least one special character which includes !@#$%&*()+=^\n
   Should doesn't contain any white space`
 )
 } */}

const Signup = () => {
  
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [mailSent, setMailSent] = useState<boolean>(false)
  const navigate = useNavigate()

    const formSchema = yup.object().shape({
        fullname: yup.string()
        .required('Please enter your Full Name'), 
        username: yup.string()
        .required('Please enter your username'), 
        email: yup.string()
        .required('Please enter your email')
        .email('Enter a valid email address'),
        phone: yup.string().required('Please enter your phone number'),
        password: yup.string()
        .required('Please enter a password')
        .matches(/^\S*$/, 'Whitespace is not allowed')
        .min(6, 'Password must be at 6 characters long'),
        confirmpassword: yup.string()
        .required('Confirm password')
        .oneOf([yup.ref('password')], 'Passwords does not match'),
        refcode:yup.string()
      })

      const formOptions = { resolver: yupResolver(formSchema) }
      const { register, handleSubmit, formState: { errors } } = useForm(formOptions);

      const onSubmit: SubmitHandler<SignupFormData> =  async (data) => {
        setIsLoading(true)
       try {
        const res = await postAPI('users/signup', data);
        Cookies.set('regdata', JSON.stringify(res.data));
        setMailSent(true)
        setIsLoading(false)
      } catch (error: any) {
        error.response?.data?.error && toast.error(error.response?.data?.error);
        console.error('Signup error:', error);
        setIsLoading(false)
      }
      }

     

      if(mailSent === true) return (
        <EmailSent />
      )
  return (
    <div>
      
               <Section  className='relative px-4'>

     

        
  <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="1500" className='flex items-center flex-col'>
  <div onClick={() => navigate('/')} className='cursor-pointer'>
           
  <div
  className="flex mx-auto h-12 w-auto "
>   
              😎
              </div>
           </div>
<h1  className="font-rubik font-bold text-center mt-10 text-3xl no-underline sm:text-5xl bg-gradient-to-r from-[#f6b430] to-[#fe9240] text-transparent bg-clip-text">

SIGN UP
</h1>
<img src={stroke} alt="" className='sm:max-w-[220px] max-w-[150px] mt-2' />


   </div>
   <div className="flex min-h-full  items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full  space-y-8">
        
          <form className="mt-8 space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
           
            <div className="-space-y-px flex flex-col w-full  gap-5 rounded-md shadow-sm">
            <div>
                <label htmlFor="Code" className="sr-only">
                  Referral ID (optional)
                </label>
                <input
                  id="refcode"
                  type="text"
                  autoComplete="refcode"
                  {...register('refcode')}
                 className=" w-full bg-transparent  sm:w-[400px]  rounded-md border border-[#fe9240] px-3 py-2  focus:outline-none  sm:text-sm"
                  placeholder="Referral ID "
                />
              </div>
            <div>
                <label htmlFor="name" className="sr-only">
                  Full Name
                </label>
                {errors.fullname && <p className='text-red-500 text-[14px] mb-2' role="alert">{errors.fullname?.message}</p>}
               
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  {...register('fullname')}
                  required
                  className=" w-full bg-transparent sm:w-[400px]  rounded-md border border-[#fe9240] px-3 py-2  focus:outline-none  sm:text-sm"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                {errors.username && <p className='text-red-500 text-[14px] mb-2' role="alert">{errors.username?.message}</p>}
               
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  {...register('username')}
                  required
                 className=" w-full bg-transparent sm:w-[400px] rounded-md border border-[#fe9240] px-3 py-2  focus:outline-none  sm:text-sm"
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                {errors.email && <p className='text-red-500 text-[14px] mb-2' role="alert">{errors.email?.message}</p>}
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register('email')}
        
                  required
                 className=" w-full bg-transparent sm:w-[400px] rounded-md border border-[#fe9240] px-3 py-2  focus:outline-none  sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone Number
                </label>
                {errors.phone && <p className='text-red-500 text-[14px] mb-2' role="alert">{errors.phone?.message}</p>}
            {
/* eslint-disable */
// @ts-ignore
                <PhoneInput
      defaultCountry="US"
      id="phone"
      placeholder="Enter phone number"
      required
      {...register('phone')}
       className=" w-full bg-transparent sm:w-[400px] rounded-md border border-[#fe9240] px-3 py-2  focus:outline-none  sm:text-sm"
         />
/* eslint-enable */
}

              </div>
          
           
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                {errors.password && <p className='text-red-500 text-[14px] mb-2' role="alert">{errors.password?.message}</p>}
               
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  {...register('password')}
                  className=" w-full bg-transparent sm:w-[400px] rounded-md border border-[#fe9240] px-3 py-2  focus:outline-none  sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="confirmpassword" className="sr-only">
                  Confirm Password
                </label>
                {errors.confirmpassword && <p className='text-red-500 text-[14px] mb-2' role="alert">{errors.confirmpassword?.message}</p>}
               
                <input
                  id="confirmpassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  {...register('confirmpassword')}
                  className=" w-full bg-transparent sm:w-[400px] rounded-md border border-[#fe9240] px-3 py-2  focus:outline-none  sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
           

       

        

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md  bg-gradient-to-r from-[#fe9240] to-[#f49417] py-2 px-4  font-medium text-white text-base font-poppins focus:outline-none "
              >
                {isLoading? (<img src={loader} alt=""  className='w-[30px] h-[30px] object-contain' />)
                :
                <>
             
                Sign up
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" />
</svg>

                </span>
                </>
}
              </button>
            </div>

            <p className="mt-2 text-center text-sm text-slate-300">
              Return to {' '}
              <Link to="/login" className="font-medium bg-gradient-to-r from-[#f6b430] to-[#fe9240] text-transparent bg-clip-text">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
   </Section>

   
   
   </div>
  )
}

export default Signup