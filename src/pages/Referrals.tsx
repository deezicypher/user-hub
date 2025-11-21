import { useStateContext } from '../context/userContext'
import { User, UserContextProps } from '../types'
import { loader } from '../assets/images'

const Referrals = () => {
    //const {stats,user, isLoading} = useStateContext() as UserContextProps
    const isLoading = false
    const stats = {
      ref_e:10000
    }
    const user = {
      id:1,
      referredUsers:[
        {
          name:"Doe",
          joined:"2025-12-18"
        },
        {
          name:"Dave",
          joined:"2025-12-22"
        }
      ]
    }




  return (
    <div className='font-epilogue text-[#e7d09d] text-xl mt-10 sm:mt-5 sm:text-2xl'>Referrals
  
    <div className='flex flex-wrap mt-[20px] gap-[26px]'>
        {
          isLoading && (
            <img src={loader} alt="....."  className='w-[100px] h-[100px] object-contain'/>
          )
        }

        {!isLoading && 
            <div className='flex flex-col sm:flex-row w-full gap-[26px]'>
            <div className=' dark:bg-[#101010] bg-slate-00 h-min shadow-secondary rounded-3xl py-5 px-5 w-full lg:w-[40%]'>
            <div className='flex  flex-col sm:flex-row gap-5 '>
            
<div className='bg-[101010] w-full border border-[#4b4333]  rounded-md flex flex-col'>
<div className='flex flex-row justify-center items-center gap-2 p-5'>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6  text-[#f6b430]">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

<div className='text-sm text-center sm:text-base bg-gradient-to-r from-[#f6b430] to-[#fe9240] text-transparent bg-clip-text'>
            Earnings
        </div>
     
        </div>
        
        <div className='text-xl xl:text-2xl border  border-[#4b4333] rounded-md p-2 w-full text-center  text-[#b2a078] font-epilogue mt-2 font-semibold' >
        ${stats?.ref_e}.00
            </div>
</div>

    
<div className='bg-[101010] w-full border border-[#4b4333]  rounded-md flex flex-col'>
<div className='flex flex-row justify-center items-center gap-2 p-5'>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6  text-[#f6b430]">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
</svg>

<div className='text-sm text-center sm:text-base bg-gradient-to-r from-[#f6b430] to-[#fe9240] text-transparent bg-clip-text'>
         Your Network
        </div>
     
        </div>
        
        <div className='text-xl xl:text-2xl border  border-[#4b4333] rounded-md p-2 w-full text-center  text-[#b2a078] font-epilogue mt-2 font-semibold' >
        {user?.referredUsers?.length}
            </div>
</div>
  
    </div>
             </div>
             <div className=' lg:w-[50%]'>
             <div className=' dark:bg-[#101010] bg-slate-00 h-min shadow-secondary rounded-3xl py-5 px-5 ]'>
             <div className="mt-4 -mb-3">
    <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-[#101010]/25">
       
    <div className="relative rounded-xl border border-[#4b4333] overflow-auto"><div className="shadow-sm overflow-hidden my-8">
  <table className="border-collapse table-auto w-full text-sm">
    <thead>
      <tr>
        <th className="border-b dark:border-[#4b4333] font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Name</th>
        <th className="border-b dark:border-[#4b4333] font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Joined</th>
      </tr>
    </thead>

    <tbody className="bg-white dark:bg-[#101010]">
    {user?.referredUsers?.map((user:User) => (
      <tr>
        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{user.name}</td>

        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">{user.joined}</td>
      </tr>
    )
    )
}
    </tbody>
  </table>
</div></div><div className="absolute inset-0 pointer-events-none border border-black/5 rounded-xl dark:border-white/5"></div></div></div>
  
</div>
</div>
  
              </div>
        }
    </div>
  
    </div>
  )
}

export default Referrals