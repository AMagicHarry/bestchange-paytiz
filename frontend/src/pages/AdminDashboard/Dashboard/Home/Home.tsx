import Verified from '../../../../assets/verified.svg'
import Active from '../../../../assets/active-icon.svg'
import Exchangers from '../../../../assets/total-exchangers.svg'
import Arrowup from '../../../../assets/arrow-up.svg'
import Arrowdown from '../../../../assets/arrow-down.svg'
import { FiSearch } from "react-icons/fi";
import { MdOutlineFilterList } from "react-icons/md";
import Table from '../../../../components/Table/Table'
import ExchangerRow from '../../../../components/ExchangerRow/ExchangerRow'
import { ExchangerSummary } from '../../../../utils/types'
import { getExchangeStatApi, getExchangersApi } from '../../../../service/api/exchanger'
import { LineChart } from '../../../../components/LineChart/LineChart'
import useFetch from '../../../../components/useFetch/useFetch'
import { Exchanger } from '../../../../utils/types'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { ClipLoader } from 'react-spinners'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: exchangersStat } = useFetch<ExchangerSummary[]>({
    apiCall: () => getExchangeStatApi()
  });
  const { data: exchangers, loading: exchangersLoading } = useFetch<Exchanger[]>({
    apiCall: () => getExchangersApi()
  });

  console.log(exchangersStat)


  const [filteredExchangers, setFilteredExchangers] = useState(exchangers);
  const [filtersActive, setFiltersActive] = useState<boolean>(false)
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




  const filterExchangers = (exchangers: Exchanger[]) => {
    const filteredBingos = exchangers.filter(exchanger => {
      const lowercasedQuery = searchQuery.toLowerCase();
      const name = exchanger.name
      const exchangerString = ` ${name}`;
      return exchangerString.includes(lowercasedQuery);
    })
    setFilteredExchangers(filteredBingos);
  }


  useEffect(() => {
    filterExchangers(exchangers ?? [])
  }, [searchQuery, exchangers]);




  const columns = [
    { Header: 'Exchanger name', accessor: 'exchanger' },
    { Header: 'Rate range', accessor: 'rateRange' },
    { Header: 'On/off site', accessor: 'site' },
    { Header: 'Status', accessor: 'status' },
  ];


  function calculatePercentageChange(currentMonth:{_id:string,count:number}[], previousMonth:{_id:string,count:number}[]) {
    let totalCurrentMonth = currentMonth.reduce((total, data) => total + data?.count, 0);
    let totalPreviousMonth = previousMonth.reduce((total, data) => total + data?.count, 0);

    let percentageChange = ((totalCurrentMonth - totalPreviousMonth) / totalPreviousMonth) * 100;
    percentageChange = percentageChange > 100 ? percentageChange-100:percentageChange
    return percentageChange.toFixed(2);
}


  return (
    <div className='w-full min-h-full sm:p-[1rem] pb-[2rem]  '>
      <div className="w-full box-shadow  mb-[2rem] flex flex-col justify-between p-[1rem] sm:rounded-lg  bg-white mt-[2rem] min-h-[284px]">
        <span className='text-[#475467] font-[400]'>Track and manage exchange admins</span>

        <div className="grid  gap-[1rem]  sm:grid-cols-3">
          {
            !exchangersLoading  && exchangersStat  && exchangersStat.length > 0? exchangersStat?.map((header: ExchangerSummary) => {
              const title = header.title
              return <div key={header._id} className="w-full h-[184px] flex flex-col items-start justify-center  p-[1rem] rounded-md border overflow-hidden">

                <div className="flex gap-[1rem]">
                  <img src={title === 'Total Exchangers' ? Exchangers : title === "Verified" ? Verified : Active} alt="Icon" />
                  <span className='font-[600] text-[1rem]'>{header.title}</span>
                </div>

                <div className='flex items-end gap-[1rem]'>
                  <span className='text-[2rem] font-[600]'>
                    {
                      header?.total
                    }
                  </span>
                  <div className='flex items-center mb-[1rem]  gap-[.5rem]'>
                    <img src={header.status ? Arrowup : Arrowdown} alt="" />
                    <span
                      style={{
                        color: header.title === "Verified" ? "#D92D20" : "#17B26A"
                      }}
                      className='font-[500]'>
                     {
                      calculatePercentageChange(header.stat.currentMonth,header.stat.previousMonth)
                     }
                    </span>
                  </div>

                  <LineChart chartData={header.stat}  />

                </div>

              </div>
            }):Array.from({ length: 3 }, (_, index) => (
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

      <div className='w-full px-[1rem] flex  gap-[1rem] items-center justify-between'>
        <div className='flex w-full  bg-white  px-[.5rem] rounded-md w-full max-w-[320px] text-[1rem] box-shadow items-center gap-[1rem]'>
          <FiSearch className='font-[1.5rem]' />
          <input value={searchQuery}
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

      <div className="mt-[2rem]">
        {
          !exchangersLoading ? <Table RowComponent={ExchangerRow} data={filteredExchangers || []} columns={columns} /> : <div className='w-full flex items-center justify-center'>
            <ClipLoader size={14} color='black' />
          </div>
        }
      </div>

    </div>
  )
}

export default Home;


