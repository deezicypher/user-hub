import { loader } from '../assets/images'

const Loader = () => {
  return (
    <div className='fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-flex'>
      <div className='flex flex-col items-center justify-center gap-5'>
      <div className="h-20 w-20">
      😎
        </div>
      <img src={loader} alt="" />
      </div>
    </div>
  )
}

export default Loader