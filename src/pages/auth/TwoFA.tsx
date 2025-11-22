
import Section from '../../components/front/section'
import { grid,stroke,loader } from '../../assets/images'
import { useForm } from "react-hook-form";
import { useStateContext } from '../../context/userContext';
import { UserContextProps } from '../../types';
import { useNavigate } from 'react-router-dom';

const TwoFA = ({msg}:{msg:string}) => {
    const {verify2fa} = useStateContext() as UserContextProps

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate()
  
    const onSubmit = (data:any) => {
      verify2fa.mutate(data);
    };

    
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

Two Factor Authentication Code
</h1>
<img src={stroke} alt="" className='sm:max-w-[220px] max-w-[200px] mt-2 ' />
<p className='text-2xl  font-poppins  font-bold   text-center mb-10 mt-5 sm:max-w-[900px]'>
  {msg}
 </p>
<form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)} >
         
         <div className="-space-y-px flex flex-col  gap-5 rounded-md shadow-sm">
         
           <div >
             <label htmlFor="code" className="sr-only">
               Code
             </label>
             <input
               id="code"
               type="text"
               autoComplete="code"
               {...register("code")}
               required
               className="relative block w-full appearance-none sm:min-w-[400px] rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10  focus:outline-none  sm:text-sm"
               placeholder="Verification code"
             />
           </div>
         </div>


         <div>
           <button
             type="submit"
             className="group relative flex w-full justify-center rounded-md  bg-gradient-to-r from-[#f6b430] to-[#fe9240] py-2 px-4 text-sm font-medium text-white focus:outline-none "
           >
              {verify2fa.isLoading? (<img src={loader} alt=""  className='w-[30px] h-[30px] object-contain' />)
             :
             <>
             <span className="absolute inset-y-0 left-0 flex items-center pl-3">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
<path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" />
</svg>

             </span>
             </>
}
             Verify
           </button>
         </div>
       </form>
    

</div>
</Section>
    </div>
  )
}

export default TwoFA