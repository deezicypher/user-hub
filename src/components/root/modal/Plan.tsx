import React from 'react'
import CustomButton from '../../CustomButton'

import moment from 'moment'

interface DataProps {
    type:string;
    amount:number;
    amountcrypto:number;
    method:string;
    profit:number;
    expirationDate:string;
    createdAt:string;

}

interface PlanModalProps {
    data: DataProps ;
    btnTitle?:string;
    btnstyle?:string;
    setShowD: React.Dispatch<React.SetStateAction<boolean>>
}

const PlanModal: React.FC<PlanModalProps> = ({data,btnTitle,btnstyle,setShowD}) => {
  return (
    <div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="fixed inset-0 bg-black opacity-50">    </div>
<div className='flex top-0  justify-center '>
    <div className='dark:bg-[#101010] bg-slate-50 shadow-secondary rounded-3xl py-5 px-5 z-10'>
    <div className='sm:w-[500px] flex flex-col justify-center items-center' >
    <div className='flex rounded-full bg-[#EAEDFD] w-max mb-10 cursor-pointer' onClick={() => setShowD(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
</div>

<div className='flex flex-col gap-2 w-full px-2 sm:px-5'>
    <div className='flex justify-between items-center gap-5'>
        <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>Name</div>
        <div className=" text-slate-500 text-sm dark:text-slate-400"><div className='flex items-center gap-5'> <div className='w-3 h-3'>😎 </div>{data?.type === "SIMPLE_INTEREST" ? " Simple Interest" : "Compound Interest" }</div> </div>
    </div>

    <div className='flex justify-between items-center'>
        <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>Amount</div>
        <div className=" text-slate-500 text-sm dark:text-slate-400">${data?.amount}.00</div>
    </div>

    <div className='flex justify-between items-center'>
        <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>Crypto Value</div>
        <div className=" text-slate-500 text-sm dark:text-slate-400">{data?.amountcrypto} {data?.method}</div>
    </div>

    <div className='flex justify-between items-center'>
        <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>Profit</div>
        <div className=" text-slate-500 font-rubik text-sm dark:text-slate-400">${data?.profit} </div>
    </div>
    <div className='flex justify-between items-center'>
        <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>On</div>
        <div className=" text-slate-500 text-sm dark:text-slate-400">{ moment(data?.createdAt).format("MMM Do YY")}</div>
    </div>
    <div className='flex justify-between items-center'>
        <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>expirationDate</div>
        <div className=" text-slate-500 text-sm dark:text-slate-400">{ moment(data?.expirationDate).format("MMM Do YY")}</div>
    </div>
</div>
<div className='font-epilogue text-sm sm:text-lg dark:text-white text-[#808191] mt-10'></div>


<CustomButton 
title={btnTitle}
btnType="button"
styles={` ${btnstyle} mt-10`}
/>

</div>
</div>
</div>
</div>
    </div>
  )
}

export default PlanModal