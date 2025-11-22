import {FormEvent} from 'react'
import Section from '../../components/front/section'
import { grid,mailsent,stroke } from '../../assets/images'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import {useMutation} from 'react-query'
import {  postAPI } from '../../utils/fetchData';
import { useNavigate } from 'react-router-dom'


const EmailSent = () => {
    const userCookie = Cookies.get('regdata');
    const regdata = userCookie !== undefined && userCookie !== 'undefined' ? JSON.parse(userCookie) : {};
    const navigate = useNavigate()
    const sendMail = useMutation(async () => {
        try{
          const res = await postAPI('users/resend-email', {
          ...regdata
      })
        return res.data
      }catch(error:any){
        toast.error(error.response?.data?.error);
        throw error
       
      }
    },{
        onMutate: () => {
            toast.loading('Sending email....',{
              id: 'email'
            })
          },
            onSuccess: (data:{msg:string}) => {
              toast.success(data.msg,{
                id:"email"
              });
            },
              onError: (error: any) => {
                console.error('Resend Email error:', error);
              }
    }
    )
 

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMail.mutate()
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

Email Sent
</h1>
<img src={stroke} alt="" className='sm:max-w-[220px] max-w-[200px] mt-2 mb-10' />
<p className='text-2xl mt-5 font-poppins  font-bold   text-center sm:max-w-[700px]'>
Verification email sent! Check your inbox for an email from us and follow the prompts to verify your account.
</p> 
  
    

</div>
<img
  className="flex mx-auto h-60 w-auto "
  src={mailsent}
  alt=""
  
/>
<form className="mt-20 space-y-6" >
   <p className="mt-2 text-center text-base text-slate-400">
          Didn't get the email?
        </p>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={regdata?.email}
                  autoComplete="email"
                  required
                  readOnly
                  className="relative block w-full appearance-none sm:min-w-[400px] rounded-md  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                  placeholder="Email address"
                />
              </div>

            <div>
              <button
                onClick={(e:any) => onSubmit(e as FormEvent<HTMLFormElement>)}
                className="group relative flex w-full justify-center rounded-md  bg-gradient-to-r from-[#fe9240] to-[#f49417] py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2  focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
</svg>


                </span>
               Resend Email
              </button>
            </div>
          </form>
</Section>
</div>
  )
}

export default EmailSent