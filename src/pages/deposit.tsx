import React, { useEffect, useRef, useState } from 'react'
import { bitcoin, ethereum } from '../assets/images';
import axios from 'axios'
import CustomButton from '../components/CustomButton';
import Pay from '../components/root/payment/Pay';


  
export interface OptionsProps {
    id:string,
    value:string,
    label:string,
    svg:string
}

interface Duration {
    id:number
}

interface FOptionsProps {
    id:string,
    label:string,
    value:string,
    logo:string,
    duration: Duration[],
    min:number
}

export interface CryptoPriceState {
    btc: number;
    usdt: number;
    eth: number;
    usdc: number;
  }

  export interface CryptoAmountState {
    btc: number;
    usdt: number;
    eth: number;
    usd: number;
    usdc: number;
  }
  
  

export const options:OptionsProps[] = [
    { id: 'btc',value:"BITCOIN", label: 'Bitcoin (BTC)', svg: bitcoin },
    { id: 'eth',value:"ETHEREUM", label: 'Ethereum (ETH)', svg: ethereum
     }
    /*{ id: 'usdt',value:"USDT", label: 'Tether (USDT)', svg: usdc
     },
     { id: 'usdc',value:"USDC", label: 'USDC (USDC)', svg: usdc
    },*/
  ];
  
  export const FOptions:FOptionsProps[] = [
      { id: 'simple', label: 'Simple Interest',value:'SIMPLE_INTEREST', logo:'😎', 'duration': [{'id':6},{'id':8},{'id':12}], min:1000 },
      { id: 'compound', label: 'Compound Interest',value:'COMPOUND_INTEREST', logo:'😎', 'duration': [{'id':6},{'id':8},{'id':12}], min:100000},
  ]

  
const Deposit = () => {
    const [selectedOption, setSelectedOption] = useState<typeof options[0]>(options[0]);
    const [selectedFOption, setSelectedFOption] = useState<typeof FOptions[0]>(FOptions[0]);
    const [selectedDuration , setSelectedDuration] = useState<Duration>(FOptions[0]?.duration[0])
    const [amounterror, setAmountError] = useState<String>("")

    const [pay, setPay] = useState<boolean>(false)
    const [cryptoprice, setCryptoPrice] = useState<CryptoPriceState>({
        btc:0,usdt:0,eth:0,usdc:0
    })
    const label = "https://userhub.org"
    const [show, setShow] = useState<boolean>(false);
    const [showF, setShowF] = useState<boolean>(false);
    const [showD, setShowD] = useState<boolean>(false);
    const [cryptoAmount, setCryptoAmount] = useState<CryptoAmountState>({
        btc: 0, usdt: 0, eth: 0, usd: 0, usdc: 0
    });


    const BTC = async () => {
        try {
            // const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            //     params: {
            //       ids: 'bitcoin,tether,ethereum,usd-coin',
            //       vs_currencies: 'usd,btc,eth,usdt',
            //       include_24hr_change: true,
            //     },
            //   });
             
              const btcToUsd = 80754.07//response.data.bitcoin.usd; commented due to cors error
              const tether = 1.00 //response.data.tether.usd;
              const eth = 2629.41 //response.data.ethereum.usd;
              const usdc = 1.00 //response.data['usd-coin'].usd;

         
              setCryptoPrice({btc:btcToUsd, usdt:tether, eth:eth,usdc:usdc})
              
         
        } catch (error:any) {
          console.log('Error:', error.message);
          throw error;
        }
      }

      const amountChecksOut = (amount:number) => {

        if(selectedFOption.id === "simple" && amount < 1000) return setAmountError("Minimum amount for Simple Interest is $1000")
        if(selectedFOption.id === "compound" && amount < 100000) return setAmountError("Minimum amount for Compound Interest is $100,000")
        else return setAmountError("")
      }
      const handleAmount = (amount:number, id:string) => {
          amountChecksOut(amount)
         
         setCryptoAmount((prev) => ({...prev, [id]:(amount/cryptoprice[id as keyof CryptoPriceState]).toFixed(4),usd:amount}))   
      }
  
     
    const handleSelect = (option:OptionsProps) => {
      setSelectedOption(option);
    
      setCryptoAmount((prev) => ({...prev, [option.id]:(cryptoAmount.usd/cryptoprice[option.id as keyof CryptoPriceState]).toFixed(4),usd:cryptoAmount.usd})) 
      setShow(false)
    };

    const handleSelectF = (option:FOptionsProps) => {
        setSelectedFOption(option);
        setShowF(false)
      };

      const handleSelectD = (option:Duration) => {
        setSelectedDuration(option);
        setShowD(false)
      };

 
    const handleSetPayF = () => {
      setPay(false)
      setCryptoAmount({'btc':0,'usdt':0,'eth':0,'usd':0,'usdc':0})
    }


    const filteredOptions = options.filter((option) => option?.id !== selectedOption?.id);
    const filteredFOptions = FOptions.filter((option) => option?.id !== selectedFOption?.id);
    const filteredD = FOptions[0]?.duration.filter((option) => option?.id !== selectedDuration?.id )


    const handlePayButton = () => {
    amountChecksOut(cryptoAmount?.usd)
    if(amounterror === "") return setPay(true)
    if(amounterror) return null
    
    }

    const targetPayRef = useRef<HTMLDivElement>(null);
    const handleScroll = () => {
        if (targetPayRef.current) {
          targetPayRef.current.scrollIntoView({
            behavior: 'smooth',  // Smooth scrolling
            block: 'start',      // Align the div to the top of the page
          });
        }
      };
    const SimpleClick = () => {
        handleScroll()
        setSelectedFOption( { id: 'simple', label: 'Simple Interest',value:'SIMPLE_INTEREST', logo:'😎', 'duration': [{'id':6}], min:1000 })
    }
    const CompoundClick = () => {
        handleScroll()
        setSelectedFOption(  { id: 'compound', label: 'Compound Interest',value:'COMPOUND_INTEREST', logo:'😎', 'duration': [{'id':6}], min:100000},)
    }

    useEffect(() => {
        BTC()
        
    },[])



useEffect(() => {

  if(selectedFOption.id === "simple" && cryptoAmount?.usd < 1000) return setAmountError("Minimum amount for Simple Interest is $1000")
  if(selectedFOption.id === "compound" && cryptoAmount?.usd < 100000) return setAmountError("Minimum amount for Compound Interest is $100,000")
  else return setAmountError("")
},[selectedFOption.id])
  return (
    <div className='mt-10 flex sm:flex-row flex-col justify-between gap-10'>
        {pay === true && (
<Pay data={{handleSetPayF,pay,selectedOption:selectedOption?.id?.toUpperCase(),plan:selectedFOption?.value,duration:selectedDuration?.id, 
label,msg:selectedFOption?.label,amount:cryptoAmount?.usd, cryptoAmount: cryptoAmount[selectedOption?.id as keyof CryptoPriceState]}}/>   
)}
        <div className='flex flex-col sm:flex-row md:flex-col w-full  lg:flex-row sm:gap-5 '>
        <div className='flex flex-col w-full items-center h-max gap-5 rounded-xl bg-[#101010]  cursor-pointer mb-10 p-3 sm:p-5' onClick={() => SimpleClick()}>
        <div className='flex flex-row items-center justify-center gap-2'>
        <div className='flex flex-row gap-2'>
        <div className='sm:w-8 w-6' >
        😎
        </div>
</div>
        <div className='text-sm text-center sm:text-base bg-gradient-to-r from-[#f6b430] to-[#fe9240] text-transparent bg-clip-text'>
            Simple Interest
        </div>

</div>
<div className='text-xl xl:text-2xl border  border-[#4b4333] rounded-md p-2 w-full text-center  text-[#b2a078] font-epilogue mt-2 font-semibold' title='20% Return on investment,every month.'>
                20% ROI/M
            </div>
        <div className='text-base font-epilogue bg-gradient-to-r from-[#f6b430] to-[#fe9240] text-transparent bg-clip-text'>Minimum - $1000</div>
        </div>
        <div className='flex flex-col w-full items-center gap-5 h-max rounded-xl bg-[#101010] cursor-pointer mb-10 p-3 sm:p-5' onClick={() => CompoundClick()}>
        <div className='flex flex-row items-center justify-center gap-2'>
        <div className='flex flex-row gap-2'>
        <div className='sm:w-8 w-6' >
        😎
        </div>
</div>
        <div className='text-sm text-[10px] sm:text-base bg-gradient-to-r from-[#f6b430] to-[#fe9240] text-transparent bg-clip-text'>
            Compound Interest
        </div>
     
</div>
<div className='text-xl xl:text-2xl border  border-[#4b4333] rounded-md p-2 w-full text-center  text-[#b2a078] font-epilogue mt-2 font-semibold' title='20% Return on investment,every month.'>
                40% ROI/M
            </div>
            <div className='text-base font-epilogue bg-gradient-to-r from-[#f6b430] to-[#fe9240] text-transparent bg-clip-text'>Minimum - $100,000</div>
        </div>
        </div>

        <div className='w-full text-slate-950'>


    <div className='dark:bg-[#101010] bg-slate-00 shadow-secondary rounded-3xl py-5 px-5' ref={targetPayRef}>

        <div className='flex flex-col'>
        <div className='flex flex-col'>
    <p className='font-epilogue font-normal text-[16px] text-[#808191]'>Select Financial Option</p>
        <div className='flex bg-[#EAEDFD] p-2 rounded-lg mt-2 items-center justify-between' onClick={() => setShowF(!showF)}>
        <div className='flex items-center'>
        <div className='flex flex-col items-center rounded-full bg-[#101010] p-2'>
<div className="w-3 h-3 sm:w-5 sm:h-5"> 😎</div>
</div>
<div className='ml-2 '>
    {selectedFOption?.label}
</div>
</div>
<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.81296 5.657L0 1.414L1.60507 0L4.81296 2.829L8.02084 0L9.62591 1.414L4.81296 5.657Z" fill="#252525"/>
</svg>

        </div>
       
{showF && filteredFOptions?.map(option => (
  <div className='bg-slate-50 p-2   w-full'>
  <div className='flex  p-2 rounded-lg items-center justify-between' onClick={() => handleSelectF(option)}>
  <div className='flex items-center'>
  <div className='flex flex-col items-center rounded-full bg-[#101010] p-2'>
  <img src={option.logo} className="w-4 h-4" />
    </div>

<div className='ml-2 '>
{option.label}
</div>
</div>
</div>

  </div>

))
      
}

    </div>

    <div className='flex flex-col mt-5'>
    <p className='font-epilogue font-normal text-[16px] text-[#808191]'>Select Duration</p>
        <div className='flex bg-[#EAEDFD] p-2 rounded-lg mt-2 items-center justify-between' onClick={() => setShowD(!showD)}>
       
<div className='ml-2 text-slate-900 '>
    {selectedDuration?.id}
</div>

<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.81296 5.657L0 1.414L1.60507 0L4.81296 2.829L8.02084 0L9.62591 1.414L4.81296 5.657Z" fill="#252525"/>
</svg>
        </div>
       
{showD && filteredD?.map(option => (
  <div className='bg-slate-100 p-2  w-full border-b  dark:border-slate-400'>
  <div className='flex  p-2 rounded-lg items-center justify-between ' onClick={() => handleSelectD(option)}>
  <div className='flex '>

<div className='ml-2 text-[#808191]'>
{option?.id}
</div>
</div>
</div>

  </div>

))
      
}

    </div>

    <div className='flex flex-col mt-5'>
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

    <div className='flex flex-col mt-5'>
    <p className='font-epilogue font-normal text-[16px] text-[#808191]'>Amount in US Dollars</p>
    {amounterror && (<span className='font-sm text-red-500 dark:text-red-400' >{amounterror}</span>)}
        <div className='flex bg-[#EAEDFD] p-2 rounded-lg mt-2 items-center justify-between' >
        <div className='flex '>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

<div className='ml-2 '>
    <input type="number" value={cryptoAmount?.usd} className="outline-none border-none  bg-transparent text-[#252525] font-medium" onInput={(e: React.FormEvent<HTMLInputElement>) => { 
         const inputValue = e.currentTarget.value; // Get the input value as a string
         const numericValue = parseFloat(inputValue); // Convert it to a number
         if (!isNaN(numericValue)) {
           handleAmount(numericValue,selectedOption.id); // Only update the state if it's a valid number
         } else {
           handleAmount(0,selectedOption.id); // Optionally handle invalid input (e.g., set to 0 if invalid)
         }}} />
</div>
</div>
<div className='self-start text-[#252525] font-medium hidden sm:flex'>
  ({cryptoAmount[selectedOption?.id as keyof CryptoPriceState]} {selectedOption?.id?.toUpperCase()})
</div>

        </div>

    </div>

{cryptoAmount?.usd > 0  && !amounterror &&  (
    <>
    <div className='flex flex-col mt-10'>
    <p className='font-epilogue font-normal text-[16px] dark:text-[#808191] text-[#44454e]'>Transaction Summary</p>
    <div className='flex flex-col bg-[#EAEDFD] p-2 rounded-lg mt-2 px-4'>

        <div className='flex  items-center justify-between mt-4' >
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
{cryptoAmount[selectedOption?.id  as keyof CryptoPriceState]}
</div>
        </div>

        <div className='flex  items-center justify-between mt-4' >
        <div className='flex '>
            Total Amount
        </div>
<div className='self-start text-[#252525] font-medium'>
 ${cryptoAmount?.usd?.toLocaleString()}.00
</div>

        </div>

    </div >


    </div>

        <CustomButton 
          btnType="button"
          title={`Pay with ${selectedOption?.id?.toUpperCase()}`}
          styles="bg-[#2947EB] mt-10"
          handleClick={() => handlePayButton()}
     />

    </>
)
}


        </div> 

    </div>

</div>
    </div>
  )
}

export default Deposit