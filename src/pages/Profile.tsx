import React,{useState} from 'react'
import CustomButton from '../components/CustomButton';
import { patchAPI, postAPI } from '../utils/fetchData';
import { toast } from 'react-hot-toast';
import moment from 'moment';
import { useStateContext } from '../context/userContext';
import {useMutation} from 'react-query'
import { UserContextProps } from '../types';
import FormField from '../components/FormField';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';


interface IDProps{
    id:number;
    name:string;
}

interface ForgotPasswordResponse {
    msg: string; // assuming the API response contains a msg field
    // Add other fields if necessary
  }
  
  interface ErrorResponse {
    response: {
      data: {
        error: string; // The error message in case of failure
      };
    };
}

const Profile = () => {
    //const {user, userLoading, refetchUser} = useStateContext() as UserContextProps
    const user = {
      id:1,
      username:"Deezi",
      fullname:"Deezi",
      email:"Deezi@email.com",
      phone:"12345678910",
      dob:"2025-11-22",
      twoFA:0,
      referralCode:"1knkaa",
      IDstatus:"NOTSUBMITTED",
      IDverified:false,
      IDnumber:"4723hy7292",
      card:null
    }
    const userLoading = false
    const cards : IDProps[] = [
      {id:1,name:"Driver's Licence"},
      {id:2,name:"National ID card"},
    ]
  
  
    
    const [selectedCard, setSelectedCard] = useState(cards[0])
    const [showCard, setShowCard] = useState(false)
  
    const [form, setForm] = useState({
      username:"",
      fullname:"",
      email:"",
      phone:"",
      referralcode:"",
      dob:"",
      IDnumber:"",
      IDimage: "",
    });
  
    const handleSelectCard = (card:IDProps) => {
      setSelectedCard(card)
      setShowCard(false)
    }
  
    const [vform, setVForm] = useState({
      IDnumber:"",
      IDimage: "",
    });
  
  
    const resetPassword = useMutation<
    ForgotPasswordResponse, // The response type
    ErrorResponse,          // The error type
    string                  // The type of the variable passed (email in this case)
  >(
    // Mutation function: accepts an email and returns a Promise

    async (email: string) => {
      try {
        const res = await postAPI('/forgot-password-api', { email });
        return res.data; // This should match the `ForgotPasswordResponse` type
      } catch (err: any) {
        // Handle error if needed
        if (err?.response?.data?.error) {
          toast.error(err.response.data.error, { id: 'email' });
        }
        throw err; // Rethrow error to allow handling in onError
      }
    },
    {
      onMutate: () => {
        toast.loading('Submitting...', {
          id: 'email',
        });
      },
      onSuccess: (data: ForgotPasswordResponse) => {
        toast.success(data.msg, {
          id: 'email',
        });
      },
      onError: (err: ErrorResponse) => {
        if (err?.response?.data?.error) {
          toast.error(err.response.data.error, { id: 'email' });
        }
      },
    }
  );
  
    const handleResetPassword =  async (email:string) => {  
  
   resetPassword.mutate(email)
  
    }
  
    const updateVID = useMutation(async () => {
      const card = selectedCard?.name
      const {
         IDimage, IDnumber
      } = vform;
  
  
      const formData = new FormData()
      formData.append('card', card)
      formData.append('IDimage', IDimage)
      formData.append('IDnumber', IDnumber)
  
  try{
     const res =  await patchAPI('/uploadID-api', formData)   
     return res.data    
     
  }catch(err:any){
    toast.error(err.response.data.error)
  }  
    } , {
    onSuccess: (data) => {
    toast.success(data.msg)
    window.scrollTo(0, 0)
  
  }
  }) 
    const handleSubmitV = async () => {
     updateVID.mutate()
    }
  
    const uploadImage = async (options:any) => {
      const { onSuccess, file } = options;
      setVForm(prev => ({...prev, IDimage:file}));
      onSuccess("Ok");
    };
  
    const enable2fa = useMutation(async () => {
      try{
        const res = await postAPI('/enable-2fa-api', {id:user?.id})
        return res.data
        
      }catch(err:any){
        toast.error(err.response.data.error)
      }
    },{
      onSuccess: async (data) => {
        //refetchUser()
        toast.success(data.msg)
      }
    })
  
    const disable2fa = useMutation(async () => {
      try{
        const res = await postAPI('users/disable-2fa', {id:user?.id})
        return res.data
        
      }catch (err:any){
        toast.error(err.response.data.error)
      }
    },{
      onSuccess: async (data) => {
        //refetchUser()
        toast.success(data.msg)
      }
    })
    const toggleButton = async () => {
  
      if(user?.twoFA === 0){
          enable2fa.mutate()
      }else{
          disable2fa.mutate()
      }
      
    };
  
  
  
  
    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      const {
        fullname, phone, referralcode,dob
      } = form;
  
      const user = {
        fullname, phone, referralcode,dob
      }
  
  
  try{
     const res =  await patchAPI('/update-user-api', user)       
     window.scrollTo(0, 0)
     toast.success(res.data.msg)
  }catch(err:any){
    console.log(err)
    toast.error(err.response.data.error)
  }  
    }
  
  const filteredCardOptions = cards.filter(option => option.id !== selectedCard.id)
   
    const handleForm = (fieldName:string, e:React.FormEvent<HTMLInputElement| HTMLTextAreaElement>) => {
      setForm({...form, [fieldName]: e.currentTarget.value})
    
    }
  

  return (

          <div className='sm:dark:bg-[#101010] sm:bg-white mb-10 w-full flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 '>
    <div className=' sm:-8 sm:p-4 dark:bg-[#101010] border border-[#4b4333] p-4 rounded-md sm:bg-slate-100 min-h-screen flex flex-col'>
    {userLoading && 'Loader....' }
    <div className="flex flex-col justify-center items-center p-[16px]  bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold text-base sm:text-[25px] text-[18px] leading-[38px] text-slate-100">Personal Information</h1>
        <span className='text-[#808191] text-xs sm:mt-2' >We try to remain non-custodial as possible, meaning little to no data collection, as it gives us an edge when dealing with Governments </span>
      </div>

      <form onSubmit={handleUpdateProfile} className=" mt-[65px] flex flex-col gap-[30px]">
        <div className='flex flex-wrap  gap-[40px]'>
            
          <FormField
                              labelName="Username"
                              placeholder={`${user?.username}`}
                              inputType="text"
                              disabled={true}
                              defaultValue={user?.username}
                              handleChange={(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => handleForm('username',e)} 
                              
                              required={false}          
                            />
          <FormField
          labelName="Full Name"
          placeholder={`${user?.fullname}`}
          inputType="text"
          defaultValue={user?.fullname}
          handleChange={(e:React.FormEvent<HTMLInputElement| HTMLTextAreaElement>) => handleForm('fullname', e)}
          
                              required={false} 
          />
          
        </div>
   
        <div className='flex flex-wrap  gap-[40px]'>
        <FormField
          labelName="Email"
          placeholder={`${user?.email}`}
          inputType="text"
          defaultValue={user?.email}
          handleChange={(e:React.FormEvent<HTMLInputElement| HTMLTextAreaElement>) => handleForm('email', e)}
          
        required={false} 
          />
          <FormField
          labelName="Phone Number"
          placeholder={`${user?.phone}`}
          inputType="text"
          defaultValue={user?.phone}
          handleChange={(e:React.FormEvent<HTMLInputElement| HTMLTextAreaElement>) => handleForm('phone', e)}
          
                              required={false} 
          />
          
          
        </div>

   
        <div className='flex flex-wrap  gap-[40px]'>
        <FormField
          labelName={`DOB - ${moment(user?.dob).format("MM-DD-YYYY")}` }
          placeholder="Date of Birth"
          inputType="date"
         defaultValue={moment(user?.dob).format("MM-DD-YYYY")}
          handleChange={(e:React.FormEvent<HTMLInputElement| HTMLTextAreaElement>) => handleForm('dob', e)}
          
                              required={false} 
          />
         <label className='flex-1 w-full flex flex-col'> 
 <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#4b5264] dark:text-white">
               Referral ID
            </span>
              <div className="flex justify-between items-center py-[15px]  sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] 
                bg-transparent text-white
                rounded-[10px] sm:min-w-[300px]"
                >
                  <div className='font-epilogue text-[#4b5264] dark:text-white text-[14px] '>{user?.referralCode}</div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
</svg>

                </div>
                </label>
          
           <div className='flex justify-center items-center mt-[20px]'>
            
        <CustomButton 
          btnType="submit"
          title="Save"
          styles="bg-[#e47724]"
          />
      </div> 
     
        </div>
        <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-slate-100">Login Information</h1>
      </div>
     
      <div className='flex flex-col gap-5'>
        <div className='flex justify-between'>
          <div className='text-slate-700
           dark:text-slate-300'>Email </div>
        <div className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191]">{user?.email}</div>
        </div>
        <div className='flex justify-between items-center'>
          <div className='text-slate-700
           dark:text-slate-300'>Password </div>
        <div className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191]">
   
            <CustomButton btnType="button" handleClick={() => handleResetPassword(user?.email) }  title="Reset Password" styles="bg-[#e47724] text-sm py-0" /> </div>
        </div>
      </div>

  
      
 

      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-slate-100">Two Factor Authentication</h1>
      </div>
      <div className='flex flex-col gap-5'>
        <div className='flex justify-between items-start'>
        <div className="sm:max-w-[80%]  font-epilogue font-medium text-[14px] leading-[22px] text-[#808191]">
          <h3 className="dark:text-slate-300 text-slate-700">Enable Two Factor Authentication</h3>
          <span className="text-xs sm:text-base">
          Use two factor authentication for an extra security step when performing certain actions
          </span>
        </div>
 
        <div
      className={`flex pl-2 pr-10 py-1 rounded-xl focus:outline-none ${
        user?.twoFA === 1 ? 'bg-green-500' : 'bg-gray-300'
      }`}
      onClick={toggleButton}
    >
  
      <span
        className={`inline-block w-6 h-6 rounded-full ${
          user?.twoFA === 1 ? 'bg-white transform translate-x-full' : 'bg-gray-400'
        }`}
      ></span>
    </div>
        </div>
    
      </div>

      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-slate-100">ID verification</h1>
   

      </div>

      <div className='flex flex-col gap-5'>
        <div className='flex gap-2 sm:px-4 border-[1px] border-[#4b4333] sm:p-6 p-4 rounded-xl justify-between items-start'>
        <div className="sm:max-w-[80%]  font-epilogue font-medium text-[14px] leading-[22px] text-[#808191]">
        <h3 className="dark:text-slate-300 text-slate-700"> Verify your account to unlock various features on UserHub</h3>
          <span className="text-xs sm:text-base">
          Verify your account by providing a government issued ID. This usually takes about 5 minutes.
          </span>
        </div>
        {user?.IDstatus === "APPROVED"?
        <div className='flex  rounded-full bg-[#1dc071]  w-max  p-1'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
</svg>
</div>
:
<div className='flex  rounded-full bg-[#808191]  w-max  p-1'>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
</svg>
</div>
}
        </div>
     

        {user?.IDstatus === "SUBMITTED" && (
        <div className='flex sm:px-5 justify-between items-start'>
        <div className="flex justify-content gap-5 font-epilogue font-medium text-[14px] leading-[22px] text-[#808191]">
          {user?.IDverified === true?
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#1dc071" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
</svg>
:
<div className='flex justify-center gap-2'>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#808191" className="w-5 h-5">
<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
</svg>
Pending -
</div>
          }

          <span className="text-xs sm:text-base">
         {user?.card}
          </span>
        </div>

        </div>
        )
        }
    
      </div>
  {user?.IDstatus === "NOTSUBMITTED" && (
    <>
        <div className="sm:max-w-[70%]  font-epilogue font-medium text-[14px] leading-[22px] text-slate-300">
        <div className='flex flex-col mt-5 mb-5'>
    <p className='font-epilogue font-normal text-[16px] text-slate-300'>Select Identity Card</p>
        <div className='flex dark:bg-[#3a3a43] bg-[#EAEDFD] p-2 rounded-lg mt-2 w-[] items-center justify-between' onClick={() => setShowCard(!showCard)}>
        <div className='flex items-center'>

<div className='ml-2 '>
    {selectedCard?.name}
</div>
</div>
<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.81296 5.657L0 1.414L1.60507 0L4.81296 2.829L8.02084 0L9.62591 1.414L4.81296 5.657Z" fill="#252525"/>
</svg>

        </div>
       
{showCard && filteredCardOptions?.map(card => (
  <div className='bg-slate-50 p-2  w-full'>
  <div className='flex  p-2 rounded-lg items-center justify-between' onClick={() => handleSelectCard(card)}>
  <div className='flex items-center'>
<div className='ml-2 '>
{card.name}
</div>
</div>
</div>

  </div>

))
      
}

    </div>
    <label className='flex-1 w-full flex flex-col'>
    <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191]">
                ID Number
            </span>
    <input 
                type="number"
                placeholder={user?.IDnumber}
                value={vform.IDnumber || ''}
                className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#4b4333]
                bg-transparent font-epilogue text-white text-[14px]
                placeholder:text-[#4b5264] rounded-[10px]  sm:min-w-[300px]"
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                  const newValue = e.currentTarget.value
                  setVForm(prev => ({...prev, IDnumber:newValue === '' ? '' :newValue }))
                }
                }
                />

</label>
           <div className='flex flex-col mt-5 mb-5'>
            
           <Upload
      listType="picture"
      customRequest={uploadImage}
    >
      <Button icon={<UploadOutlined />} className='text-[#808191]' >Upload</Button>
    </Upload>
           </div>
           <div className='flex flex-col mt-5 mb-5'>
           <CustomButton 
          btnType="button"
          title="Save"
          styles="bg-[#e47724]"
          handleClick={() => handleSubmitV()}
          />
          </div>

 
    </div>
  </>
  )}


  </form>
      </div>
    </div>

  )
}

export default Profile