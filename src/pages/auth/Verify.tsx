
import  {useEffect, useState,useRef} from 'react';
import {  useNavigate } from 'react-router-dom';
import { postAPI } from '../../utils/fetchData';
import { loader,  mailr, stroke } from '../../assets/images';
import { toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';



const VerfiyEmail = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [error, setIsError] = useState<boolean>(false)
  const [msg, setMsg] = useState<string>('')
  
  
    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const requestSentRef = useRef(false);

  const getVerify =  async (token:string) => {
    if (requestSentRef.current) return; // Prevent API call if request is already sent
    requestSentRef.current = true; // Set the flag to true when the request is being sent

    setIsLoading(true)
    try{
    const res = await postAPI('users/activate',{token})
    setIsSuccess
    setMsg(res.data.msg)
    toast.success(res.data.msg,{id:"email"})
        setTimeout(() => {
            navigate('/login')
        }, 2000);
        setIsLoading(false)
   
  }catch(error:any){
    if(error.response?.data?.error){
    toast.error(error.response?.data?.error,{id:'email'});
    }else{
      toast.dismiss()
    }
    console.error('Verify Email error:', error);
    setIsError(true)
   
  }finally{
    setIsLoading(false)
  }
    }
  
    useEffect(() => {
        window.scrollTo(0, 0);
        toast.loading('Verifying Email...',{
            id:"email"
        });
        if (token) {
        getVerify(token)   
        }
    }, [token,navigate]);



  return (
    <div className="flex mt-10 items-center justify-center py-[5rem] px-4 sm:px-6 lg:px-8">
    <div className="w-full h-screen max-w-md space-y-8">
      <div>
      <div className='flex flex-col justify-center items-center'>
      <div onClick={() => navigate('/')} className='cursor-pointer'>
           
            <div
              className="mx-auto h-12 w-auto mb-10"
             
            >
              😎
              </div>
            </div>
            <img src={stroke} alt="" className='sm:max-w-[220px] max-w-[200px] mt-2 mb-10' />
<p className='text-2xl mt-5 font-poppins  font-bold   text-center sm:max-w-[700px]'>
{msg}
</p> 

<div className={`w-[50px] h-[3px] my-[20px] border-none  text-center `}/>
</div>
{isLoading && (
    <>
      <img src={loader} alt="" className='w-[100px] h-[100px] object-contain' />
      <p className='font-epilogue mt-[20px] font-bold text-[20px] text-center'>
          
      </p>
      </>
)}

 {isSuccess  && (
  <img
  className="flex mx-auto h-60 w-auto "
  src={mailr}
  alt=""
/>
 )}

  {error && (
        <div className="text-center flex flex-col items-center justify-center">

  
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-2/5 text-red-600">
  <path d="M19.5 22.5a3 3 0 0 0 3-3v-8.174l-6.879 4.022 3.485 1.876a.75.75 0 1 1-.712 1.321l-5.683-3.06a1.5 1.5 0 0 0-1.422 0l-5.683 3.06a.75.75 0 0 1-.712-1.32l3.485-1.877L1.5 11.326V19.5a3 3 0 0 0 3 3h15Z" />
  <path d="M1.5 9.589v-.745a3 3 0 0 1 1.578-2.642l7.5-4.038a3 3 0 0 1 2.844 0l7.5 4.038A3 3 0 0 1 22.5 8.844v.745l-8.426 4.926-.652-.351a3 3 0 0 0-2.844 0l-.652.351L1.5 9.589Z" />
</svg>

<p className={`font-epilogue font-normal sm:text-xl text-primary text-sm   leading-[30.8px] mb-10 p-4 md:w-4/5 mt-5 `}>
Email may be already verified or the link is broken.
  </p>


</div>
 )}
      </div>
   
    </div>
  </div>
  )
}

export default VerfiyEmail