import React from 'react'

interface SectionProps {
    className?:string,
    children:React.ReactNode
}
const Section: React.FC<SectionProps> = ({className,children}) => {

  return (
    <div className={`py-10 px-4 sm:px-10 lg:py-16 xl:py-20 flex flex-col justify-center items-center mt-10 sm:mt-5 ${className}`}>
  
        {children}
       
    </div>
  )
}

export default Section