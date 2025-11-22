import React from 'react'

interface FormFieldProps {
    labelName:string;
    placeholder:string;
    inputType:string;
    isTextArea?:boolean;
    defaultValue:string;
    value?:string;
    disabled?:boolean;
    handleChange:(e:React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    required?: boolean;
}

const FormField :React.FC<FormFieldProps> = ({labelName,placeholder,disabled=false,inputType,isTextArea,defaultValue,value,handleChange, required }) => {
  return (
    <label className='flex-1 w-full flex flex-col'>
        {labelName && (
            <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191]">
                {labelName}
            </span>
        )}
        {
            isTextArea? (
                <textarea
                required={required}
                value={value}
                onChange={handleChange}
                rows={10}
                placeholder={placeholder}
                className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#4b4333]
                bg-transparent font-epilogue text-[#4b5264] dark:text-white text-[14px]
                placeholder-text-[#4b5264] dark:placeholder-text-white rounded-[10px] sm:min-w-[300px]"
                />
            )
            :
            (
                <input 
                required={required}
                value={value}
                defaultValue={defaultValue}
                onChange={handleChange}
                type={inputType}
                disabled={disabled}
                step="0.1"
                placeholder={placeholder}
                className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#4b4333]
                bg-transparent font-epilogue text-white text-[14px]
                placeholder:text-[#4b5264] rounded-[10px]  sm:min-w-[300px]"
                />
            )
        }
    </label>
  )
}

export default FormField