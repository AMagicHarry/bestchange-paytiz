import { FiSearch } from 'react-icons/fi'
import { MdOutlineFilterList } from 'react-icons/md'
import Table from '../../../../components/Table/Table'
import ReferralRow from '../../../../components/ReferralRow/ReferralRow'
import useFetch from '../../../../components/useFetch/useFetch'
import { getExchangersApi } from '../../../../service/api/exchanger'
import { Exchanger } from '../../../../utils/types'
import { useState,useEffect } from 'react'
import { useRef } from 'react'
import { ClipLoader } from 'react-spinners'



const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data:exchangers, loading:exchangersLoading} = useFetch<Exchanger[]>({
    apiCall: ()=>getExchangersApi()
  });
   
  const [filteredExchangers, setFilteredExchangers] = useState(exchangers);
  const [filtersActive,setFiltersActive] = useState<boolean>(false)
  const filterToggleRef = useRef<HTMLDivElement | null>(null);


  const handleActive = () => {
    const filtered = exchangers?.filter(exchanger => exchanger.isActive === true); 
    filterExchangers(filtered ?? []);
  };
  
  const handleSuspended = () => {
    const filtered = exchangers?.filter(exchanger => exchanger.isActive === false);
    filterExchangers(filtered ?? []);
  };
  
  const handleSiteOn = () => {
    const filtered = exchangers?.filter(exchanger => exchanger.siteOn === true);
    filterExchangers(filtered ?? []);
  };
  
  const handleSiteOff = () => {
    const filtered = exchangers?.filter(exchanger => exchanger.siteOn === false);
    filterExchangers(filtered ?? []);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterToggleRef.current && !filterToggleRef.current.contains(event.target as Node) && filtersActive) {
        setFiltersActive(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [filtersActive]);


    const filterExchangers = (exchangers:Exchanger[]) => {
    const filteredExchangers = exchangers.filter(exchanger =>
      {
        const lowercasedQuery = searchQuery.toLowerCase();
        const name = exchanger.name
        const website = exchanger.website
        const exchangerUserFirstName = exchanger.user.firstName
        const exchangerUserLastName = exchanger.user.lastName
        const exchangerString = `${name} ${website} ${exchangerUserFirstName} ${exchangerUserLastName}`;
        return exchangerString.includes(lowercasedQuery);
      })
      setFilteredExchangers(filteredExchangers);
  }


  useEffect(() => {
    filterExchangers(exchangers??[])
  }, [searchQuery, exchangers]);
    
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
          <input  value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} className='flex-1 w-full h-[44px] outline-none' type="text" placeholder='Search' />
        </div>
        <div ref={filterToggleRef} className="relative">
        <div onClick={() => setFiltersActive(!filtersActive)} className='flex cursor-pointer items-center gap-[1rem] rounded-md bg-white py-[.5rem] box-shadow px-[.5rem]'>
          <span>Filters</span>
          <MdOutlineFilterList />
        </div>
        {filtersActive && <div className="absolute flex flex-col border border-gray-300 rounded-md shadow-md bg-white top-[3rem] w-[10rem] ">
                    <span onClick={handleActive} className="p-[.5rem] hover:bg-blue-100 cursor-pointer">Active</span>
                    <span onClick={handleSuspended} className="p-[.5rem] hover:bg-blue-100 cursor-pointer">Suspended</span>
                    <span onClick={handleSiteOn} className="p-[.5rem] hover:bg-blue-100 cursor-pointer">Site on</span>
                    <span onClick={handleSiteOff} className="p-[.5rem] hover:bg-blue-100 cursor-pointer">Site off</span>
                  </div>}
                  </div>
      </div>

      <div className='mt-[2rem]'>
       {
       !exchangersLoading? <Table RowComponent={ReferralRow} data={filteredExchangers || []} columns={columns} />: <div className='w-full flex items-center justify-center'>
        <ClipLoader size={14} color='black'/>
       </div>
       }
      </div>
    </div>
  )
}

export default Home