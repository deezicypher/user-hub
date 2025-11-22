import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useForm } from'react-hook-form';
import toast from 'react-hot-toast';
import {  useNavigate } from 'react-router-dom';
import { postAPI } from '../../utils/fetchData';
import { grid, loader, stroke } from '../../assets/images';
import { useLocation } from 'react-router-dom';
import {  useMutation } from 'react-query';
import Section from '../../components/front/section';

interface ResetPassProps {
    password:string,
    password2:string
}

const ResetPass = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');


    const navigate = useNavigate();
  

    const formSchema = yup.object().shape({
        password: yup.string()
        .required('Please enter a password')
        .matches(/^\S*$/, 'Whitespace is not allowed')
        .min(6, 'Password must be at 6 characters long'),
        password2: yup.string()
        .required('Confirm password')
        .oneOf([yup.ref('password')], 'Passwords does not match'),
      }) 

      const formOptions = { resolver: yupResolver(formSchema) }
      const { register, handleSubmit, formState: { errors } } = useForm(formOptions);

      const resetPass = useMutation(
        async (data:ResetPassProps) => {
          const { password } = data;
          try{
          const res = await postAPI('users/reset-password', {
            password: password,
            token: token,
          });
          return res.data;
        }catch(error:any){
          toast.error(error.response?.data?.error);
          console.error('Reset Pass error:', error);
        }
        },
        {
          onMutate: () => {
            toast.loading('Resetting...', {
              id: 'reset',
            });
          },
          onSuccess: (data) => {
            toast.success(data.msg, {
              id: 'reset',
            });
            setTimeout(() => {
              toast.loading('Redirecting to login...', {
                id: 'reset',
              });
              setTimeout(() => {
                navigate('/login');
              }, 2000);
            }, 2000);
          },
          onError: (error) => {
              console.log(error)
          },
        }
      );
      

      const onSubmit = async (data:ResetPassProps) => {
        resetPass.mutate(data)
    }


  return (
    <div>
    <Section  className='relative px-4'>


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
Reset Password
</h1>
<img src={stroke} alt="" className='sm:max-w-[220px] max-w-[200px] mt-4 mb-10' />
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="-space-y-px flex flex-col  gap-5 rounded-md shadow-sm">
       
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
                  className="relative block w-full appearance-none sm:min-w-[400px] rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10  focus:outline-none  sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="password2" className="sr-only">
                  Confirm Password
                </label>
                {errors.password2 && <p className='text-red-500 text-[14px] mb-2' role="alert">{errors.password2?.message}</p>}
               
                <input
                  id="password2"
                  type="password"
                  autoComplete="current-password"
                  required
                  {...register('password2')}
                  className="relative block w-full appearance-none sm:min-w-[400px] rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10  focus:outline-none  sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
        </div>


        <div>
          <button
            type="submit"
            className="group relative flex w-full sm:min-w-[400px] justify-center bg-gradient-to-r from-[#fe9240] to-[#f49417]  py-2 px-4 text-sm font-medium text-white focus:outline-none rounded-md"
          >
              {resetPass.isLoading? (<img src={loader} alt=""  className='w-[30px] h-[30px] object-contain' />)
                :
                <>
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 01-1.5 0V6.75a3.75 3.75 0 10-7.5 0v3a3 3 0 013 3v6.75a3 3 0 01-3 3H3.75a3 3 0 01-3-3v-6.75a3 3 0 013-3h9v-3c0-2.9 2.35-5.25 5.25-5.25z" />
</svg>
            </span>
            </>}
            Reset Password
          </button>
        </div>
      </form>
    </Section>
  </div>
  )
}

export default ResetPass