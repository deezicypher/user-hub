import { StrictMode } from 'react'
import ReactDom from 'react-dom/client';
import { BrowserRouter  } from 'react-router-dom';
import 'aos/dist/aos.css';
import './index.css'
import App from './App';
import { StateContextProvider } from './context/userContext';
import {Toaster} from 'react-hot-toast'
import {QueryClientProvider, QueryClient} from 'react-query'


const queryClient = new QueryClient(
  {
     defaultOptions:{
        queries:{
           refetchOnMount:true,
           refetchOnWindowFocus: false,
        }
     }
  }
)
//@ts-ignore
const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <StrictMode>
  <QueryClientProvider client={queryClient}>
    <StateContextProvider>
      <Toaster />
      <App />
       </StateContextProvider>
</QueryClientProvider>
    
  </StrictMode>
  </BrowserRouter>
)
