import Verified from '../../../../assets/verified.svg'
import Active from '../../../../assets/active-icon.svg'
import Exchangers from '../../../../assets/total-exchangers.svg'
import ChartLeft from '../../../../assets/_Chart mini_left.svg'
import ChartRight from '../../../../assets/_Chart mini_right.svg'
import Arrowup from '../../../../assets/arrow-up.svg'
import Arrowdown from '../../../../assets/arrow-down.svg'
import { FiSearch } from "react-icons/fi";
import { MdOutlineFilterList } from "react-icons/md";
import Table from '../../../../components/Table/Table'
import ExchangerRow from '../../../../components/ExchangerRow/ExchangerRow'

const Home = () => {

  const headerItems = [
    {
      id: "1",
      title: "Total Exchangers",
      total: '2,420',
      percentage: "40%",
      icon: Exchangers,
      chart: ChartLeft,
      arrow: Arrowup
    },
    {
      id: "2",
      title: "Verified",
      total: '2,420',
      percentage: "10%",
      icon: Verified,
      chart: ChartRight,
      arrow: Arrowdown
    },
    {
      id: "3",
      title: "Active now",
      total: '2,420',
      percentage: "20%",
      icon: Active,
      chart: ChartLeft,
      arrow: Arrowup
    },
  ]


  interface UserData {
    id: number;
    exchanger:any;
    rate:string;
    rateRange:string;
    site:string;
    status:string;
  }

  
  const data: UserData[] = [
      { id: 1, exchanger:<div>hELLO</div>, rate: '34',rateRange:'34',site:'233' ,status:"Active"},
      { id: 2, exchanger: 'John Doe', rate: '34',rateRange:'34',site:'233' ,status:"Active"},
      { id: 3, exchanger: 'John Doe', rate: '34',rateRange:'34',site:'233' ,status:"Active"},
      { id: 4, exchanger: 'John Doe', rate: '34',rateRange:'34',site:'233' ,status:"Active"},
      { id: 5, exchanger: 'John Doe', rate: '34',rateRange:'34',site:'233' ,status:"Active"},
      { id: 6, exchanger: 'John Doe', rate: '34',rateRange:'34',site:'233' ,status:"Active"},
      { id: 7, exchanger: 'John Doe', rate: '34',rateRange:'34',site:'233' ,status:"Active"},
  ];
  
  const columns = [
      { Header: 'Exchanger name', accessor: 'exchanger' },
      { Header: 'Rate', accessor: 'rate' },
      { Header: 'Rate range', accessor: 'rateRange' },
      { Header: 'On/off site', accessor: 'site' },
      { Header: 'Status', accessor: 'status' },
  ];



  return (
    <div className='w-full min-h-full sm:p-[1rem] pb-[2rem]  '>
      <div className="w-full box-shadow  mb-[2rem] flex flex-col justify-between p-[1rem] sm:rounded-lg  bg-white mt-[2rem] min-h-[284px]">
        <span className='text-[#475467] font-[400]'>Track and manage exchange admins</span>

        <div className="grid  gap-[1rem]  sm:grid-cols-3">
          {
            headerItems.map((header: any) => {
              return <div key={header.id} className="w-full h-[184px] flex flex-col items-start justify-center  p-[1rem] rounded-md border overflow-hidden">

                <div className="flex gap-[1rem]">
                  <img src={header.icon} alt="Icon" />
                  <span className='font-[600] text-[1rem]'>{header.title}</span>
                </div>

                <div className='flex items-end gap-[1rem]'>
                  <span className='text-[2rem] font-[600]'>
                    {
                      header.total
                    }
                  </span>
                  <div className='flex items-center mb-[1rem]  gap-[.5rem]'>
                    <img src={header.arrow} alt="" />
                    <span
                      style={{
                        color: header.title === "Verified" ? "#D92D20" : "#17B26A"
                      }}
                      className='font-[500]'>
                      {
                        header.percentage
                      }
                    </span>
                  </div>

                  <img src={header.chart} alt="" />

                </div>

              </div>
            })
          }
        </div>

      </div>

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

      <div className="mt-[2rem]">
            <Table RowComponent={ExchangerRow} data={data} columns={columns} />
        </div>
    </div>
  )
}

export default Home;


