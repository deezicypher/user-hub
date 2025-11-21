import { useStateContext } from '../../context/userContext';
import { UserContextProps } from '../../types';

const colors = ['#BDC6F9', '#FFE5B4', '#B38AF7', '#FAB71D', '#00ffff'];






const PieChart = () => {
  const {stats} = useStateContext() as UserContextProps


const mockdata = [
  { label: 'Capital', value: 152000, color: colors[0] },
  { label: 'Simple Interest', value: 52000, color: colors[1] },
  { label: 'Compound Interest', value: 100000, color: colors[2] },
  { label: 'Referral Earning', value: 10000, color: colors[3]},
  { label: 'Total Profit', value: 510000, color: colors[4] },
]

const data = [
  { label: 'Capital', value: stats?.balance, color: colors[0] },
  { label: 'Simple Interest', value: stats?.simple_e, color: colors[1] },
  { label: 'Compound Interest', value: stats?.compound_e, color: colors[2] },
  { label: 'Referral Earning', value: stats?.ref_e, color: colors[3]},
  { label: 'Total Profit', value: stats?.total_p, color: colors[4] },
];


const _totalValue = data.reduce((sum, category) => sum + category.value, 0);
const mocktotalValue = mockdata.reduce((sum, category) => sum + category.value, 0);
let startAngle = 0;

    return (
      <div className="flex items-center  flex-col md:flex-row lg:flex-col xl:flex-row justify-center w-full gap-5 ">
      {mocktotalValue >= 100 ?
        <svg viewBox="0 0 100 100" className="w-full sm:max-w-[45%] h-50 ">
          {mockdata.map((category, index) => {
            const angle = (category.value / mocktotalValue) * 360;
            const largeArcFlag = angle <= 180 ? '0' : '1';
  
            const endAngle = startAngle + angle;
  
            const startPoint = polarToCartesian(50, 50, 40, startAngle);
            const endPoint = polarToCartesian(50, 50, 40, endAngle);
  
            const pathData = [
              `M ${startPoint.x} ${startPoint.y}`,
              `A 40 40 0 ${largeArcFlag} 1 ${endPoint.x} ${endPoint.y}`,
              `L 50 50 Z`,
            ].join(' ');
  
            startAngle += angle;
  
            return (
              <path
                key={category.label}
                d={pathData}
                fill={colors[index % colors.length]} // Use colors array to set the fill color
                stroke="#fffff"
              />
            );
          })}
        </svg>
:
<svg viewBox="0 0 100 100" className="w-full sm:max-w-[45%] h-50 ">
{mockdata.map((category, index) => {
  const angle = (category.value / mocktotalValue) * 360;
  const largeArcFlag = angle <= 180 ? '0' : '1';

  const endAngle = startAngle + angle;

  const startPoint = polarToCartesian(50, 50, 40, startAngle);
  const endPoint = polarToCartesian(50, 50, 40, endAngle);

  const pathData = [
    `M ${startPoint.x} ${startPoint.y}`,
    `A 40 40 0 ${largeArcFlag} 1 ${endPoint.x} ${endPoint.y}`,
    `L 50 50 Z`,
  ].join(' ');

  startAngle += angle;

  return (
    <path
      key={category.label}
      d={pathData}
      fill={colors[index % colors.length]} // Use colors array to set the fill color
      stroke="#fffff"
    />
  );
})}
</svg>
}
        <div className='flex justify-center sm:min-w-[50%] flex-col gap-5'>
        {mockdata.map((category) => (
            <div className='flex items-center justify-start  gap-5'>
            
                <div className='flex items-center gap-2 justify-center'>
                <span className=" w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                <span className=" font-epilogue font-normal text-xs sm:text-base text-[#808191] dark:border-slate-600">{category.label}</span>
                </div>



                <div className='flex items-center'>
                <span className="font-rubik font-normal text-sm sm:text-base  text-[#808191] dark:border-slate-600"> ${category.value?.toLocaleString()}.00</span>
                </div>  

            </div>
))
}
        </div>
      </div>
    );
  };
  
  // Helper function to calculate path for each pie slice
  function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }
  
  export default PieChart;
