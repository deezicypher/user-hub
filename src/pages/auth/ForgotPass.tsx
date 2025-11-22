import  { useState } from 'react';
import toast from 'react-hot-toast';
import { postAPI } from '../../utils/fetchData';
import {  stroke } from '../../assets/images';
import {useMutation} from 'react-query';
import { grid } from '../../assets/images';
import Section from '../../components/front/section';
import { useNavigate } from 'react-router-dom';


const ForgotPass = () => {
      const [email, setEmail] = useState<string>('');
      const navigate = useNavigate()
      const sendPass = useMutation(
        async () => {
          try {
            const res = await postAPI('users/forgot-password', { email });
            return res.data;
          } catch (error:any) {
            toast.error(error.response?.data?.error, { id: "fpass" });
            throw error; // Re-throw the error to allow for proper error handling
          }
        },
        {
          onMutate: () => {
            toast.loading("Submitting...", { id: "fpass" });
          },
          onSuccess: (data) => {
            toast.success(data.msg, { id: "fpass" });
          },
          onError: (error) => {
            console.error('Forgot Pass error:', error);

          },
        }
      );
      
      

      const onSubmit = async (e:any) => {  
       e.preventDefault()  
       sendPass.mutate()
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
  className="flex mx-auto h-12 w-auto ">
    😎
    </div>
</div>
<h1  className="font-rubik font-bold text-center mt-10 text-3xl no-underline sm:text-5xl bg-gradient-to-r from-[#f6b430] to-[#fe9240] text-transparent bg-clip-text">
Forgot Password
</h1>
<img src={stroke} alt="" className='sm:max-w-[220px] max-w-[200px] mt-4 mb-10' />
      </div>
      <form className="mt-8 space-y-6" >
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="-space-y-px flex flex-col  gap-5 rounded-md shadow-sm">
        <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none  sm:min-w-[400px] rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10  focus:outline-none  sm:text-sm"
                  placeholder="Email address"
                />
              </div>
        </div>

        <div>
          <button
            onClick={e => onSubmit(e)}
            className="group relative flex w-full justify-center rounded-md bg-gradient-to-r from-[#fe9240] to-[#f49417]  py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2  focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
  
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 01-1.5 0V6.75a3.75 3.75 0 10-7.5 0v3a3 3 0 013 3v6.75a3 3 0 01-3 3H3.75a3 3 0 01-3-3v-6.75a3 3 0 013-3h9v-3c0-2.9 2.35-5.25 5.25-5.25z" />
</svg>

            </span>
            Submit
          </button>
        </div>
      </form>
      </Section>
      </div>
  
  )
}

export default ForgotPass