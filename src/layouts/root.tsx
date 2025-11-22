import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Mobilebar from '../components/Mobilebar'
import { useEffect } from 'react'
import { Route, Routes,Navigate } from 'react-router-dom';
import Home from '../pages/home'
import Deposit from '../pages/deposit'
import Topup from '../pages/topup'
import Withdraw from '../pages/withdraw'
import Ledger from '../pages/ledger'
import Topups from '../pages/topups'
import Referrals from '../pages/Referrals'
import Profile from '../pages/Profile'

const Root = () => {
  const lastVisitedURL = localStorage.getItem('lastVisitedURL')

  useEffect(() => {
   localStorage.setItem('lastVisitedURL', window.location.pathname);
 }, [window.location.pathname]);

  return (
    <div className='dark'>
    <div className='w-screen  flex sm:flex-row  flex-col sm:min-w-screen bg-black dark:bg-black  text-white min-h-screen'>
        <div className='hidden h-[93vh] fixed sm:flex mr-10'>
        <Sidebar />
        </div>
        <div className='flex flex-col w-screen sm:px-16 p-4 max-sm:w-full xl:pl-[3%] xl:pr-[3%]  sm:ml-20 mx-auto sm:pr-5'>
        <Navbar/>
        <Routes>

<Route path="/" element={<Home/>} />
<Route path="/profile" element={<Profile/>} />
<Route path="/referrals" element={<Referrals/>} />
<Route path="/deposit" element={<Deposit/>} />
<Route path="/withdraw" element={<Withdraw/>} />
<Route path="/topup" element={<Topup/>} />
<Route path="/topups" element={<Topups/>} />
<Route path='/ledger' element={<Ledger/>} />
<Route path="*" element={<Navigate to="/" />} />
<Route path={lastVisitedURL || "*"} element={<Navigate to={lastVisitedURL || "/"} />} />
</Routes>
        <Mobilebar/>
        </div>
        
    </div>
    </div>
  )
}

export default Root