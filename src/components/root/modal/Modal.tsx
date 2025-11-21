import React from 'react'
import CustomButton from '../../CustomButton'

interface ModalProps {
  msg:string;
  btnTitle:string;
  svg:React.ReactNode;
  btnstyle:string;
  action: () => void;
  topAction:React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal:React.FC<ModalProps> = ({msg, btnTitle, svg, btnstyle, action, topAction }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="fixed inset-0 bg-black opacity-50">    </div>
<div className='flex top-0  justify-center '>
    <div className='dark:bg-[#101010] bg-slate-50 shadow-secondary rounded-3xl py-5 px-5 z-10'>
    <div className='w-full sm:w-[500px] flex flex-col justify-center items-center' >
    <div className='flex self-end cursor-pointer mb-10' onClick={() => topAction(false)}>
<div className='flex rounded-full bg-[#101010] w-max  '>
{svg}
</div>
</div>
<div className='flex  rounded-full bg-[#101010]  w-max  p-1'>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-20 h-20 text-[#f6b430]">
<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
</svg>
</div>
<div className='font-epilogue text-sm sm:text-lg dark:text-white text-[#808191] mt-10'>{msg}</div>


<CustomButton 
title={btnTitle}
btnType="button"
styles={` ${btnstyle} mt-10`}
handleClick={() => action()}
/>

</div>
</div>
</div>
</div>
  )
}

export default Modal