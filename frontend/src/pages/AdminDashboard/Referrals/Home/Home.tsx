import { FiSearch } from 'react-icons/fi'
import { MdOutlineFilterList } from 'react-icons/md'
import Table from '../../../../components/Table/Table'
import ReferralRow from '../../../../components/ReferralRow/ReferralRow'

const Home = () => {

  interface UserData {
    id: number;
    exchangerName: string;
    exchangerAdmin: string;
    referrals: string;
  }


  const data: UserData[] = [
    { id: 1, exchangerAdmin: 'Jenny Wilson', exchangerName: "Alexander", referrals: "Hello" },
    { id: 2, exchangerAdmin: 'Jenny Wilson', exchangerName: "Alexander", referrals: 'Hello' },
    { id: 3, exchangerAdmin: 'Jenny Wilson', exchangerName: "Alexander", referrals: "Hello" },
    { id: 4, exchangerAdmin: 'Jenny Wilson', exchangerName: "Alexander", referrals: "Hello" },
    { id: 6, exchangerAdmin: 'Jenny Wilson', exchangerName: "Alexander", referrals: "Hello" },
    { id: 7, exchangerAdmin: 'Jenny Wilson', exchangerName: "Alexander", referrals: "Hello" },
    { id: 8, exchangerAdmin: 'Jenny Wilson', exchangerName: "Alexander", referrals: "Hello" },
    { id: 9, exchangerAdmin: 'Jenny Wilson', exchangerName: "Alexander", referrals: "Hello" },
    { id: 10, exchangerAdmin: 'Jenny Wilson', exchangerName: "Alexander", referrals: "Hello" },
  ];

  const columns = [
    { Header: 'Exchanger name', accessor: 'exchangerName' },
    { Header: 'Exchanger admin', accessor: 'exchangerAdmin' },
    { Header: 'Referrals', accessor: 'referrals' },
  ];

  return (
    <div className='py-[2rem] sm:p-[1rem] pb-[2rem] '>
      <h1 className='font-[400] px-[1rem] text-[#475467] text-[1rem] mb-[3rem]'>Manager Referrals</h1>

      <div className='w-full px-[1rem] flex  gap-[1rem] items-center justify-between'>
        <div className='flex w-full  bg-white  px-[.5rem] rounded-md w-full max-w-[320px] text-[1rem] box-shadow items-center gap-[1rem]'>
          <FiSearch className='font-[1.5rem]' />
          <input className='flex-1 w-full h-[44px] outline-none' type="text" placeholder='Search' />
        </div>
        <div className='flex items-center gap-[1rem] rounded-md bg-white py-[.5rem] box-shadow px-[.5rem]'>
          <span>Filters</span>
          <MdOutlineFilterList />
        </div>
      </div>

      <div className='mt-[2rem]'>
        <Table RowComponent={ReferralRow} data={data} columns={columns} />
      </div>
    </div>
  )
}

export default Home