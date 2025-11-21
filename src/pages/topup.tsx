import {useState, useEffect} from 'react'
import CustomButton from '../components/CustomButton';
import TopupM from '../components/root/topup/TopUp';
import { getAPI } from '../utils/fetchData';
import moment from 'moment';
import PlanModal from '../components/root/modal/Plan';
import {useQuery} from 'react-query';

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
  }
  
  interface PlansData {
    simple: Plan[];
    compound: Plan[];
  }


const Topup = () => {

    

    
    const plans:PlansData = {
      simple: [{
        id:1,
        amount: 52000,
        type: "SIMPLE_INTEREST",
        createdAt:"2024-12-12 01:45:23.656",
        amountcrypto:0.00038,
        method:"ETHEREUM",
        profit:60000,
        expirationDate:"2025-06-12",
        Plan: {
          expirationDate:"2025-06-12 01:45:23.656"
        }
      }],
      compound:[{
        id:2,
        type: "DEPOSIT",
        method:"BITCOIN",
        amount: 100000,
        amountcrypto:0.000012,
        profit:240000,
        createdAt:"2024-12-09 22:43:19.838",
        expirationDate:"2025-06-09 22:43:19.838",
        Plan:{
          expirationDate:"2025-06-09 22:43:19.838"
        }
      }]
    }
    const [data, setData] = useState<Plan | null>(null)
    const [showM, setShowM] = useState<boolean>(false)
    const [showD, setShowD] = useState<boolean>(false)
    const [plan, setPlan] = useState<Plan | null>(null)

// const {data:plans,refetch:getPlans} = useQuery<PlansData>('getPlans', async () => {
//   const res = await getAPI('/plans-api')
//   const simple = res.data.filter((x:any) => x.type==="SIMPLE_INTEREST")
//   const compound = res.data.filter((x:any) => x.type==="COMPOUND_INTEREST")
//   return {simple, compound}
// },{
//   onError: (error) => {
//     console.log(error)
//   }
// })


const handleShowM = (data:Plan) => {
  setData(data)
  setShowM(true)
}

const handleShowD = (data:Plan) => {
  setPlan(data)
  setShowD(true)
}

useEffect(() => {
  //getPlans()
},[])
  return (
    <div className='font-epilogue text-[#e7d09d] mt-10 sm:mt-5 text-xl sm:text-2xl'>Topup
  <div>
        {showM  && data !== null && (
           
       <TopupM  plan={data} setShowM={setShowM}/>
       
        )}
 
 {showD && plan !== null && (
       <PlanModal  data={plan} setShowD={setShowD}  />
        )}

   
    <div className='flex  mt-[20px] '>
    


            <div className='flex gap-10 flex-col xl:flex-row items-start w-full '>
      
             <div className=' dark:bg-[#101010] bg-slate-00 h-min w-full shadow-secondary rounded-3xl py-5 px-5 ]'>
             <h3 className='font-epilogue font-semibold text-[18px] text-slate-600 dark:text-slate-200 text-left'>
  Simple Interest        
    </h3>
             <div className="mt-4 -mb-3">
    <div className="not-prose relative bg-slate-50 rounded-xl  dark:bg-[#101010]">
  
    <div className="relative rounded-xl border  border-[#4b4333] max-h-[500px] sm:max-h-[800] overflow-y-auto"><div className="shadow-sm  my-8">
       
    <table className="border-collapse table-auto w-full text-sm  ">
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
        {plans?.simple?.map( (simple,index) => (
                    <tr key={index}>
                 
                    <td className=" border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"><div className='flex items-center gap-3'> <div className='w-4 h-4'>😎</div>{simple?.type === "SIMPLE_INTEREST" ? "Simple Interest" : "Compound Interest" }</div></td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">${simple.amount?.toLocaleString()}.00</td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">{ moment(simple.createdAt).format("MMM Do YY")}</td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">{ moment(simple.Plan?.expirationDate).format("MMM Do YY")}</td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400"><CustomButton title="View Details" handleClick={() => handleShowD(simple)} styles="bg-[#2947EB] min-h-[35px] text-xs"/></td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400"><CustomButton title="Top Up" handleClick={() => handleShowM(simple)} styles="bg-[#2947EB] min-h-[35px] text-xs"/></td>
                  </tr>
        )
    )
 }
  
       
    </tbody>
  </table>
</div></div><div className="absolute inset-0 pointer-events-none border border-black/5 rounded-xl dark:border-white/5"></div></div></div>
</div>
             <div className=' dark:bg-[#101010] bg-slate-00 h-min w-full shadow-secondary rounded-3xl py-5 px-5 ]'>
             <h3 className='font-epilogue font-semibold text-[18px] text-slate-600 dark:text-slate-200 text-left'>
   Compound Interest 
    </h3><span className='text-sm text-slate-400'>You can't topup compound interest</span>
             <div className="mt-4 -mb-3">
    <div className="not-prose relative bg-slate-50 rounded-xl  dark:bg-[#101010]">
  
    <div className="relative rounded-xl max-h-[500px] border  border-[#4b4333] sm:max-h-[800] overflow-y-auto"><div className="shadow-sm  my-8">
    <table className="border-collapse table-auto w-full text-sm ">
    <thead>
      <tr>
        <th className="border-b dark:border-[#4b4333] font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Name</th>
        <th className="border-b dark:border-[#4b4333] font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Amount</th>
        <th className="border-b dark:border-[#4b4333] font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">On</th>
        <th className="border-b dark:border-[#4b4333] font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Expires</th>
        <th className="border-b dark:border-[#4b4333] font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Action</th>
      </tr>
    </thead>
    <tbody className="bg-white dark:bg-[#101010]">
        {plans?.compound?.map( (compound, index) => (
                    <tr key={index}>
                    <td className=" border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"><div className='flex items-center gap-3'> <div className='w-4 h-4'>😎</div>{compound?.type === "SIMPLE_INTEREST" ? "Simple Interest" : "Compound Interest" }</div></td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">${compound?.amount?.toLocaleString()}.00 </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">{ moment(compound?.createdAt).format("MMM Do YY")}</td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">{ moment(compound?.Plan?.expirationDate).format("MMM Do YY")}</td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400"><CustomButton title="Top Up" handleClick={() => handleShowM(compound)} styles="bg-[#2947EB] min-h-[35px] text-xs"/></td>
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

export default Topup