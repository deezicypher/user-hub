import React, { useState, useEffect } from 'react'
import axios from 'axios';
import CustomButton from '../components/CustomButton';
import moment from 'moment';
import Modal from '../components/root/modal/Modal';
import { useStateContext } from '../context/userContext';
import { getAPI, postAPI } from '../utils/fetchData';
import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom';
import { CryptoAmountState, CryptoPriceState, OptionsProps, options } from './deposit';
import { UserContextProps } from '../types';
import WithdrawM from '../components/root/modal/Withdraw';


interface Transaction {
    id:number;
    txid:string;
    method:string;
    amountcrypto:number;
    duration:number;
    status:string;
    
}


interface Plan {
    id:number;
    amount: number;
    type: string;
    createdAt: string;
    amountcrypto:number,
    method:string,
    profit:number,
    expirationDate:string,
    Plan?: {
      expirationDate: string;
    };
    transaction: Transaction [];
    duration:number;
  }
  


interface showPlanProps {
data: Plan[];
    show:boolean;
    capital: number;
  
  }


  interface withdrawProps{
    address:string;
    method: string;
    amount:number;
    crypto:number;
  }



const Withdraw = () => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showPlan, setShowPlan] = useState<showPlanProps>({data:[], show:false, capital:0})
    const [selectedOption, setSelectedOption] = useState<typeof options[0]>(options[0]);
    const [withdrawInfo, setWithdrawInfo] = useState<withdrawProps>({
        address:'',
        method:'',
        amount:0,
        crypto:0
    })

    const router = useNavigate()

    //const [plans, setPlans] = useState<Plan []>([]);

    //const {stats,user} = useStateContext() as UserContextProps
    const user = {
      id:1,
      stats:{
        total_p:500000
      }
    }
    const stats = {
      balance:152000,
      total_p:500000,
      simple_bal:52000,
      simple_e:246000,
      ref_e:10000,
      compound_bal:100000,
      compound_e:254000
    }
    
    //@ts-ignore
    const [error, setError] = useState()

    const [show, setShow] = useState(false);

    const [cryptoprice, setCryptoPrice] = useState<CryptoPriceState>({
        btc:0,usdt:0,eth:0,usdc:0
    })

    const [cryptoAmount, setCryptoAmount] = useState<CryptoAmountState>({
        'btc':0,'usdt':0,'eth':0,'usd':0,'usdc':0
    })
    const [wallet, setWallet] = useState<number>()
    
   
  
    const plans = [
      {
        id:1,
        amount: 100000,
        type: "COMPOUND_INTEREST",
        amountcrypto:0.000012,
        method:"BITCOIN",
        profit:240000,
        expirationDate:"2025-06-09 22:43:19.838",
        createdAt:"2024-12-09 22:43:19.838",
        Plan: {
          expirationDate:"2025-06-09 22:43:19.838"
        },
        transaction: [{
          id:1,
          txid:"L-wY7cQ5_m4iqc0qcF1bD",
          method:"BITCOIN",
          amountcrypto:0.000012,
          duration:6,
          status:"APPROVED",
        }],
        duration:6
      },
      {
        id:1,
        amount: 52000,
        type: "SIMPLE_INTEREST",
        amountcrypto:0.00038,
        method:"ETHEREUM",
        profit:60000,
        expirationDate:"2025-06-12",
        createdAt:"2024-12-12 01:45:23.656",
        Plan: {
          expirationDate:"2025-06-12 01:45:23.656"
        },
        transaction: [{
          id:1,
          txid:"LLWE-wY7cQ5_m4iqc0qcF1bD",
          method:"ETHEREUM",
          amountcrypto:0.00038,
          duration:6,
          status:"APPROVED",
        }],
        duration:6
      }
   ];

   
    const handleShowPlan = (deposit:Plan) => {
            setShowPlan({
                data:[deposit],
                show:true,
                capital:0
            })
    }

    const handleShowC = (deposit:Plan) => {
      setShowPlan({
          data:[deposit],
          show:true,
          capital:deposit.amount
      })
}

  



      const handleAmount = (e: number, id: keyof CryptoPriceState) => {
        const enteredValue = e;
        const maxValue = e
        if (enteredValue > maxValue) {
            setCryptoAmount(prev => ({...prev, [id]:(maxValue/cryptoprice[id]).toFixed(4),usd:maxValue}))   
            setWithdrawInfo(prev => ({...prev, amount:maxValue}))
           
          } else {
            setCryptoAmount(prev => ({...prev, [id]:(enteredValue/cryptoprice[id]).toFixed(4),usd:enteredValue}))   
            setWithdrawInfo(prev => ({...prev, amount:enteredValue}))
          }
          
      }

      const handleWallet = (wallet:string,id:string) => {
            setWithdrawInfo(prev => ({...prev, address:wallet,method:id,amount:cryptoAmount?.usd}))
      }
  


        const handleSelect = (option:OptionsProps) => {
            setSelectedOption(option);
            setCryptoAmount(prev => ({...prev, [option.id]:(cryptoAmount.usd/cryptoprice[option.id as keyof CryptoPriceState]).toFixed(4),usd:cryptoAmount.usd})) 
            setShow(false)
          };
  
  
 

      const BTC = async () => {
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
                params: {
                  ids: 'bitcoin,tether,ethereum',
                  vs_currencies: 'usd,btc,eth,usdt',
                  include_24hr_change: true,
                },
              });
             
              const btcToUsd = response.data.bitcoin.usd;
              const tether = response.data.tether.usd;
              const eth = response.data.ethereum.usd
              setCryptoPrice({btc:btcToUsd, usdt:tether, eth:eth,usdc:0})
         
        } catch (error:any) {
          console.log('Error:', error.message);
          throw error;
        }
      }



    const filteredOptions = options.filter((option) => option?.id !== selectedOption?.id);
  
    const getPlans = async () => {
        try{
        const res = await getAPI('/plans-api')

        // Ensure the response data is an array before setting state
    if (Array.isArray(res.data)) {
        //setPlans(res.data);
      } else {
        console.error('Expected an array but received:', res.data);
       // setPlans([]);  // Set empty array if data is not an array
      }
    } catch (err) {
      console.error('Error fetching plans:', err);
      //setPlans([]);  // Set empty array if there's an error
    }
  };

    const withdrawProfit = async () => {
        const withdrawD = {amount: withdrawInfo?.amount,amountcrypto: cryptoAmount[selectedOption?.id as keyof CryptoPriceState],method:withdrawInfo?.method,id:user?.id, desc:"WITHDRAWAL", txid:nanoid(),address:withdrawInfo?.address}
       
        try{
            //const token = Cookies.get('token')
            //const parsedToken = token? JSON.parse(token) : 0
            //await postAPI('/withdraw-profit-api', withdrawD)
            setShowModal(true)
        }catch(err){
            console.log(err)
        }
    }


    const withdrawCapital = async () => {
        const withdrawD = {amount: showPlan.data?.[0].amount,amountcrypto: showPlan.data?.[0].transaction[0]?.amountcrypto,method:showPlan.data?.[0].transaction[0]?.method,id:user?.id,planId:showPlan.data?.[0]?.id, desc:"WITHDRAWAL", txid:nanoid(),address:withdrawInfo?.address}
       if(!withdrawInfo?.address){
          return null
       }
        try{
           
          //await postAPI('/withdraw-capital-api', withdrawD)
            handleWithdrawCapitalDone()
        }catch(err){
            console.log(err)
        }
    }

    const handleWithdrawCapitalDone = () => {
        setShowPlan(prev => ({...prev, show:false}))
        setShowModal(true)
    }

    

 


    useEffect(() => {
        //getPlans()
        BTC()
    },[])
  return (
    <>
   
   <div className='font-epilogue text-[#e7d09d] text-xl mt-10 sm:mt-5 sm:text-2xl'>Withdraw
 

    {showPlan.show === true  && (
<div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="fixed inset-0 bg-black opacity-50">    </div>
<div className='flex top-0  justify-center '>
    <div className='dark:bg-[#101010] bg-slate-50 shadow-secondary rounded-3xl py-5 px-5 z-10'>
    <div className='sm:w-[500px] flex flex-col justify-center items-center' >
    <div className='flex rounded-full bg-[#EAEDFD] w-max mb-10 cursor-pointer' onClick={() => setShowPlan(prev => ({...prev, show:false}))}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-slate-900">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
</div>


<div className='flex flex-col gap-2 w-full px-2 sm:px-5'>
    <div className='flex justify-between items-center gap-5'>
        <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>Name</div>
        <div className=" text-slate-500 text-sm dark:text-slate-400"><div className='flex  gap-5'> <div className='w-3 h-3'>😎</div>{showPlan.data?.[0].type === "SIMPLE_INTEREST" ? "Simple Interest" : "Compound Interest" }</div> </div>
    </div> 
    <div className='flex justify-between items-center'>
        <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>Txid</div>
        <div className=" text-slate-500 text-sm dark:text-slate-400">{showPlan.data?.[0].transaction[0]?.txid}</div>
    </div>
    <div className='flex justify-between items-center'>
        <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>Amount</div>
        <div className=" text-slate-500 text-sm dark:text-slate-400">${showPlan.data?.[0].amount}.00</div>
    </div>
    <div className='flex justify-between items-center'>
        <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>Duration</div>
        <div className=" text-slate-500 text-sm dark:text-slate-400">{showPlan.data?.[0].duration}</div>
    </div>
    <div className='flex justify-between items-center'>
        <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>Method</div>
        <div className=" text-slate-500 text-sm dark:text-slate-400">{showPlan.data?.[0].transaction[0]?.method}</div>
    </div>
    <div className='flex justify-between items-center'>
        <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>Crypto</div>
        <div className=" text-slate-500 text-sm dark:text-slate-400">{showPlan.data?.[0].transaction[0]?.amountcrypto} {showPlan.data?.[0].method}</div>
    </div>
    <div className='flex justify-between items-center'>
        <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>Status</div>
        <div className=" text-slate-500 text-sm dark:text-slate-400">{showPlan.data?.[0].transaction[0]?.status} </div>
    </div>
    <div className='flex justify-between items-center'>
        <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>On</div>
        <div className=" text-slate-500 text-sm dark:text-slate-400">{ moment(showPlan.data?.[0].createdAt).format("MMM Do YY")}</div>
    </div>
    <div className='flex justify-between items-center'>
        <div className='font-medium   text-slate-400 dark:text-slate-400 text-left'>Expires</div>
        <div className=" text-slate-500 text-sm dark:text-slate-400">{ moment(showPlan.data?.[0].expirationDate).format("MMM Do YY")}</div>
    </div>
    {showPlan?.capital && (
    <div className='flex flex-col mt-5 sm:mt-8'>
<p className='font-epilogue font-normal text-[16px] text-[#808191]'>Wallet Address</p>
    <div className={`flex bg-[#EAEDFD] p-2 rounded-lg mt-2 items-center justify-between`}>
    <div className='flex border '>
<div className='ml-2  '>
  
<input type="text"  className='outline-none bg-transparent text-[#252525] font-medium sm:min-w-[400px]' onInput={(e: React.FormEvent<HTMLInputElement> ) => {
    const inputValue = e.currentTarget.value
    const numericValue = parseFloat(inputValue)
    if(!isNaN(numericValue)){
        setWallet(numericValue)
    }else{
        setWallet(0)
    }
    
   

}}  />
</div>
</div>
    </div>
    {new Date(showPlan.data?.[0]?.expirationDate) < new Date() && showPlan?.capital && (  
    <CustomButton 
title="Withdraw Capital"
btnType="button"
styles={`bg-[#2947EB] mt-10`}
handleClick={() => withdrawCapital()}
/>
)
}
</div>
    )}

</div>





</div>
</div>
</div>
</div>
 )}

 
        {showModal === true?
            <Modal
    msg="Withdrawal Request Successful" 
    btnTitle="Go to Ledger" 
    btnstyle="bg-[#2947EB]" 
    topAction={setShowModal}
    action = {() => router('/ledger')}
    svg={ <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 ">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>}
    />
    :
        <div className='flex w-full flex-col lg:flex-row gap-10 relative justify-center items-center'>


<div className='w-full sm:w-[50%] md:w-full xl:w-[50%]'>


<div className='dark:bg-[#101010] w-full  text-slate-950 text-base shadow-secondary rounded-3xl py-5 px-5 mt-10'>

    <div className='flex flex-col'>
    


<div className='flex justify-between items-center mt-5'>
<p className='font-epilogue font-normal text-[16px] text-[#808191]'> Simple interest </p> 
<p className='font-epilogue font-normal text-[16px] text-[#a9c1b5]'>${stats?.simple_e?.toLocaleString()}.00</p>
</div>
<div className='flex justify-between items-center mt-5'>
<p className='font-epilogue font-normal text-[16px] text-[#808191]'> Compound Interest </p> 
<p className='font-epilogue font-normal text-[16px] text-[#a9c1b5]'>${stats?.compound_e?.toLocaleString()}.00</p>
</div>
<div className='flex justify-between items-center mt-5'>
<p className='font-epilogue font-normal text-[16px] text-[#808191]'> Referral Bonus </p> 
<p className='font-epilogue font-normal text-[16px] text-[#a9c1b5]'>${stats?.ref_e?.toLocaleString()}.00</p>
</div>
<div className='flex justify-between items-center mt-5'>
<p className='font-epilogue font-normal text-[16px] text-[#808191]'>Available Profit</p>
<p className='font-epilogue font-normal text-[16px] text-[#1dc071]'>${stats?.total_p?.toLocaleString()}.00</p>
</div>
<div className='flex flex-col  mt-5 sm:mt-8'>
<p className='font-epilogue font-normal text-[16px] text-[#808191]'>Amount in US Dollars</p>
{user?.stats?.total_p < cryptoAmount?.usd && <span className='text-red-500 text-sm'>Amount not available for withdrawal</span>}
    <div className='flex bg-[#EAEDFD] p-2  rounded-lg mt-2 items-center justify-between' >
    <div className='flex '>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

<div className='ml-2 '>
<input type="number" max={user?.stats?.total_p} value={cryptoAmount?.usd} className="outline-none border-none  bg-transparent text-[#252525] font-medium" onInput={(e: React.ChangeEvent<HTMLInputElement>) => 
{
         const inputValue = e.currentTarget.value; // Get the input value as a string
         const numericValue = parseFloat(inputValue); // Convert it to a number
         if (!isNaN(numericValue)) {
           handleAmount(numericValue,selectedOption.id as keyof CryptoPriceState); // Only update the state if it's a valid number
         } else {
           handleAmount(0,selectedOption.id as keyof CryptoPriceState); // Optionally handle invalid input (e.g., set to 0 if invalid)
         }} } />
</div>
</div>
<div className='self-start text-[#252525] font-medium hidden sm:flex'>
({cryptoAmount[selectedOption?.id as keyof CryptoPriceState]} {selectedOption?.id?.toUpperCase()})
</div>

    </div>

</div>
<div className='flex flex-col  mt-5 sm:mt-8'>
<p className='font-epilogue font-normal text-[16px] text-[#808191]'>Select Payment Method</p>
    <div className='flex bg-[#EAEDFD] p-2 rounded-lg mt-2 items-center justify-between' onClick={() => setShow(!show)}>
    <div className='flex '>
<img src={selectedOption?.svg} />
<div className='ml-2 '>
{selectedOption?.label}
</div>
</div>
<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.81296 5.657L0 1.414L1.60507 0L4.81296 2.829L8.02084 0L9.62591 1.414L4.81296 5.657Z" fill="#252525"/>
</svg>

    </div>
   
{show && filteredOptions?.map(option => (
<div className='bg-slate-50 p-2 border-b  dark:border-slate-400'>
<div className='flex  p-2 rounded-lg items-center justify-between' onClick={() => handleSelect(option)}>
<div className='flex'>
<img src={option.svg} />


<div className='ml-2 '>
{option.label}
</div>
</div>
</div>

</div>

))
  
}

</div>

<div className='flex flex-col mt-5 sm:mt-8'>
<p className='font-epilogue font-normal text-[16px] text-[#808191]'>Wallet Address</p>
    <div className={`flex bg-[#EAEDFD] ${error? 'border border-red-500' : '' }  p-2 rounded-lg mt-2 items-center justify-between`}>
    <div className='flex border '>
<img src={selectedOption?.svg} />
<div className='ml-2  '>
<input type="text"  className='outline-none bg-transparent text-[#252525] font-medium  w-full' onInput={(e: React.FormEvent<HTMLInputElement>) => {
    handleWallet(e.currentTarget.value,selectedOption?.value)} 
 } />
</div>
</div>
    </div>

</div>

{user?.stats?.total_p > cryptoAmount?.usd && withdrawInfo?.address && (
<>
<div className='flex flex-col mt-10'>
<p className='font-epilogue font-normal text-[16px] dark:text-[#808191] text-[#44454e]'>Withdraw Summary</p>
<div className='flex flex-col bg-[#EAEDFD] p-2 rounded-lg mt-2 px-4'>

    <div className='flex   items-center justify-between mt-4' >
    <div className='flex '>
        Payment Method
    </div>
<div className='self-start text-[#252525] font-medium'>
{selectedOption?.id?.toUpperCase()}
</div>
    </div>
    <div className='flex  items-center justify-between mt-4' >
    <div className='flex '>
    {selectedOption?.id?.toUpperCase()}
    </div>
<div className='self-start text-[#252525] font-medium'>
{cryptoAmount[selectedOption?.id as keyof CryptoPriceState]}
</div>
    </div>

    <div className='flex flex-col sm:flex-row gap-2 sm:items-center justify-between mt-4' >
    <div className='flex  '>
    Address
    </div>
<div className='self-start text-[#252525] font-medium break-all'>
{withdrawInfo?.address}
</div>
    </div>

    <div className='flex  items-center justify-between mt-4' >
    <div className='flex '>
        Amount
    </div>
<div className='self-start text-[#252525] font-medium'>
${withdrawInfo?.amount?.toLocaleString()}.00
</div>

    </div>

</div >


</div>

    <CustomButton
      btnType="button"
      title={`Withdraw $${cryptoAmount?.usd?.toLocaleString()}.00 `}
      styles="bg-[#2947EB] mt-10"
      handleClick={() => withdrawProfit()}
      //onClick={() => handlePayment(selectedOption?.id?.toUpperCase(),label,selectedFOption?.label,cryptoAmount?.usd)}
    />

</>
)
}


    </div> 

</div>

</div>

<div className='flex lg:flex-row flex-wrap sm:flex-col lg:max-w-[500px] xl:max-w-[70%]  gap-5 sm:gap-3  self-start w-full'> 
        <div className='px-2  w-full '>
        <div>
          
      
   
   
    <div className='flex  mt-[40px]  '>
     

  
            <div className='flex gap-10 flex-col h-min xl:flex-row items-center w-full '>
      
             <div className=' dark:bg-[#101010] bg-slate-00 max-h-[500px] sm:max-h-[800] w-full shadow-secondary rounded-3xl py-5 px-5 ]'>
             <h3 className='font-epilogue font-semibold text-[18px] text-slate-600 dark:text-slate-200 text-left'>
     Active Plans
    </h3>
    <p className='text-xs text-slate-400 dark:text-slate-200 mt-2'>You can only withdraw your capital after each plan has expired</p>
             <div className="mt-4 -mb-3">
            
    <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-[#101010]/25 ">

    <div className="relative rounded-xl border border-[#4b4333] max-h-[500px] sm:max-h-[800] overflow-y-auto ">
        <div className="shadow-sm  my-8">
       
  <table className="border-collapse table-auto w-full text-sm ">
    <thead>
      <tr>
        <th className="border-b dark:border-[#4b4333] font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Name</th>
        <th className="border-b dark:border-[#4b4333] font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Amount</th>
        <th className="border-b dark:border-[#4b4333] font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">On</th>
        <th className="border-b dark:border-[#4b4333] font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Expires</th>
        <th className="border-b dark:border-[#4b4333] font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Action</th>
        <th className="border-b dark:border-[#4b4333] font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Action</th>
      </tr>
    </thead>
    
    <tbody className="bg-white dark:bg-[#101010]">
  {Array.isArray(plans) && plans.length > 0 ? (
    plans.map((plan, index) => (
      <tr key={index}>
        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4">😎</div>
            {plan?.type === 'SIMPLE_INTEREST' ? 'Simple Interest' : 'Compound Interest'}
          </div>
        </td>
        <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
          ${plan?.amount}.00
        </td>
        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
          {moment(plan?.createdAt).format('MMM Do YY')}
        </td>
        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
          {moment(plan?.expirationDate).format('MMM Do YY')}
        </td>
        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
          <CustomButton
            title="View Details"
            handleClick={() => handleShowPlan(plan)}
            styles="bg-[#2947EB] min-h-[35px] text-xs"
          />
        </td>
        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
          <CustomButton
            title="Withdraw Capital"
            handleClick={() => handleShowC(plan)}
            styles="bg-[#2947EB] min-h-[35px] text-xs"
          />
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={6} className="text-center text-slate-500 dark:text-slate-400">
       
      </td>
    </tr>
  )}
</tbody>

  

  </table>
</div></div><div className="absolute inset-0 pointer-events-none border border-black/5 rounded-xl dark:border-white/5"></div></div></div>
</div>

              </div>
        
    </div>
</div>
</div>
</div>
        </div>
}
    </div>
    </>
    )

}

export default Withdraw