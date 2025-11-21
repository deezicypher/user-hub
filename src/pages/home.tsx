import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import PieChart from '../components/chart/Piechart'
import { useStateContext } from '../context/userContext'
import { UserContextProps } from '../types'
import CryptoWatchlist from '../components/chart/watchlist'
import Tx from '../components/root/Tx'
import axios from 'axios'


const Home = () => {
   const user = {
    stats: {
      balance: 152000
    }
   }
  const stats = {
    balance:152000,
    total_p:500000,
    simple_active:1,
    simple_bal:52000,
    simple_e:246000,
    compound_active:1,
    compound_bal:100000,
    compound_e:254000
  }
  //const {user,stats} = useStateContext() as UserContextProps
  const navigate = useNavigate()

  const convertToBTC = async (value:number, currency:string) => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
          ids: 'bitcoin',
          vs_currencies: currency.toLowerCase(),
        },
      });
  
      const btcPrice = response.data.bitcoin[currency.toLowerCase()];
      const btcValue = value / btcPrice;

      return btcValue;
    } catch (error:any) {
      console.log('Error:', error.message);
      throw error;
    }
  }
  
  useEffect (() => {
    
     convertToBTC(user?.stats?.balance,'usd')

  }, [])


 
  return (
    <>
    <div className='flex flex-col lg:flex-row justify-between lg:gap-10 mt-10 mb-10 lg:mb-20  '>
    <div className='px-2 mt-5 w-full lg:max-w-[50%]'>
        <div className='flex flex-col  justify-between gap-2 rounded-xl bg-[#101010]  mb-10 p-3 sm:p-5'>
            <div className='flex flex-row justify-between'>
            <div className='text-sm sm:text-base xl:text-xl bg-gradient-to-r from-[#f6b430] to-[#fe9240] text-transparent bg-clip-text font-epilogue  '> Total Balance</div>
        <div className='text-xs sm:text-base  bg-gradient-to-r from-[#f6b430] to-[#fe9240] text-transparent bg-clip-text flex flex-row items-center font-epilogue cursor-pointer' onClick={() => navigate('/ledger')}> Transaction History <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 text-[#fe9240]">
  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>
</div>

            </div>
            <div className='text-lg sm:text-2xl text-white font-rubik mt-2 font-semibold'>
                 ${stats?.balance?.toLocaleString()}.00 

            </div><span className='text-green-700 font-rubik text-sm sm:text-base'>+${stats?.total_p?.toLocaleString()}.00</span>
     
            

            <div className='flex flex-row justify-between gap-5 px-2 mt-10'>
                <div className='flex flex-col justify-between gap-2 items-center cursor-pointer' onClick={()=>navigate('/deposit')} >
                <div className='bg-white rounded-md px-2 sm:py-2'>
                <svg className="w-6 sm:w-12" width="20" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.854 20.0527C13.854 21.4672 14.9478 22.6047 16.2894 22.6047H19.0311C20.1977 22.6047 21.1457 21.6131 21.1457 20.3735C21.1457 19.0464 20.5624 18.5652 19.7019 18.2589L15.3123 16.7277C14.4519 16.4214 13.8686 15.9548 13.8686 14.6131C13.8686 13.3881 14.8165 12.3818 15.9832 12.3818H18.7248C20.0665 12.3818 21.1603 13.5193 21.1603 14.9339" stroke="#f6b430" stroke-width="3.50391" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.4993 10.9375V24.0625" stroke="#f6b430" stroke-width="3.50391" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M32.0832 17.4993C32.0832 25.5493 25.5498 32.0827 17.4998 32.0827C9.44984 32.0827 2.9165 25.5493 2.9165 17.4993C2.9165 9.44935 9.44984 2.91602 17.4998 2.91602" stroke="#f6b430" stroke-width="3.50391" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M32.0831 8.74935V2.91602H26.2498" stroke="#f6b430" stroke-width="3.50391" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M24.792 10.2077L32.0837 2.91602" stroke="#f6b430" stroke-width="3.50391" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                </div>
                <div className='text-sm font-epilogue sm:text-lg'>
                    Deposit
                </div>
                </div>

                <div className='flex flex-col justify-between gap-2 items-center cursor-pointer' onClick={()=>navigate('/withdraw')}>
                <div className='bg-white rounded-md px-2 sm:py-2'>
                <svg className="w-6 sm:w-12" width="20" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.4517 20.0527C14.4517 21.4672 15.5454 22.6047 16.8871 22.6047H19.6287C20.7954 22.6047 21.7433 21.6131 21.7433 20.3735C21.7433 19.0464 21.16 18.5652 20.2996 18.2589L15.91 16.7277C15.0496 16.4214 14.4663 15.9548 14.4663 14.6131C14.4663 13.3881 15.4141 12.3818 16.5808 12.3818H19.3225C20.6642 12.3818 21.7579 13.5193 21.7579 14.9339" stroke="#f6b430" stroke-width="3.50391" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.0969 10.9375V24.0625" stroke="#f6b430" stroke-width="3.50391" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M32.6808 17.4993C32.6808 25.5493 26.1475 32.0827 18.0975 32.0827C10.0475 32.0827 3.51416 25.5493 3.51416 17.4993C3.51416 9.44935 10.0475 2.91602 18.0975 2.91602" stroke="#f6b430" stroke-width="3.50391" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M25.3896 4.375V10.2083H31.223" stroke="#f6b430" stroke-width="3.50391" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M32.6813 2.91602L25.3896 10.2077" stroke="#f6b430" stroke-width="3.50391" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                </div>
                <div className='text-sm font-epilogue sm:text-lg'>
                    Withdraw
                </div>
                </div>
                
                <div className='flex flex-col justify-between gap-2 items-center cursor-pointer' onClick={()=>navigate('/topup')}>
                <div className='bg-white rounded-md px-2 '>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 text-[#f6b430] sm:w-14">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
</svg>
      </div>
                <div className='text-sm sm:text-lg font-epilogue'>
                    Top up
                </div>
                </div>
            </div>

        </div>

<div className='flex flex-col sm:flex-row lg:flex-col xl:flex-row justify-between sm:gap-5 '>
        <div className='flex flex-col w-full justify-between gap-2 rounded-xl bg-[#101010]  mb-10 p-3 sm:p-5'>
        <div className='flex flex-row justify-between'>
        <div className=' text-sm sm:text-base xl:text-xl bg-gradient-to-r from-[#f6b430] to-[#fe9240] text-transparent bg-clip-text'>
            Simple Interest
        </div>
        {stats?.simple_active === 1?
        <div className='flex flex-row gap-2 items-center'>
<span className='text-xs sm:text-base md:text-xs xl:text-base'>Active</span> {" "}       <div className='bg-gradient-to-r from-[#28a745] to-[#28a745] rounded-full sm:p-3 p-2 ' />   
</div>
: 
<div className='flex flex-row gap-2 items-center'>
<span className='text-xs sm:text-base md:text-xs xl:text-base'>Not Active</span> {" "}       <div className='bg-gradient-to-r from-[#d6d6d6] to-[#d6d6d6] rounded-full sm:p-3 p-2 ' />   
</div>
        }

</div>
<div className='text-xl sm:text-2xl text-white font-rubik mt-2 font-semibold'>
${stats?.simple_bal?.toLocaleString()}.00
            </div>
            <div className='sm:text-base text-sm font-epilogue bg-gradient-to-r from-[#f6b430] to-[#fe9240] text-transparent bg-clip-text'>
                Earned <span className='text-green-700 font-rubik'> ${stats?.simple_e?.toLocaleString()}.00</span>
            </div>
        
        </div>
        <div className='flex flex-col w-full justify-between gap-2 rounded-xl bg-[#101010]  mb-10 p-3 sm:p-5'>
        <div className='flex flex-row justify-between items-center'>
        <div className=' text-sm sm:text-base xl:text-xl bg-gradient-to-r from-[#f6b430] to-[#fe9240] text-transparent bg-clip-text'>
            Compound Interest
        </div>
        {stats?.compound_active === 1?
        <div className='flex flex-row gap-2 items-center'>
<span className='text-xs sm:text-base md:text-xs xl:text-base'>Active</span> {" "}       <div className='bg-gradient-to-r from-[#28a745] to-[#28a745] rounded-full sm:p-3 p-2 ' />   
</div>
: 
<div className='flex flex-row gap-2 items-center'>
<span className='text-xs sm:text-base md:text-xs xl:text-base'>Not Active</span> {" "}       <div className='bg-gradient-to-r from-[#d6d6d6] to-[#d6d6d6] rounded-full sm:p-3 p-2 ' />   
</div>
        }
</div>
<div className='text-xl sm:text-2xl text-white font-rubik mt-2 font-semibold'>
${stats?.compound_bal?.toLocaleString()}.00
            </div>
            <div className='sm:text-base text-sm font-epilogue bg-gradient-to-r  from-[#f6b430] to-[#fe9240] text-transparent bg-clip-text'>
                Earned <span className='text-green-700 font-rubik'> ${stats?.compound_e?.toLocaleString()}.00</span>
            </div>
        </div>
        </div>
       {/*<div className=''>
         <div className='flex flex-col items-center sm:items-start mt-10'>
           <h3 className='sm:text-2xl text-xl   d font-[500] text-left bg-gradient-to-r from-[#f6b430] to-[#fe9240] text-transparent bg-clip-text '>Total Portfolio</h3>
           <h3 className='text-4xl text-left sm:text-left sm:text-5xl font-bold mt-5 dark:text-slate-200 text-slate-800'>$1,239,000.00</h3>
           <div className='mt-2 font-light text-base text-[#08AD40]'>
        
           </div>

<div className='flex flex-row flex-wrap mt-5 gap-5'>
    <Link to="/deposit">
        <div className='rounded-full flex flex-row items-center gap-1 bg-gradient-to-r from-[#fe9240] to-[#f49417] py-1 px-3 sm:px-5  font-medium text-white text-base'>
        <svg width="20" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.854 20.0527C13.854 21.4672 14.9478 22.6047 16.2894 22.6047H19.0311C20.1977 22.6047 21.1457 21.6131 21.1457 20.3735C21.1457 19.0464 20.5624 18.5652 19.7019 18.2589L15.3123 16.7277C14.4519 16.4214 13.8686 15.9548 13.8686 14.6131C13.8686 13.3881 14.8165 12.3818 15.9832 12.3818H18.7248C20.0665 12.3818 21.1603 13.5193 21.1603 14.9339" stroke="white" stroke-width="3.50391" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.4993 10.9375V24.0625" stroke="white" stroke-width="3.50391" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M32.0832 17.4993C32.0832 25.5493 25.5498 32.0827 17.4998 32.0827C9.44984 32.0827 2.9165 25.5493 2.9165 17.4993C2.9165 9.44935 9.44984 2.91602 17.4998 2.91602" stroke="white" stroke-width="3.50391" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M32.0831 8.74935V2.91602H26.2498" stroke="white" stroke-width="3.50391" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M24.792 10.2077L32.0837 2.91602" stroke="white" stroke-width="3.50391" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            Deposit
        </div>
    </Link>
    <Link to="/deposit">
        <div className='rounded-full flex flex-row items-center gap-1 bg-gradient-to-r from-[#fe9240] to-[#f49417] py-1 px-3 sm:px-5  font-medium text-white text-base'>
        <svg width="20" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.4517 20.0527C14.4517 21.4672 15.5454 22.6047 16.8871 22.6047H19.6287C20.7954 22.6047 21.7433 21.6131 21.7433 20.3735C21.7433 19.0464 21.16 18.5652 20.2996 18.2589L15.91 16.7277C15.0496 16.4214 14.4663 15.9548 14.4663 14.6131C14.4663 13.3881 15.4141 12.3818 16.5808 12.3818H19.3225C20.6642 12.3818 21.7579 13.5193 21.7579 14.9339" stroke="white" stroke-width="3.50391" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.0969 10.9375V24.0625" stroke="white" stroke-width="3.50391" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M32.6808 17.4993C32.6808 25.5493 26.1475 32.0827 18.0975 32.0827C10.0475 32.0827 3.51416 25.5493 3.51416 17.4993C3.51416 9.44935 10.0475 2.91602 18.0975 2.91602" stroke="white" stroke-width="3.50391" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M25.3896 4.375V10.2083H31.223" stroke="white" stroke-width="3.50391" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M32.6813 2.91602L25.3896 10.2077" stroke="white" stroke-width="3.50391" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            Withdraw
        </div>
    </Link>
</div>
           </div>
 
           </div>*/}


       </div>
 <div className='min-w-[40%] py-5 '>
<h3 className='text-3xl  text-gray-600 dark:text-gray-300 font-[500] mb-5 sm:mb-10'>Portfolio Overview</h3>
       <div className='dark:bg-[#121216] w-full bg-slate-00 shadow-secondary rounded-3xl py-5 px-5 '>
      
       <PieChart/>
       </div>

   </div>
 
   </div>
  
   <div className='flex flex-col lg:flex-row justify-between  lg:gap-10 items-start'>
            <CryptoWatchlist/>
            <Tx/>          
          </div>
   </>
  )
}

export default Home