import Table2 from '../../../components/Table2/Table2';
import UserCard from '../../../components/UserCard/UserCard';
import SwitchButton from '../../../components/switchbutton/SwitchButton';
import { useState } from 'react';
import { getUserExchangerApi } from '../../../service/api/exchanger';
import { useParams } from 'react-router-dom';
import { Exchanger } from '../../../utils/types';
import useFetch from '../../../components/useFetch/useFetch';
import { ClipLoader } from 'react-spinners';

const Referrals = () => {

  const { username } = useParams()

  const { data: exchanger, loading: exchangerLoading, error: exchangerError } = useFetch<Exchanger>({
    apiCall: () => getUserExchangerApi({ userName: username ?? "" })
  });



  const columns = [
    { Header: '', accessor: 'exchange' },
    { Header: '', accessor: 'rate' },
  ];
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsToggled(e.target.checked);
  };



  return (
    <div className='w-full sm:px-[1rem] pb-[2rem]  min-h-full '>

      <div className='w-full rounded-b mb-[2rem] sm:h-[44px] p-[1rem] bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between'>
        <div className='flex font-[500] text-[12px] items-center gap-[1rem] sm:gap-[3rem]'>
          <span>Turn On/off service</span>
          <SwitchButton
            name="toggleSwitch"
            isChecked={isToggled}
            handleChange={handleToggle}
          />
        </div>
        <div className="flex gap-[1rem] font-[500] text-[12px] sm:gap-[3rem] ">
          <span className="cursor-pointer flex items-center  gap-[.5rem] hover:text-gray-500">
            Get Verified
          </span>
          <span className="cursor-pointer flex items-center  gap-[.5rem] hover:text-gray-500">
            Verify legal registration
          </span>
        </div>
      </div>

      <span className='text-[#475467] mb-[.5rem]  font-[400]'>Manage Referrals</span>

      <div className="w-full box-shadow flex flex-col gap-[1rem] justify-between p-[1rem] sm:rounded-lg  bg-white mt-[2rem] min-h-[284px]">

        <div className="grid   gap-[1rem] sm:grid-cols-2 md:grid-cols-4 ">

          {
            exchanger && !exchangerLoading ?
              <>
                <div className="w-full box-shadow-2 overflow-hidden  h-[184px] flex flex-col gap-[1rem] items-start justify-center  p-[1rem] rounded-md  border overflow-hidden">
                  <div className="font-[600] text-[#101828] ">Total referrals</div>
                  <div className="font-[600] text-[2rem] text-[#101828]">{exchanger?.user.referrals?.length}</div>
                </div>
                <div className="w-full box-shadow-2 overflow-hidden h-[184px] flex flex-col gap-[1rem] items-start justify-center  p-[1rem] rounded-md  border overflow-hidden">
                  <div className="font-[600] text-[#101828]">Total Earnings</div>
                  <div className="font-[600] text-[2rem] text-[#101828]">${exchanger?.user.totalEarnings}</div>
                </div>
                <div className="w-full box-shadow-2 overflow-hidden  h-[184px] flex flex-col gap-[1rem] items-start justify-center  p-[1rem] rounded-md  border overflow-hidden">
                  <div className="font-[600] text-[#101828]">Total withdrawal</div>
                  <div className="font-[600] text-[2rem] text-[#101828]">${exchanger?.user.totalWithdrawal}</div>
                </div>
                <div className="w-full box-shadow-2 overflow-hidden  h-[184px] flex flex-col gap-[1rem] items-start justify-center  p-[1rem] rounded-md  border overflow-hidden">
                  <div className="font-[600] text-[#101828]">Available for withdrawal</div>
                  <div className="font-[600] text-[2rem] text-[#101828] truncate">${exchanger?.user.availableForWithdrawal}</div>
                </div>
              </>
              : Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="w-full h-[184px] flex flex-col items-start justify-center p-4 rounded-md border overflow-hidden">
                  <div className="h-full w-full">
                    <div className="h-full w-full bg-gray-200 rounded-md animate-pulse">
                    </div>
                  </div>
                </div>

              ))
          }




        </div>


      </div>

      <div className="mt-[2rem]">
        {
          !exchangerLoading ?  <Table2 Component={UserCard} data={exchanger?.user?.referrals || []} columns={columns} /> : <div className='w-full flex items-center justify-center'>
            <ClipLoader size={14} color='black' />
          </div>
        }
      </div>

    </div>
  )
}

export default Referrals;
