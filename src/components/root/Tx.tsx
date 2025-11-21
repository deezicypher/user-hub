
import moment, { duration } from "moment"
import { useStateContext } from "../../context/userContext"
import { UserContextProps } from "../../types"


const Tx = () => {
  const {user} = useStateContext() as UserContextProps

  const transactions = [
    {
      type: "DEPOSIT",
      method:"BITCOIN",
      amount: 100000,
      amountcrypto:0.000012,
      status:"APPROVED",
      createdAt:"2024-12-09 22:43:19.838",
      txid:"L-wY7cQ5_m4iqc0qcF1bD",
      address:"1xdknwknknkqq",
      duration:6,
      plan:"COMPOUND_INTEREST"
    },
  {
    type: "DEPOSIT",
    method:"ETHEREUM",
    amount: 52000,
    amountcrypto:0.00038,
    status:"APPROVED",
    createdAt:"2024-12-12 01:45:23.656",
    txid:"LLWE-wY7cQ5_m4iqc0qcF1bD",
    address:"0xe45fdknwknknkqq",
    duration:6,
    plan:"SIMPLE_INTEREST"
  },
  {
    type: "WITHDRAWAL",
    method:"BITCOIN",
    amount: 100000,
    amountcrypto:0.000012,
    status:"PENDING",
    createdAt:"2024-12-29 22:43:19.838",
    txid:"LX-JAwY7cQ5_m4iqc0qcF1bD",
    address:"1x34RSFdknwknknkqq",
  }];

  


  return (
    <div className='flex flex-col gap-5 w-full lg:max-w-[48%] '>
    <h3 className='text-3xl text-gray-600 dark:text-gray-300 font-[500] '>Transaction History</h3>
    <div className="relative rounded-xl max-h-[500px] sm:max-h-[800] overflow-y-auto ">
        <div className="flex flex-col gap-5 shadow-sm ">

{Array.isArray(transactions) && transactions?.map((tx:any) => ( 

 <div className='' >

 {tx.type === "DEPOSIT" && (
<div  className="flex flex-col ">

          <div className='bg-white  border-solid dark:bg-[#101010] bg-slate-00 shadow-secondary border  border-b-slate-00 dark:border-slate-700  border-blue-200  rounded-lg px-3 lg:px-4 py-3 flex justify-between items-center font-epilogue font-medium text-base leading-5 '>
            <div className='flex items-center '>
            <svg className='w-10 h-10 lg:w-[50px] lg:h-[50px]' viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="50" height="50" rx="25" fill="#2947EB"/>
          <path d="M21.854 28.0527C21.854 29.4672 22.9478 30.6047 24.2894 30.6047H27.0311C28.1977 30.6047 29.1457 29.6131 29.1457 28.3735C29.1457 27.0464 28.5624 26.5652 27.7019 26.2589L23.3123 24.7277C22.4519 24.4214 21.8686 23.9548 21.8686 22.6131C21.8686 21.3881 22.8165 20.3818 23.9832 20.3818H26.7248C28.0665 20.3818 29.1603 21.5193 29.1603 22.9339" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M25.4993 18.9375V32.0625" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M40.0832 25.4993C40.0832 33.5493 33.5498 40.0827 25.4998 40.0827C17.4498 40.0827 10.9165 33.5493 10.9165 25.4993C10.9165 17.4493 17.4498 10.916 25.4998 10.916" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M32.792 12.375V18.2083H38.6253" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M40.0837 10.916L32.792 18.2077" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
            </div>
            <div className='flex flex-col  '>
              <div className='flex text-sm sm:text-base lg:text-base xl:text-lg gap-1 font-md text-[#252525] dark:text-[#BBBBBB]'>
                {tx.method} {tx.type}
              </div>
              <div >
              <span className='text-xs sm:text-sm  lg:text-sm text-[#BBBBBB] font-normal dark:text-[#9c9daa]'>
              {moment(tx.createdAt).format("MMM Do YY")}
          </span>
              </div> 
            </div>

            <div className='flex flex-col '>
              <div className='flex text-sm sm:text-base lg:text-lg gap-1 font-md text-[#252525] dark:text-[#BBBBBB]'>
              {tx?.amountcrypto} {tx.method === "BITCOIN" && "BTC" || tx.method === "ETHEREUM" && "ETH" }
              </div>
              <div >
              <span className='text-xs sm:text-sm lg:text-sm text-[#BBBBBB] font-normal dark:text-[#9c9daa]'>
              ${tx?.amount?.toLocaleString()}.00
          </span>
              </div> 
            </div>

            </div>
        </div>
)
}

{tx.type === "TOPUP" && (
<div  className="flex flex-col ">

          <div className='bg-white  border-solid dark:bg-[#101010] bg-slate-00 shadow-secondary border  border-b-slate-00 dark:border-slate-700  border-blue-200  rounded-lg px-3 lg:px-4 py-3 flex justify-between items-center font-epilogue font-medium text-base leading-5 '>
            <div className='flex items-center '>
            <svg className='w-10 h-10 lg:w-[50px] lg:h-[50px]' viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="50" height="50" rx="25" fill="#2947EB"/>
          <path d="M21.854 28.0527C21.854 29.4672 22.9478 30.6047 24.2894 30.6047H27.0311C28.1977 30.6047 29.1457 29.6131 29.1457 28.3735C29.1457 27.0464 28.5624 26.5652 27.7019 26.2589L23.3123 24.7277C22.4519 24.4214 21.8686 23.9548 21.8686 22.6131C21.8686 21.3881 22.8165 20.3818 23.9832 20.3818H26.7248C28.0665 20.3818 29.1603 21.5193 29.1603 22.9339" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M25.4993 18.9375V32.0625" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M40.0832 25.4993C40.0832 33.5493 33.5498 40.0827 25.4998 40.0827C17.4498 40.0827 10.9165 33.5493 10.9165 25.4993C10.9165 17.4493 17.4498 10.916 25.4998 10.916" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M32.792 12.375V18.2083H38.6253" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M40.0837 10.916L32.792 18.2077" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
            </div>
            <div className='flex flex-col  '>
              <div className='flex text-sm sm:text-base lg:text-base xl:text-lg gap-1 font-md text-[#252525] dark:text-[#BBBBBB]'>
                {tx.method} {tx.type}
              </div>
              <div >
              <span className='text-xs sm:text-sm  lg:text-sm text-[#BBBBBB] font-normal dark:text-[#9c9daa]'>
              {moment(tx.createdAt).format("MMM Do YY")}
          </span>
              </div> 
            </div>

            <div className='flex flex-col '>
              <div className='flex text-sm sm:text-base lg:text-lg gap-1 font-md text-[#252525] dark:text-[#BBBBBB]'>
              {tx?.amountcrypto} {tx.method === "BITCOIN" && "BTC" || tx.method === "ETHEREUM" && "ETH" }
              </div>
              <div >
              <span className='text-xs sm:text-sm lg:text-sm text-[#BBBBBB] font-normal dark:text-[#9c9daa]'>
              ${tx?.amount?.toLocaleString()}.00
          </span>
              </div> 
            </div>

            </div>
        </div>
)
}
{tx.type === "WITHDRAWAL" && (
  <div  className="flex flex-col">
          <div className='bg-white  border-solid dark:bg-[#101010] bg-slate-00 shadow-secondary border  border-b-slate-00 dark:border-slate-700  border-blue-200  rounded-lg px-3 py-3 flex justify-between items-center font-epilogue font-medium text-base leading-5 '>
            <div className='flex items-center '>
            <svg className='w-10 h-10 lg:w-[50px] lg:h-[50px]' viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="50" height="50" rx="25" fill="#2947EB"/>
          <path d="M21.854 28.0527C21.854 29.4672 22.9478 30.6047 24.2894 30.6047H27.0311C28.1977 30.6047 29.1457 29.6131 29.1457 28.3735C29.1457 27.0464 28.5624 26.5652 27.7019 26.2589L23.3123 24.7277C22.4519 24.4214 21.8686 23.9548 21.8686 22.6131C21.8686 21.3881 22.8165 20.3818 23.9832 20.3818H26.7248C28.0665 20.3818 29.1603 21.5193 29.1603 22.9339" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M25.4993 18.9375V32.0625" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M40.0832 25.4993C40.0832 33.5493 33.5498 40.0827 25.4998 40.0827C17.4498 40.0827 10.9165 33.5493 10.9165 25.4993C10.9165 17.4493 17.4498 10.916 25.4998 10.916" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M32.792 12.375V18.2083H38.6253" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M40.0837 10.916L32.792 18.2077" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

            </div>
 
            <div className='flex flex-col '>
         
            <div className='flex text-sm sm:text-base lg:text-base xl:text-lg gap-1 font-md text-[#252525] dark:text-[#BBBBBB]'>
            {tx.method} {tx.type}
              </div>
              <div >
              <span className='text-xs sm:text-sm  lg:text-sm text-[#BBBBBB] font-normal dark:text-[#9c9daa]'>
              {moment(tx.createdAt).format("MMM Do YY")}
          </span>
              </div> 
            </div>

            <div className='flex flex-col '>
            <div className='flex text-sm sm:text-base lg:text-lg gap-1 font-md text-[#252525] dark:text-[#BBBBBB]'>
            {tx?.amountcrypto} {tx.method === "BITCOIN" && "BTC" || tx.method === "ETHEREUM" && "ETH" }
              </div>
              <div >
              <span className='text-xs sm:text-sm lg:text-sm text-[#BBBBBB] font-normal dark:text-[#9c9daa]'>
              ${tx?.amount?.toLocaleString()}.00
          </span>
              </div> 
            </div>

        </div>
        </div>
)}
        </div>
)
)
}
</div>
</div>
{!transactions && (
  <div  className="flex flex-col mt-5 mb-20">
          <div className='bg-white  border-solid dark:bg-[#101010] bg-slate-00 shadow-secondary border  border-b-slate-00 dark:border-slate-700  border-blue-200  rounded-lg px-3 lg:px-4 py-4 flex justify-between items-center font-epilogue font-medium text-base leading-5 '>
         
<div className='text-sm leading-[20.8px] text-[#252525] dark:text-[#a8a8b2] '>
  No Transactions yet. create one
  </div>
  </div>
  </div>
)
}

</div>
  )
}

export default Tx