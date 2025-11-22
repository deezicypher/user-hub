import React, { useEffect, useState } from 'react';
import CountdownCounter from './Counter';
import { loader } from '../../../assets/images';
import Web3 from 'web3';
import { postAPI } from '../../../utils/fetchData';
import { useStateContext } from '../../../context/userContext';
import { nanoid } from 'nanoid'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserContextProps } from '../../../types';
import {QRCodeSVG} from 'qrcode.react';


interface OptionsProps {
    id:number,
    type:string
}

interface PayProps{
    data: {handleSetPayF: () => void,
    pay:boolean,
    selectedOption:string,
    plan:string | OptionsProps,
    duration?:number,
    label:string,
    msg:string,
    amount:number,
    cryptoAmount:number,
    topup?:boolean,
    }
}

export interface payStateProps {
    load:boolean,
    paid:boolean,
    received:boolean,
    msg?:string
}
interface payInfoProps {
    method:string,
    qcode: string,
    address:string,
    amountCrypto: number,
    amountDollar: number,
}

interface Transaction {
    to: string | null;
    value: string;
    hash: string;
  }
  


  
const Pay:React.FC<PayProps> = ({data }) => {
    const {handleSetPayF,plan,topup,cryptoAmount,label, msg,amount,duration, selectedOption} = data
    const {user} = useStateContext() as UserContextProps
    const [payState, setPayState] = useState<payStateProps>({
        load:false,
        paid:false,
        received:false,
        msg: "Awaiting Confirmation"

    })
    const [loading, setLoading] = useState<boolean>()
    const [payInfo, setPayInfo] = useState<payInfoProps>({
        method:"",
        qcode: "",
        address:"",
        amountCrypto: 0,
        amountDollar: 0,
    })


    const [txid, setTxid] = useState<string>()
    const addr = "bc1q43lh2adfm29ksh5akj2cxu0ua7jzfp7je9wqnu"
const ethAddress = "0xe7F819c7f66426Ba52203fE4Acf0faa10315462C"



    const timeoutCookie = Cookies.get('timeout');
    const timeout = timeoutCookie ? JSON.parse(timeoutCookie) : 0;

   
    const [remainingTime, setRemainingTime] = useState<number>(timeout - new Date().getTime());

    

    const targetDate = new Date().getTime() + 45 * 60 * 1000;

    const navigate = useNavigate()

   
    

const manualPay =   async () => {
    setRemainingTime(timeout - new Date().getTime());
    if(remainingTime > 0 ) return toast.error(`Please wait ${secondsRemaining} seconds to resubmit again`)
    const payD = {amount: payInfo.amountDollar,amountcrypto: payInfo?.amountCrypto,method:payInfo?.method,plan,topup,duration,id:user?.id, desc:"DEPOSIT", txid:txid?txid:nanoid()}
    const topD = {amount: payInfo.amountDollar,amountcrypto: payInfo?.amountCrypto,method:payInfo?.method,planId:(plan as OptionsProps).id,id:user?.id,type:(plan as OptionsProps).type, desc:"TOPUP",status:"PENDING", txid:txid?txid:nanoid()}
   
    if(!txid) return toast.error("No Transaction ID")
   if(topup === true) {
    try{
         //await postAPI('/topup-api',topD)

        setPayState(prev => ({...prev,
            paid:true,
            load:false,
            received:true,
        }))

        navigate('/topups')

}catch(err){
    console.log(err)
}
   } else {
    try {
         await postAPI('/deposit-api',{...payD,status:"PENDING",txid})
        toast.success("Submitted Successfully")
        const targetDate = new Date().getTime() + 30 * 60 * 1000;
        Cookies.remove('timeout')
        Cookies.set('timeout',JSON.stringify(targetDate))
        setRemainingTime(targetDate - new Date().getTime());
        setTimeout(() => {
        navigate('/ledger')
        }, 3000);
       } catch (error:any) {
        console.log(error)
       }    
    }
}





  const secondsRemaining = Math.ceil(remainingTime / 1000);

 



  /*const testPay = () => {
    //const payD = {amount: 3500,amountcrypto: ,method:payInfo?.method,plan,topup,duration,id:user?.id, desc:"DEPOSIT", txid:txid?txid:nanoid()}
  }*/
  
    const postPay = async (txid:string, btcv:number) => {
        const topD = {amount: payInfo.amountDollar,amountcrypto: payInfo?.amountCrypto,method:payInfo?.method,planId:(plan as OptionsProps).id,id:user?.id, desc:"TOPUP", txid:txid?txid:nanoid()}
        const payD = {amount: payInfo.amountDollar,amountcrypto: payInfo?.amountCrypto,method:payInfo?.method,plan,topup,duration,id:user?.id, desc:"DEPOSIT", txid:txid?txid:nanoid()}
       setPayState(prev => ({...prev, load:true}))
       if(topup === true) {
        try{
             await postAPI('/topup-api',topD)
            setPayState(prev => ({...prev,
                paid:true,
                load:false,
                received:true,
            }))
            console.log(btcv)

    }catch(err){
        console.log(err)
    }
       } else {
        try{
             await postAPI('/deposit-api',payD)
            setPayState(prev => ({...prev,
                paid:true,
                load:false,
                received:true,
            }))

    }catch(err){
        console.log(err)
    }
    }
}
    //@ts-ignore
    const updateOrder = (txid:string) => {
    }

   
    const realtimebtc = async () => {
        const socket = new WebSocket(`wss://www.blockonomics.co/payment/${addr}`)

        //@ts-ignore
        socket.addEventListener('open', function (event:any) {
        });

        socket.addEventListener('message', event => {
            const result = JSON.parse(event.data)

            const btcValue = result.value / 100000000
            const txid = result.txid

            if (parseFloat(btcValue.toFixed(4)) === payInfo?.amountCrypto) {

               
                setPayState({
                    paid:true,
                    load:true,
                    received:false
                })
                postPay(txid,btcValue)
            }
            if (payState?.received && result.status === 1) {

                setTimeout(() => {
                    setPayState(prev => ({...prev, received:true, load:false}))
                    updateOrder(txid)
                }, 6000)

            }
        });
        socket.addEventListener('error', (err:any) => {
            console.log('Socket is closed. Reconnect will be attempted in 1 second.', err.message);
            setTimeout(() => {
                realtimebtc()
            }, 10000);
        });
    }

    const web3 = new Web3('https://cloudflare-eth.com');
    const realtimeETH = async () => {
        const cryptoAmountWei = web3.utils.toWei(cryptoAmount, 'ether');
      
        const subscription = await web3.eth.subscribe('newBlockHeaders');
        subscription.on('data', async (blockHeader) => {
          const block = await web3.eth.getBlock(blockHeader.number, true);
          block.transactions.forEach((transaction: any) => {
            const tx = transaction as Transaction;
            if (tx.to === ethAddress && tx.value === cryptoAmountWei) {
              console.log(`Payment of ${web3.utils.fromWei(tx.value, 'ether')} ETH received`);
              postPay(tx.hash, amount);
            }
          });
        });
      };

    const btcpayment = async (btc:number, label:string, msg:string, amount:number) => {
       
        const amountE = encodeURIComponent(btc)
        const labelE = encodeURIComponent(label)
        const msgE = encodeURIComponent(msg)

        //const key = "2000cffd-05e6-424b-ac15-acac3028618e"
        //const xub = "Zpub6xrTAPJcKRbhH9gQr7qZDY6AzsSkXGkHVFwjhTwmTN5x5GShyqZ42sk6PsNUdfcY9KR3ALyZzYKWEtYva4Sx1qHFxu2HAP7GGRyER9Bgq2b"
        //const callback = `https://userhub.org/`
        //const res = encodeURIComponent(callback)
        //const url = `https://api.blockchain.info/v2/receive?xpub=${xub}&callback=${res}&key=${key}`



        try{
            setLoading(true)
            const address = 'bc1q43lh2adfm29ksh5akj2cxu0ua7jzfp7je9wqnu'
            
            const qUrl = `https://chart.googleapis.com/chart?chs=225x225&chld=L|2&cht=qr&chl=bitcoin:${address}?amount=${amountE}&label=${labelE}%26message=${msgE}`
        
           const x = setInterval(() => {
            let now = new Date().getTime();

            const timeout = targetDate - now

            if(timeout < 0){

                clearInterval(x)
                if(!payState?.paid){
                handleSetPayF()
                }
            }
           }, 1000);

           
            setPayInfo({qcode:qUrl,address,amountCrypto:btc,amountDollar:amount, method:"BITCOIN"})

   
        }catch(err) {
            console.log(err)
        }
        
    }


    const ethpayment = (eth:number, label:string, msg:string, amount:number) => {
        setLoading(true)
        const amountE = encodeURIComponent(eth)
        const labelE = encodeURIComponent(label)
        const msgE = encodeURIComponent(msg)

        const address = '0x04641a162c94e80CCD9AB96C75bfc2e77254a566'
        const qUrl = `https://chart.googleapis.com/chart?chs=225x225&chld=L|2&cht=qr&chl=ethereum:${address}?value=${amountE}&label=${labelE}%26message=${msgE}`;

        try{
            
                 
        
            const x = setInterval(() => {
                let now = new Date().getTime();
    
                const timeout = targetDate - now
    
                if(timeout < 0){
    
                    clearInterval(x)
                    handleSetPayF()
                }
               }, 1000);
    
               
                setPayInfo({qcode:qUrl,address,amountCrypto:eth,amountDollar:amount,method:"ETHEREUM"})
                realtimeETH()
    
       
            }catch(err) {
                console.log(err)
            }
            

    }

    const usdtpayment = (usdt:number, label:string, msg:string, amount:number) => {
        setLoading(true)
        const amountE = encodeURIComponent(usdt)
        const labelE = encodeURIComponent(label)
        const msgE = encodeURIComponent(msg)

        const address = 'TBnmtapQJgrTcJ5HySuuEUxjqvDU8sWWh6'
        const qUrl = `https://chart.googleapis.com/chart?chs=225x225&chld=L|2&cht=qr&chl=ethereum:${address}?value=${amountE}&label=${labelE}%26message=${msgE}`;

        try{
            const x = setInterval(() => {
                let now = new Date().getTime();
    
                const timeout = targetDate - now
    
                if(timeout < 0){
    
                    clearInterval(x)
                    handleSetPayF()
                }
               }, 1000);
                setPayInfo({qcode:qUrl,address,amountCrypto:usdt,amountDollar:amount,method:"USDT"})
       
            }catch(err) {
                console.log(err)
            }
            

    }

    const usdcpayment = (usdc:number, label:string, msg:string, amount:number) => {
        setLoading(true)

        const amountE = encodeURIComponent(usdc)
        const labelE = encodeURIComponent(label)
        const msgE = encodeURIComponent(msg)
        const address = '0xFb9C4a62885aCaf7ff68C6AaB879923df85a3526'
        console.log(amount, labelE, msgE, address)
        const qUrl = `https://chart.googleapis.com/chart?chs=225x225&chld=L|2&cht=qr&chl=${address}?value=${amountE}&label=${labelE}%26message=${msgE}`;

        try{
            const x = setInterval(() => {
                let now = new Date().getTime();
    
                const timeout = targetDate - now
    
                if(timeout < 0){
    
                    clearInterval(x)
                    handleSetPayF()
                }
               }, 1000);
                setPayInfo({qcode:qUrl,address,amountCrypto:usdc,amountDollar:amount,method:"USDC"})
       
            }catch(err) {
                console.log(err)
            }
    }
    
    useEffect(() => {
        
        window.scroll(0,0)

        if(selectedOption==="BTC"){
            btcpayment(cryptoAmount,label,msg,amount) 
        }
        if(selectedOption === "ETH"){
            ethpayment(cryptoAmount, label,msg,amount)
        }
        if(selectedOption === "USDT"){
            usdtpayment(cryptoAmount, label,msg,amount)
        }
        if(selectedOption === "USDC"){
            usdcpayment(cryptoAmount, label,msg,amount)
        }

    },[])

   

  return (
    <div className="sm:fixed inset-0 flex items-center justify-center z-50 ">
        <div className="fixed inset-0 bg-black opacity-80">    </div>

        <div className='dark:bg-[#101010] w-[300px] sm:w-max bg-slate-50 shadow-secondary rounded-3xl sm:py-5 px-5 z-10'>
      
  
        <div className='flex flex-col  justify-center items-center p-2 rounded-lg mt-2 px-2'>
             {topup && (<div className='dark:text-slate-400'>Top Up</div>)} 
            <div className='flex self-end cursor-pointer mb-5' onClick={() => handleSetPayF()}>
            <div className='flex rounded-full bg-[#101010] w-max  '>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
</div>
            </div>
            <div className='flex flex-col justify-center items-center'>
           
            <p className='font-epilogue font-normal text-xs sm:text-sm text-[#808191] text-center '>Scan the QR code below or copy the {selectedOption} address to make payment</p>
                <div className='flex flex-col justify-center mt-2 sm:mt-4 items-center bg-[#EAEDFD] p-2 rounded-lg'>
                    <div className='flex items-center mb-2'>
                    <div className='flex flex-col items-center rounded-full  bg-[#101010] '>
                    😎
                        </div>
                    <span className='font-epilogue text-xs text-center text-[#808191] ml-2'>UserHub</span></div>
                    
                    <QRCodeSVG value={`bitcoin:${payInfo?.address}?amount=${payInfo?.amountCrypto}&label=${label}&message=${msg}`} className='w-50 h-50 sm:w-[300px] md:h-[300px] p-2 rounded-lg' />
                
                  <p className='font-epilogue sm:text-sm text-xs text-center text-[#808191] w-40 sm:w-64 break-words sm:mt-5'>{payInfo?.address}</p>
            </div>
            </div>
       
        {
          loading && (
            <img src={loader} alt="....."  className='h-[50px] w-[50px] sm:w-[80px] sm:h-[80px] object-contain'/>
          )
        }
       
        <CountdownCounter targetDate={targetDate}  />
    
        <p className='font-epilogue font-normal text-xs text-[#808191] text-center mt-3'>Payments below <span className='text-xs font-epilogue text-[#4acd8d]'>${payInfo?.amountDollar} ({payInfo?.amountCrypto} {selectedOption})</span> will not be accepted</p>
        <div className='flex justify-between items-center gap-4 sm:gap-10'>
            <div className='flex flex-col justify-center items-center cursor-pointer'>
            <div className='flex rounded-full bg-gradient-to-r from-[#f6b430]  via-[#d38448] to-[#fe9240] text-white w-max p-2 sm:mt-5'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5div.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                  </svg>
            </div>
            <p className='font-epilogue text-xs text-[#808191] text-center mt-2'>
        Copy Address
            </p>
            </div>

            <a className='flex flex-col justify-center  items-center cursor-pointer' href={`bitcoin:${payInfo?.address}?amount=${payInfo?.amountCrypto}&label=userhub.org&message=Finrie%20${encodeURI(msg)}`} >
            <div className='flex rounded-full bg-gradient-to-r from-[#f6b430]  via-[#d38448] to-[#fe9240] text-white  w-max p-2 sm:mt-5'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"  stroke="currentColor" className="w-6 h-6 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
</svg>
</div>
            <p className='font-epilogue text-xs text-[#808191] text-center mt-2'>
        Connect Mobile Wallet
            </p>
            </a>

        </div>

        <hr className='mt-2' />
            <p className='font-epilogue font-normal text-xs text-[#808191] text-center '> Or manually register payment by Inputting Transaction ID below</p>
            <div className='flex flex-col gap-5  mt-2'>
           <input className='border w-[250px] sm:w-[300px] text-black outline-none rounded-md px-2 py-2 text-xs' defaultValue={txid} placeholder='e.g: 2bf5aa4e2b4c4c63bf4ee61e920536fbbe8aa0e7b90e684a9e0a40e2a5e8cfc7'  onChange={(e) => setTxid(e.currentTarget.value)} />
     {remainingTime > 0 && <p className='font-epilogue font-normal text-xs text-[#c87b52] text-center sm:mt-3'>Please wait {secondsRemaining} seconds to resubmit again</p> }
           <button className={`bg-[#2947EB] py-2 px-5 rounded-md text-white text-xs ${remainingTime > 0 ?'cursor-not-allowed' : 'cursor-pointer'}`} type="button" disabled={remainingTime > 0} onClick={() => manualPay()} >{remainingTime > 0 ? `Please wait ${secondsRemaining} ` : `I've made payment` }</button>
           </div>
        </div>


    </div>
    </div>
  )
}

export default Pay