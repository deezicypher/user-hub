import React,{useState, useEffect} from 'react'
import CustomButton from '../../CustomButton';
import axios from 'axios';
import Pay from '../payment/Pay';
import { OptionsProps, options } from '../../../pages/deposit';

interface PlanProps {
  id:number,
  amount: number;
  type: string;
  createdAt: string;
  amountcrypto:number;
  method:string;
  profit:number;
  expirationDate:string;
}
interface TopupMProps{
  plan:PlanProps;
  setShowM: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CryptoPriceState {
  btc:number;
  usdt:number;
  eth:number;
}
interface CryptoAmountState {
  btc: number;
  usdt: number;
  eth: number;
  usd: number;
  usdc?: number;
}

const TopupM:React.FC<TopupMProps> = ({plan, setShowM}) => {

    const [selectedOption, setSelectedOption] = useState<typeof options[0]>(options[0]);
    const [pay, setPay] = useState<boolean>(false)
    const [cryptoprice, setCryptoPrice] = useState<CryptoPriceState>({
        btc:0,usdt:0,eth:0
    })
    const label = "https://userhub.org"
    const [show, setShow] = useState<boolean>(false);
    const [cryptoAmount, setCryptoAmount] = useState<CryptoAmountState>({
        'btc':0,'usdt':0,'eth':0,'usd':0
    })

    
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
              setCryptoPrice({btc:btcToUsd, usdt:tether, eth:eth})
         
        } catch (error:any) {
          console.log('Error:', error.message);
          throw error;
        }
      }

      const handleAmount = (amount:number, id:string) => {
        setCryptoAmount(prev => ({...prev, [id]:(amount/cryptoprice[id as keyof CryptoPriceState]).toFixed(4),usd:amount}))   
      }
  
     
    const handleSelect = (option:OptionsProps) => {
      setSelectedOption(option);
      setCryptoAmount(prev => ({...prev, [option.id]:(cryptoAmount.usd/cryptoprice[option.id as keyof CryptoPriceState]).toFixed(4),usd:cryptoAmount.usd})) 
      setShow(false)
    };

    const handleSetPayF = () => {
        setPay(false)
        setCryptoAmount({'btc':0,'usdt':0,'eth':0,'usd':0})
      }

    const filteredOptions = options.filter((option) => option?.id !== selectedOption?.id);


    useEffect(() => {
        BTC()
    },[])

  return (

            <div className="fixed inset-0 flex items-center justify-center z-50 px-10">
    <div className="fixed inset-0 bg-black opacity-80">    </div>
<div className='flex top-0  justify-center '>

{pay?
<Pay data={{handleSetPayF,pay,selectedOption:selectedOption?.id?.toUpperCase(),label,msg:plan.type,amount:cryptoAmount?.usd, cryptoAmount: cryptoAmount[selectedOption?.id as keyof CryptoPriceState],plan,topup:true}}/>   
:
    <div className='dark:bg-[#101010] bg-slate-50 shadow-secondary rounded-3xl py-5 px-5 z-10'>
    <div className='w-full sm:w-[500px] flex flex-col justify-center items-center' >
        <div className='flex flex-row w-full justify-between'>
    <div className='dark:text-slate-400'>Top Up</div>
    <div className='flex self-end cursor-pointer mb-10' >
        
    <div className='flex rounded-full bg-[#EAEDFD] w-max ' onClick={() => setShowM(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-slate-900">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
</div>
</div>
</div>


<div className='flex flex-col w-full'>
   
<div className='flex mb-5 flex-row justify-between'>

<div className="flex border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"><div className='flex  gap-3'> <div className='w-4 h-4'>😎</div> {plan?.type === "SIMPLE_INTEREST" ? "Simple Interest" : "Compound Interest" }</div></div>
        <div className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">${plan?.amount}.00</div>


</div>



<div className='flex flex-col  mt-5'>
<p className='font-epilogue font-normal text-[16px] text-[#808191]'>Select Payment Method</p>
<div className='flex bg-[#EAEDFD] p-2 rounded-lg mt-2 items-center justify-between' onClick={() => setShow(!show)}>
<div className='flex '>
<img src={selectedOption?.svg} />
<div className='ml-2 text-slate-800 '>
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
<div className='flex bg-[#EAEDFD] p-2 rounded-lg mt-2 items-center justify-between' >
<div className='flex '>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-slate-900">
<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

<div className='ml-2 '>
<input type="number" className="outline-none border-none  bg-transparent text-[#252525] font-medium" onInput={(e: React.FormEvent<HTMLInputElement> ) =>
  {const inputValue = e.currentTarget.value; //get input value as a string
    const numericValue = parseFloat(inputValue) //convert to number
    if (!isNaN(numericValue)) {
      handleAmount(numericValue,selectedOption.id); // Only update the state if it's a valid number
    } else {
      handleAmount(0,selectedOption.id); // Optionally handle invalid input (e.g., set to 0 if invalid)
    }
  }} />
</div>
</div>
<div className='self-start text-[#252525] font-medium hidden sm:flex'>
({cryptoAmount[selectedOption?.id as keyof CryptoPriceState]} {selectedOption?.id?.toUpperCase()})
</div>

</div>

</div>

{cryptoAmount.usd > 1 && (
<>
<div className='flex flex-col mt-10'>
<p className='font-epilogue font-normal text-[16px] dark:text-[#808191] text-[#44454e]'>Transaction Summary</p>
<div className='flex flex-col bg-[#EAEDFD] text-slate-900 p-2 rounded-lg mt-2 px-4'>

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
{cryptoAmount[selectedOption?.id as keyof CryptoAmountState]}
</div>
</div>

<div className='flex  items-center justify-between mt-4' >
<div className='flex '>
    Total Amount
</div>
<div className='self-start text-[#252525] font-medium'>
${cryptoAmount?.usd}
</div>

</div>

</div >


</div>

<CustomButton 
  btnType="button"
  title={`Top up with ${selectedOption?.id?.toUpperCase()}`}
  styles="bg-[#2947EB] mt-10"
  handleClick={() => setPay(true)}
  //onClick={() => handlePayment(selectedOption?.id?.toUpperCase(),label,selectedFOption?.label,cryptoAmount?.usd)}
/>

</>
)
}


</div> 




</div>
</div>
}
</div>
</div>
  
  )
}

export default TopupM