import React,{useEffect, useState} from 'react'
import { getAPI } from '../utils/fetchData';
import moment, { duration } from 'moment';
import CustomButton from '../components/CustomButton';
import WLedger from '../components/root/modal/WLedger';
import {useQuery} from 'react-query';

export interface DPlan {
    
    id:number;
    amount: number;
    status:string;
    createdAt: string;
    expirationDate:string,
    txid:string;
    method:string;
    plan:string;
    duration:number;
    amountcrypto:number;

  }
export interface showDProps{
    data: DPlan[];
    show:boolean;
}
export interface WPlan {
    id:number;
    amount: number;
    status:string;
    createdAt: string;
    expirationDate:string;
    method:string;
    txid:string;
    duration:number;
    amountcrypto:number;
    address:string;
   
    
  }
export interface showWProps{
    data: WPlan[];
    show:boolean;
}


const Ledger = () => {

    const [showD, setShowD] = useState<showDProps>({data:[], show:false})
    const [showW, setShowW] = useState<showWProps>({data:[], show:false})
 
    
    const ledger = {
      deposits: [
      {
        id:1,
        type: "DEPOSIT",
        method:"BITCOIN",
        amount: 100000,
        amountcrypto:0.000012,
        status:"APPROVED",
        createdAt:"2024-12-09 22:43:19.838",
        txid:"L-wY7cQ5_m4iqc0qcF1bD",
        address:"1xdknwknknkqq",
        duration:6,
        plan:"COMPOUND_INTEREST",
        expirationDate:"2025-06-09 22:43:19.838",
      },
    {
      id:2,
      type: "DEPOSIT",
      method:"ETHEREUM",
      amount: 52000,
      amountcrypto:0.00038,
      status:"APPROVED",
      createdAt:"2024-12-12 01:45:23.656",
      txid:"LLWE-wY7cQ5_m4iqc0qcF1bD",
      address:"0xe45fdknwknknkqq",
      duration:6,
      expirationDate:"2025-06-12",
      plan:"SIMPLE_INTEREST"
    }],
    withdrawals:[
    {
      id:3,
      type: "WITHDRAWAL",
      method:"BITCOIN",
      amount: 100000,
      amountcrypto:0.000012,
      status:"PENDING",
      createdAt:"2024-12-29 22:43:19.838",
      txid:"LX-JAwY7cQ5_m4iqc0qcF1bD",
      address:"bc1q43lh2adfm29ksh5akj2cxu0ua7jzfp7je9wqnu",
      duration:6,
      expirationDate:"2025-06-12",
    }]
  }

    // const {refetch:getLedger, data:ledger  } = useQuery('ledger', async () => {
    //   const res = await getAPI('transact/ledger')
    //     const deposits = res.data.filter((x:any) => x.type==="DEPOSIT")
    //     const withdrawals = res.data.filter((x:any) => x.type==="WITHDRAWAL")
    //     return {deposits, withdrawals}
    // },{
    //   onError: (err) => {
    //     console.log(err)
    //   }
    // } )

 
  

    const handleShow = (deposit:DPlan) => {
            setShowD({
                data:[deposit],
                show:true
            })
    }

    const handleShowW = (withdrawal:WPlan) => {
        setShowW({
            data:[withdrawal],
            show:true
        })
}

    useEffect(() => {
        //getLedger()
    }, [])

  return (
    <div className='font-epilogue text-[#e7d09d] text-xl mt-10 sm:mt-5 sm:text-2xl'>Ledger <span className='text-sm'> ( All Transactions )</span>
      <div className='mb-40 px-3'>
        {showD.show  && (
      
       <div>
       <div className="fixed inset-0 flex items-center justify-center z-50">
<div className="fixed inset-0 bg-black opacity-50">    </div>
<div className='flex top-0  justify-center '>
<div className='dark:bg-[#101010] bg-slate-50 shadow-secondary rounded-3xl py-5 px-5 z-10'>
<div className='sm:w-[500px] flex flex-col justify-center items-center' >
<div className='flex rounded-full bg-[#101010] w-max mb-10 cursor-pointer' onClick={() => setShowD(prev => ({...prev,show:false}))}>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
</div>
<div className='flex flex-col gap-2 w-full px-2 sm:px-5'>
<div className='flex justify-between items-center gap-5'>
   <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>Name</div>
   <div className=" text-slate-500 text-sm dark:text-slate-400"><div className='flex  gap-3'> <div className='w-3 h-3'>😎</div>{showD.data?.[0].plan === "SIMPLE_INTEREST" ? "Simple Interest" : "Compound Interest" }</div> </div>
</div>
<div className='flex justify-between items-center gap-3'>
   <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>Txid</div>
   <div className=" text-slate-500 text-sm dark:text-slate-400">{showD.data?.[0].txid}</div>
</div>
<div className='flex justify-between items-center'>
   <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>Amount</div>
   <div className=" text-slate-500 text-sm dark:text-slate-400">${showD.data?.[0].amount}.00</div>
</div>
<div className='flex justify-between items-center'>
   <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>Duration</div>
   <div className=" text-slate-500 text-sm dark:text-slate-400">{showD.data?.[0].duration}</div>
</div>
<div className='flex justify-between items-center'>
   <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>Method</div>
   <div className=" text-slate-500 text-sm dark:text-slate-400">{showD.data?.[0].method}</div>
</div>
<div className='flex justify-between items-center'>
   <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>Value</div>
   <div className=" text-slate-500 text-sm dark:text-slate-400">{showD.data?.[0].amountcrypto} {showD.data?.[0].method}</div>
</div>
<div className='flex justify-between items-center'>
   <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>Status</div>
   <div className=" text-slate-500 text-sm dark:text-slate-400">{showD.data?.[0].status} </div>
</div>
<div className='flex justify-between items-center'>
   <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>On</div>
   <div className=" text-slate-500 text-sm dark:text-slate-400">{ moment(showD.data?.[0].createdAt).format("MMM Do YY")}</div>
</div>
<div className='flex justify-between items-center'>
   <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>Expires</div>
   <div className=" text-slate-500 text-sm dark:text-slate-400">{ moment(showD.data?.[0].expirationDate).add(showD.data?.[0]?.duration,'months').format("MMM Do YY")}</div>
</div>
</div>
<div className='font-epilogue text-sm sm:text-lg dark:text-white text-[#808191] mt-10'></div>


</div>
</div>
</div>
</div>
</div>
        )}
 
 {showW.show  && (
       <WLedger  data={showW.data} setShowW={setShowW} />
        )}
 


    <div className='flex  mt-[20px] '>
  

      
            <div className='flex gap-10 flex-col h-min xl:flex-row  w-full '>
      <div className=' dark:bg-[#101010] bg-slate-00   w-full shadow-secondary rounded-3xl py-5 px-5 ]'>
             <h3 className='font-epilogue font-semibold text-[18px] text-slate-600 dark:text-slate-200 text-left'>
   Deposits
    </h3>
             <div className="mt-4 -mb-3">
    <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-[#101010]/25">
  
    <div className="relative rounded-xl overflow-auto w-full  border border-[#4b4333]  max-h-screen sm:max-h-screen overflow-y-auto"><div className="shadow-sm my-8">
       
  <table className="border-collapse table-auto w-full text-sm ">
    <thead>
      <tr>
        <th className="border-b dark:border-[#4b4333] font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Name</th>
        <th className="border-b dark:border-[#4b4333] font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Amount</th>
        <th className="border-b dark:border-[#4b4333] font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Status</th>
        <th className="border-b dark:border-[#4b4333] font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">On</th>
        
        <th className="border-b dark:border-[#4b4333] font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Expires</th>
        <th className="border-b dark:border-[#4b4333] font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Action</th>
      </tr>
    </thead>
    <tbody className="bg-white dark:bg-[#101010]">
        {ledger?.deposits?.map( (deposit:DPlan,index: React.Key | null | undefined) => (
                    <tr key={index}>
                    <td className=" border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"><div className='flex  gap-3'> <div className='w-4 h-4'>😎</div>{deposit.plan === "SIMPLE_INTEREST" ? "Simple Interest" : "Compound Interest" }</div></td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">${deposit?.amount?.toLocaleString()}.00</td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{deposit?.status}</td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">{ moment(deposit.createdAt).format("MMM Do YY")}</td>
                   
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">{ moment(deposit?.createdAt).add(deposit?.duration,'months').format("MMM Do YY")}</td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400"><CustomButton title="View Details" handleClick={() => handleShow(deposit)} styles="bg-[#2947EB] min-h-[35px] text-xs"/></td>
                  </tr>
        )
    )
 }
  
       
    </tbody>
  </table>
</div></div><div className="absolute inset-0 pointer-events-none border border-black/5 rounded-xl dark:border-white/5"></div></div></div>
</div>
             <div className=' dark:bg-[#101010] bg-slate-00   w-full shadow-secondary rounded-3xl py-5 px-5 '>
             <h3 className='font-epilogue font-semibold text-[18px] text-slate-600 dark:text-slate-200 text-left'>
   Withdrawals
    </h3>
             <div className="mt-4 -mb-3">
    <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-[#101010]/25">
  
    <div className="relative rounded-xl overflow-auto border border-[#4b4333] max-h-[500px] sm:max-h-[800] overflow-y-auto"><div className="shadow-sm my-8">
       
  <table className="border-collapse table-auto w-full text-sm ">
    <thead>
      <tr>
        <th className="border-b dark:border-[#4b4333] font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Amount</th>
        <th className="border-b dark:border-[#4b4333] font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Method</th>
        <th className="border-b dark:border-[#4b4333] font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Requested on</th>
        <th className="border-b dark:border-[#4b4333] font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Status</th>
        <th className="border-b dark:border-[#4b4333] font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Action</th>
      </tr>
    </thead>
    <tbody className="bg-white dark:bg-[#101010]">
        {ledger?.withdrawals?.map( (withdrawal:WPlan,index: React.Key | null | undefined) => (
           
                    <tr key={index}>
                    <td className=" border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"><div className='flex items-center gap-3'> ${withdrawal.amount?.toLocaleString()}.00</div></td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{withdrawal?.method}</td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">{ moment(withdrawal.createdAt).format("MMM Do YY")}</td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">{withdrawal?.status}</td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400"><CustomButton title="View Details" handleClick={() => handleShowW(withdrawal)} styles="bg-[#2947EB] min-h-[35px] text-xs"/></td>
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
  </div>
    </div>
  )
}

export default Ledger