import { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts'

import { loader } from '../../assets/images';

interface CryptoData {
  usd: number;
  bnb: number;
  eth: number;
  usd_24h_change: number;
}

interface CryptoResponse {
  bitcoin: CryptoData;
  binancecoin: CryptoData;
  tether: CryptoData;
  ethereum: CryptoData;
}

// Define the shape of the data you're storing in state
interface FormattedCryptoData {
  id: string;
  price: number;
  value: number;
  change: number;
}

const CryptoWatchlist = () => {
  const [data, setData] = useState<FormattedCryptoData[]>([]);
  const [loading , setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try{
      const response = await axios.get<CryptoResponse>('https://api.coingecko.com/api/v3/simple/price', {
        params: {
          ids: 'bitcoin,binancecoin,tether,ethereum',
          vs_currencies: 'usd,btc,bnb,eth,usdc',
          include_24hr_change: true,
        },
      });
  
      const btcToUsd = response.data.bitcoin.usd;
      const formattedData: FormattedCryptoData[]  = Object.entries(response.data).map(([id, crypto]) => {
        const price = crypto.usd;
        let value = 0;

  

        if (id === 'bitcoin') {
          value = price / btcToUsd;
        } else if (id === 'binancecoin') {
          value = price / crypto.bnb;
        } else if (id === 'tether') {
          value = price / crypto.usd;
        } else if (id === 'ethereum') {
          value = price / crypto.eth;
        }
  
        return {
          id,
          price,
          value,
          change: crypto.usd_24h_change,
        };


      });
  
  


      setData(formattedData);
      setLoading(false)
    }catch (err) {
      console.log(err)
      setLoading(false)
    }
    };
    
    fetchData();
  }, []);
  


  /*const getCryptoValue = (usdPrice:number, cryptoPriceUSD:number) =>{
    const value = usdPrice / cryptoPriceUSD;
    return value.toFixed(8);
  }*/

  const getPriceChangeColor = (change:number) => {
    if (change > 0) {
      return 'green';
    } else if (change < 0) {
      return 'red';
    } else {
      return 'black';
    }
  };

  const icons = {
    bitcoin:  <svg width="51" height="50" viewBox="0 0 51 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M49.256 31.0536C48.0588 35.8507 45.466 40.1851 41.8055 43.5088C38.145 46.8324 33.5812 48.996 28.6911 49.726C23.801 50.456 18.8043 49.7196 14.3327 47.6099C9.86112 45.5002 6.11551 42.112 3.56947 37.8737C1.02343 33.6353 -0.208699 28.7372 0.0288883 23.7987C0.266476 18.8601 1.96311 14.1029 4.90425 10.1285C7.84539 6.15418 11.899 3.14117 16.5524 1.47048C21.2059 -0.200204 26.2502 -0.453537 31.0476 0.742512C34.2341 1.53602 37.233 2.94969 39.8729 4.90273C42.5128 6.85578 44.742 9.30991 46.4329 12.1249C48.1239 14.9398 49.2436 18.0604 49.728 21.3083C50.2124 24.5562 50.052 27.8677 49.256 31.0536Z" fill="#F7931A"/>
    <path d="M36.0271 21.4425C36.5229 18.1146 33.9896 16.3217 30.5259 15.1331L31.6533 10.6235L28.9367 9.9443L27.8432 14.3317L25.6156 13.8359L26.7158 9.42135L23.9992 8.74219L22.8785 13.2518C22.2809 13.116 21.6968 12.9802 21.1263 12.8375L17.3434 11.8935L16.6167 14.8207C16.6167 14.8207 18.6542 15.2893 18.6066 15.3165C18.9867 15.3609 19.3339 15.5533 19.573 15.8522C19.812 16.151 19.9236 16.532 19.8834 16.9125L18.5998 22.0674L16.8068 29.2597C16.7711 29.3882 16.7099 29.5081 16.6267 29.6124C16.5436 29.7166 16.4403 29.803 16.323 29.8664C16.2057 29.9298 16.0768 29.9689 15.9441 29.9814C15.8113 29.9938 15.6774 29.9794 15.5504 29.9389C15.5504 29.9796 13.5536 29.4431 13.5536 29.4431L12.1953 32.5876L15.7677 33.4773C16.4469 33.6403 17.0785 33.8169 17.7169 33.9799L16.5827 38.5371L19.2994 39.2162L20.4268 34.7066C21.1738 34.9103 21.9006 35.0937 22.6069 35.2703L21.4863 39.7596L24.2029 40.4387L25.3439 35.8883C30.0165 36.7712 33.5414 36.4181 35.0152 32.1869C36.2105 28.7911 34.9609 26.8147 32.4955 25.5311C34.2885 25.1168 35.64 23.9351 36 21.5037L36.0271 21.4425ZM29.7585 30.2309C28.9095 33.6267 23.1774 31.7998 21.3165 31.3312L22.8174 25.2934C24.6783 25.7552 30.6414 26.6517 29.7585 30.2309ZM30.6074 21.4018C29.8332 24.5056 25.0587 22.9299 23.5102 22.5428L24.8685 17.0619C26.4238 17.4355 31.4156 18.1554 30.6074 21.3882V21.4018Z" fill="#EAEDFD"/>
    </svg>,
    bnb:<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 9.2261e-07C29.9445 9.22611e-07 34.778 1.46623 38.8892 4.21326C43.0005 6.9603 46.2048 10.8648 48.097 15.4329C49.9892 20.0011 50.4842 25.0277 49.5196 29.8773C48.555 34.7268 46.174 39.1813 42.6777 42.6777C39.1813 46.174 34.7268 48.555 29.8772 49.5196C25.0277 50.4843 20.0011 49.9892 15.4329 48.097C10.8648 46.2048 6.9603 43.0005 4.21326 38.8892C1.46623 34.778 9.2261e-07 29.9445 9.2261e-07 25C-0.000891156 21.7167 0.645144 18.4654 1.90119 15.4319C3.15725 12.3983 4.9987 9.64198 7.32034 7.32034C9.64198 4.9987 12.3983 3.15725 15.4319 1.90119C18.4654 0.645144 21.7167 -0.000891156 25 9.2261e-07" fill="#F0B90B"/>
    <path d="M18.5368 22.3102L22.3187 18.5351L23.1199 17.7407L25.0142 15.8464L31.4509 22.3102L35.2057 18.5351L25.0142 8.33008L14.7888 18.5351L18.5368 22.3102Z" fill="#EAEDFD"/>
    <path d="M25.0155 21.2271L21.2515 24.9912L25.0155 28.7553L28.7796 24.9912L25.0155 21.2271Z" fill="#EAEDFD"/>
    <path d="M31.4509 27.6885L25.0074 34.132L22.7464 31.871L22.3323 31.4568L18.5368 27.6885L14.7888 31.4432L25.0142 41.6483L35.2057 31.4432L31.4509 27.6885Z" fill="#EAEDFD"/>
    <path d="M12.1032 21.234L8.33911 24.998L12.1032 28.7621L15.8672 24.998L12.1032 21.234Z" fill="#EAEDFD"/>
    <path d="M37.9042 21.2389L34.1401 25.0029L37.9042 28.767L41.6683 25.0029L37.9042 21.2389Z" fill="#EAEDFD"/>
    </svg>,
    usdc:<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 49.9999C29.9446 49.9999 34.7781 48.5337 38.8893 45.7867C43.0005 43.0396 46.2048 39.1352 48.097 34.567C49.9892 29.9989 50.4843 24.9722 49.5196 20.1227C48.555 15.2732 46.174 10.8186 42.6777 7.32233C39.1814 3.82602 34.7268 1.44501 29.8773 0.480378C25.0278 -0.484251 20.0011 0.0108332 15.433 1.90302C10.8648 3.79521 6.96038 6.99951 4.21335 11.1107C1.46632 15.222 7.50588e-05 20.0554 7.50588e-05 25C-0.00798487 28.2853 0.633148 31.5398 1.88666 34.5766C3.14017 37.6133 4.98136 40.3725 7.30443 42.6956C9.6275 45.0187 12.3867 46.8598 15.4234 48.1133C18.4602 49.3668 21.7147 50.008 25 49.9999Z" fill="#2775CA"/>
    <path d="M31.871 28.9589C31.871 25.3128 29.6847 24.0634 25.3121 23.5271C22.1888 23.1129 21.5641 22.2777 21.5641 20.8111C21.5641 19.3446 22.603 18.4211 24.6874 18.4211C26.5614 18.4211 27.6002 19.0458 28.123 20.6075C28.1783 20.7578 28.2781 20.8878 28.4091 20.98C28.5401 21.0722 28.6961 21.1223 28.8563 21.1235H30.5198C30.6176 21.1316 30.716 21.1184 30.8082 21.0849C30.9003 21.0513 30.9842 20.9982 31.0539 20.9292C31.1236 20.8601 31.1775 20.7768 31.2119 20.6849C31.2463 20.593 31.2604 20.4948 31.2532 20.397V20.2883C31.0486 19.1601 30.4783 18.1305 29.6303 17.3586C28.7823 16.5867 27.7039 16.1155 26.5614 16.0176V13.5393C26.5614 13.1251 26.2491 12.8128 25.7331 12.7109H24.1714C23.7505 12.7109 23.4381 13.0233 23.3363 13.5393V15.9361C20.213 16.357 18.2304 18.4347 18.2304 21.042C18.2304 24.4776 20.3148 25.8356 24.6874 26.3516C27.607 26.8744 28.544 27.4991 28.544 29.1694C28.544 30.8396 27.0842 31.9803 25.1084 31.9803C22.3925 31.9803 21.4623 30.8329 21.15 29.2644C21.1163 29.0928 21.0255 28.9376 20.8923 28.8241C20.7592 28.7107 20.5915 28.6457 20.4167 28.6398H18.6513C18.5543 28.6369 18.4577 28.654 18.3674 28.6898C18.2772 28.7257 18.1952 28.7796 18.1265 28.8483C18.0579 28.9169 18.0039 28.9989 17.9681 29.0891C17.9322 29.1794 17.9152 29.276 17.918 29.3731V29.4545C18.339 32.0618 20.0025 33.9358 23.4381 34.4518V36.9572C23.4381 37.3714 23.7504 37.6837 24.2732 37.7856H25.8349C26.2491 37.7856 26.5614 37.4733 26.6633 36.9572V34.479C29.7866 33.9562 31.871 31.7631 31.871 28.9589Z" fill="#EAEDFD"/>
    <path d="M19.6841 39.8972C16.6989 38.7859 14.1248 36.7883 12.3073 34.1724C10.4897 31.5564 9.51566 28.4472 9.51566 25.2618C9.51566 22.0764 10.4897 18.9672 12.3073 16.3513C14.1248 13.7353 16.6989 11.7377 19.6841 10.6264C19.8844 10.5393 20.0524 10.3915 20.1644 10.204C20.2765 10.0164 20.327 9.79853 20.3088 9.58083V8.12781C20.3244 7.93638 20.2695 7.74585 20.1545 7.59205C20.0394 7.43824 19.8722 7.33177 19.6841 7.29267C19.5374 7.27647 19.3899 7.31517 19.27 7.40131C15.4789 8.60768 12.17 10.9888 9.82183 14.2003C7.47366 17.4117 6.20801 21.2869 6.20801 25.2652C6.20801 29.2436 7.47366 33.1187 9.82183 36.3302C12.17 39.5416 15.4789 41.9227 19.27 43.1291C19.3563 43.1797 19.4534 43.209 19.5533 43.2147C19.6531 43.2204 19.753 43.2023 19.8445 43.1618C19.936 43.1214 20.0165 43.0598 20.0796 42.9821C20.1426 42.9044 20.1862 42.8128 20.2069 42.7149C20.3088 42.6063 20.3088 42.5045 20.3088 42.294V40.8342C20.2778 40.6424 20.2059 40.4595 20.0982 40.2979C19.9904 40.1362 19.8492 39.9996 19.6841 39.8972ZM30.7243 7.39452C30.6372 7.34548 30.5399 7.31756 30.44 7.31303C30.3402 7.3085 30.2407 7.32748 30.1496 7.36843C30.0584 7.40939 29.9781 7.47118 29.9152 7.54883C29.8523 7.62648 29.8085 7.71781 29.7873 7.81548C29.6855 7.91733 29.6855 8.01918 29.6855 8.22966V9.68946C29.702 9.89917 29.7671 10.1022 29.8755 10.2824C29.9839 10.4627 30.1327 10.6154 30.3101 10.7283C33.2954 11.8396 35.8694 13.8372 37.687 16.4531C39.5045 19.0691 40.4786 22.1783 40.4786 25.3637C40.4786 28.549 39.5045 31.6583 37.687 34.2742C35.8694 36.8902 33.2954 38.8878 30.3101 39.999C30.1098 40.0862 29.9419 40.234 29.8298 40.4215C29.7178 40.609 29.6673 40.827 29.6855 41.0447V42.5045C29.6701 42.6951 29.7252 42.8847 29.8404 43.0374C29.9555 43.1901 30.1226 43.2952 30.3101 43.3328C30.4558 43.3479 30.6022 43.3119 30.7243 43.231C34.5144 42.0079 37.8191 39.6145 40.1633 36.3949C42.5074 33.1753 43.7703 29.2953 43.7703 25.3127C43.7703 21.3302 42.5074 17.4502 40.1633 14.2306C37.8191 11.0109 34.5144 8.61757 30.7243 7.39452Z" fill="#EAEDFD"/>
    </svg>,
    ethereum:   <svg width="51" height="50" viewBox="0 0 51 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M49.256 31.0536C48.0588 35.8507 45.466 40.1851 41.8055 43.5088C38.145 46.8324 33.5812 48.996 28.6911 49.726C23.801 50.456 18.8043 49.7196 14.3327 47.6099C9.86112 45.5002 6.11551 42.112 3.56947 37.8737C1.02343 33.6353 -0.208699 28.7372 0.0288883 23.7987C0.266476 18.8601 1.96311 14.1029 4.90425 10.1285C7.84539 6.15418 11.899 3.14117 16.5524 1.47048C21.2059 -0.200204 26.2502 -0.453537 31.0476 0.742512C34.2341 1.53602 37.233 2.94969 39.8729 4.90273C42.5128 6.85578 44.742 9.30991 46.4329 12.1249C48.1239 14.9398 49.2436 18.0604 49.728 21.3083C50.2124 24.5562 50.052 27.8677 49.256 31.0536Z" fill="#F7931A"/>
      <path d="M36.0271 21.4425C36.5229 18.1146 33.9896 16.3217 30.5259 15.1331L31.6533 10.6235L28.9367 9.9443L27.8432 14.3317L25.6156 13.8359L26.7158 9.42135L23.9992 8.74219L22.8785 13.2518C22.2809 13.116 21.6968 12.9802 21.1263 12.8375L17.3434 11.8935L16.6167 14.8207C16.6167 14.8207 18.6542 15.2893 18.6066 15.3165C18.9867 15.3609 19.3339 15.5533 19.573 15.8522C19.812 16.151 19.9236 16.532 19.8834 16.9125L18.5998 22.0674L16.8068 29.2597C16.7711 29.3882 16.7099 29.5081 16.6267 29.6124C16.5436 29.7166 16.4403 29.803 16.323 29.8664C16.2057 29.9298 16.0768 29.9689 15.9441 29.9814C15.8113 29.9938 15.6774 29.9794 15.5504 29.9389C15.5504 29.9796 13.5536 29.4431 13.5536 29.4431L12.1953 32.5876L15.7677 33.4773C16.4469 33.6403 17.0785 33.8169 17.7169 33.9799L16.5827 38.5371L19.2994 39.2162L20.4268 34.7066C21.1738 34.9103 21.9006 35.0937 22.6069 35.2703L21.4863 39.7596L24.2029 40.4387L25.3439 35.8883C30.0165 36.7712 33.5414 36.4181 35.0152 32.1869C36.2105 28.7911 34.9609 26.8147 32.4955 25.5311C34.2885 25.1168 35.64 23.9351 36 21.5037L36.0271 21.4425ZM29.7585 30.2309C28.9095 33.6267 23.1774 31.7998 21.3165 31.3312L22.8174 25.2934C24.6783 25.7552 30.6414 26.6517 29.7585 30.2309ZM30.6074 21.4018C29.8332 24.5056 25.0587 22.9299 23.5102 22.5428L24.8685 17.0619C26.4238 17.4355 31.4156 18.1554 30.6074 21.3882V21.4018Z" fill="#EAEDFD"/>
      </svg>
      
  }

  const getLogoSrc = (cryptoId:string) => {
    if (cryptoId === 'bitcoin') {
      return icons.bitcoin; 
    } else if (cryptoId === 'binancecoin') {
      return icons.bnb; 
    } else if (cryptoId === 'tether') {
      return icons.usdc; 
    } else if (cryptoId === 'ethereum') {
      return icons.ethereum; 
    } else {
      return '';
    }
  };


  const getCryptoShort = (cryptoId:string) => {
    if (cryptoId === 'bitcoin') {
      return "BTC"; 
    } else if (cryptoId === 'binancecoin') {
      return "BNB"; 
    } else if (cryptoId === 'tether') {
      return "USDC"; 
    } else if (cryptoId === 'ethereum') {
      return "ETH";
    } else {
      return '';
    }
  };

  const getCryptoName = (cryptoId:string) => {
    if (cryptoId === 'bitcoin') {
      return "Bitcoin"; 
    } else if (cryptoId === 'binancecoin') {
      return "Binance"; 
    } else if (cryptoId === 'tether') {
      return "USDC"; 
    } else if (cryptoId === 'ethereum') {
      return "Ethereum";
    } else {
      return '';
    }
  };

  //@ts-ignore
  const generateChartData = () => {
    const data = [];
    const baseValue = 1000;
    for (let i = 1; i <= 5; i++) {
      const randomMultiplier = Math.random() > 0.5 ? 1 : -1;
      const randomValue = Math.floor(Math.random() * 100 + 1) * randomMultiplier;
      const value = baseValue + randomValue;
      data.push({
        x: new Date().getTime() - i * 24 * 60 * 60 * 1000,
        y: value,
      });
    }
    return data.reverse();
  };




  return (
    <div className='flex flex-col w-full lg:max-w-[50%] mb-10'>
 <h3 className='text-3xl text-gray-600 dark:text-gray-300 font-[500] mb-10'>Watchlist</h3>
 {
          loading?
            <img src={loader} alt="....."  className='w-[100px] h-[100px] object-contain'/>
     :
 <div className='flex flex-col gap-5'>
      {data.map((crypto) => (
        <div key={crypto.id} className="flex flex-col">
          <div className='bg-white w-full  border-solid dark:bg-[#121216] bg-slate-00 shadow-secondary border  border-b-slate-00 dark:border-slate-700  border-blue-200  rounded-lg px-4 py-2 flex justify-between items-center font-epilogue font-medium text-base leading-5 '>
            <div className='flex items-center '>
                {getLogoSrc(crypto.id)}
            </div>
            <div className='flex flex-col p-3 gap-2'>
              <div className='flex items-center justify-center text-base xl:text-lg sm:text-lg gap-1 lg:gap-2 text-[252525] dark:text-[#BBBBBB]'>
              {getCryptoName(crypto.id)} <span className='text-sm sm:text-base xl:text-lg text-[#BBBBBB] dark:text-[#808191]'>{getCryptoShort(crypto.id)}</span>
              </div>
              <div >
              <span style={{ color: getPriceChangeColor(crypto.change) }} className="xl:text-xl">
            {crypto.change.toFixed(2)}%
          </span>
              </div> 
            </div>

            <div className='flex flex-col gap-2 '>
              <div className='text-sm sm:text-base font-rubik xl:text-lg text-left text-[#252525] dark:text-slate-50 '>
                ${crypto.price.toFixed(2)} 
              </div>
              <div >
              <span className='text-xs sm:text-sm xl:text-[14px] text-[#BBBBBB]'>Price Today</span>
              </div>
            </div>

            <div className='hidden sm:flex lg:flex '>
            
            <Chart
            options={chartOptions}
            series={[
              {
                name: crypto.id,
                data: generateChartData(),
              },
            ]}
            type="area"
            height={80}
          />
            </div>
        </div>
        </div>
      ))}
</div>
}
    </div>
  );
};


type ChartType = 'line' | 'area' | 'bar' | 'pie' | 'donut' | 'radialBar' | 'scatter' | 'bubble' | 'heatmap' | 'candlestick' | 'boxPlot' | 'radar' | 'polarArea' | 'rangeBar' | 'rangeArea' | 'treemap';

interface ChartOptions {
  chart: {
    type: ChartType;
    toolbar: {
      show: boolean;
    };
  };
  dataLabels: {
    enabled: boolean;
  };
  xaxis: {
    type: 'datetime' | 'category';  // 'datetime' or 'category' for xaxis type
    labels: {
      show: boolean;
    };
  };
  yaxis: {
    labels: {
      formatter: (value: number) => string;
      show: boolean;
    };
  };
}


const chartOptions : ChartOptions = {
  chart: {
    type: 'line',
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled:false
  },
  xaxis: {
    type: 'datetime',
    labels: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      formatter: (value:number) => `$${value.toFixed(2)}`,
      show: false,
    },
  },
};


export default CryptoWatchlist
