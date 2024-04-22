import { useParams } from 'react-router-dom';
import Table2 from '../../../../components/Table2/Table2';
import UserCard from '../../../../components/UserCard/UserCard';
import { getExchangerApi } from '../../../../service/api/exchanger';
import useFetch from '../../../../components/useFetch/useFetch';
import { Exchanger } from '../../../../utils/types';
import { ClipLoader } from 'react-spinners';


const Details = () => {

  const {exchangerId} = useParams()

  const { data:exchanger, loading:exchangerLoading, error:exchangerError } = useFetch<Exchanger>({
    apiCall: ()=>getExchangerApi({exchangerId:exchangerId??""})
  });

  console.log(exchanger)


  const columns = [
    { Header: '', accessor: 'exchange' },
    { Header: '', accessor: 'rate' },
  ];



  return (
    <div className='w-full sm:p-[1rem] pb-[2rem]  min-h-full '>
      <div className="w-full box-shadow flex flex-col gap-[1rem] justify-between p-[1rem] sm:rounded-lg  bg-white mt-[2rem] min-h-[284px]">
        <span className='text-[#475467] mb-[.5rem] font-[400]'>Manage Referrals</span>
        <span className='flex items-center gap-[1rem]'>
          <div className='w-[60px] h-[60px] rounded-full overflow-hidden'>
            <img src={exchanger?.user?.avatar} alt="" />
          </div>
          <div>
            <div className='font-[600]'>
              <span>{exchanger?.user?.firstName}</span> <span> {exchanger?.user?.lastName}</span>
            </div>
            <p>{exchanger?.name}</p>
          </div>
        </span>

        <div className="grid   gap-[1rem] sm:grid-cols-2 md:grid-cols-4 ">
          
               <div  className="w-full box-shadow-2  h-[184px] flex flex-col gap-[1rem] items-start justify-center  p-[1rem] rounded-md  border overflow-hidden">
                <div className="font-[600] text-[#101828]">Total referrals</div>
                <div className="font-[600] text-[2rem] text-[#101828]">{exchanger?.user?.referrals?.length}</div>
              </div>
               <div  className="w-full box-shadow-2  h-[184px] flex flex-col gap-[1rem] items-start justify-center  p-[1rem] rounded-md  border overflow-hidden">
                <div className="font-[600] text-[#101828]">Total Earnings</div>
                <div className="font-[600] text-[2rem] text-[#101828]">${exchanger?.user?.totalEarnings}</div>
              </div>
               <div  className="w-full box-shadow-2  h-[184px] flex flex-col gap-[1rem] items-start justify-center  p-[1rem] rounded-md  border overflow-hidden">
                <div className="font-[600] text-[#101828]">Total withdrawal</div>
                <div className="font-[600] text-[2rem] text-[#101828]">${exchanger?.user?.totalWithdrawal}</div>
              </div>
               <div  className="w-full box-shadow-2  h-[184px] flex flex-col gap-[1rem] items-start justify-center  p-[1rem] rounded-md  border overflow-hidden">
                <div className="font-[600] text-[#101828]">Available for withdrawal</div>
                <div className="font-[600] text-[2rem] text-[#101828]">${exchanger?.user?.availableForWithdrawal}</div>
              </div>
            
          
        </div>

      </div>


      <div className="mt-[2rem]">
        
      </div>
      <div className='mt-[2rem]'>
       {
       !exchangerLoading? <Table2 Component={UserCard} data={exchanger?.user?.referrals|| []} columns={columns} />: <div className='w-full flex items-center justify-center'>
        <ClipLoader size={14} color='black'/>
       </div>
       }
      </div>
    </div>
  )
}

export default Details;
