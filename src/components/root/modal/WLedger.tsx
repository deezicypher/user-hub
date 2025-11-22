import React, { Dispatch } from 'react'
import moment from 'moment'
import { WPlan, showWProps } from '../../../pages/ledger'

interface WLedgerProps {
    data:WPlan[];
    setShowW:Dispatch<React.SetStateAction<showWProps>>;
}

const WLedger:React.FC<WLedgerProps> = ({data,setShowW}) => {
  return (
    <div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="fixed inset-0 bg-black opacity-50">    </div>
<div className='flex top-0  justify-center '>
    <div className='dark:bg-[#101010] bg-slate-50 shadow-secondary rounded-3xl py-5 px-5 z-10'>
    <div className='sm:w-[500px] flex flex-col justify-center items-center' >
    <div className='flex rounded-full bg-[#101010] w-max mb-10 cursor-pointer' onClick={() => setShowW(prev => ({...prev, show:false}))}>
        
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
</div>

<div className='flex flex-col gap-2 w-full px-2 sm:px-5'>
    <div className='flex justify-between items-center'>
        <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>Txid</div>
        <div className=" text-slate-500 text-sm dark:text-slate-400">{data?.[0].txid}</div>
    </div>
    <div className='flex justify-between items-center'>
        <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>Address</div>
        <div className=" text-slate-500 text-sm dark:text-slate-400">{data?.[0].address}</div>
    </div>
    <div className='flex justify-between items-center'>
        <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>Amount</div>
        <div className=" text-slate-500 text-sm dark:text-slate-400">${data?.[0].amount}.00</div>
    </div>
    <div className='flex justify-between items-center'>
        <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>Method</div>
        <div className=" text-slate-500 text-sm dark:text-slate-400">{data?.[0].method}</div>
    </div>
    <div className='flex justify-between items-center'>
        <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>Value</div>
        <div className=" text-slate-500 text-sm dark:text-slate-400">{data?.[0].amountcrypto} {data?.[0].method}</div>
    </div>
    <div className='flex justify-between items-center'>
        <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>Status</div>
        <div className=" text-slate-500 text-sm dark:text-slate-400">{data?.[0].status} </div>
    </div>
    <div className='flex justify-between items-center'>
        <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>On</div>
        <div className=" text-slate-500 text-sm dark:text-slate-400">{ moment(data?.[0].createdAt).format("MMM Do YY")}</div>
    </div>

</div>
<div className='font-epilogue text-sm sm:text-lg dark:text-white text-[#808191] mt-10'></div>


</div>
</div>
</div>
</div>
    </div>
  )
}

export default WLedger