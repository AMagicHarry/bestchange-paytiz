import Avatar from '../../../../assets/exchangerAvatar.svg'
import Table2 from '../../../../components/Table2/Table2';
import UserCard from '../../../../components/UserCard/UserCard';
import { User } from '../../../../utils/types';

interface headerItem {
  id: string;
  title: string;
  total: string;
}

//  interface UserData {
//     id: number;
//     exchanger: any;
//     rate: string;
//     rateRange: string;
//     site: string;
//     status: string;
//   }

const Details = () => {


  const headerItems: headerItem[] = [
    {
      id: "1",
      title: 'Total referrals',
      total: "1,420"
    },
    {
      id: "2",
      title: 'Total Earnings',
      total: "825"
    },
    {
      id: "3",
      title: 'Total withdrawal',
      total: "500"
    },
    {
      id: "4",
      title: 'Available for withdrawal',
      total: "325"
    },
  ]


 


  const users: User[] = [
    {
        _id: "1",
        firstName: "Alice",
        lastName: "Johnson",
        avatar: "https://example.com/avatars/1.jpg"
    },
    {
        _id: "2",
        firstName: "Bob",
        lastName: "Smith",
        avatar: "https://example.com/avatars/2.jpg"
    },
    {
        _id: "3",
        firstName: "Carol",
        lastName: "Williams",
        avatar: "https://example.com/avatars/3.jpg"
    },
    {
        _id: "4",
        firstName: "David",
        lastName: "Jones",
        avatar: "https://example.com/avatars/4.jpg"
    },
    {
        _id: "5",
        firstName: "Eva",
        lastName: "Brown",
        avatar: "https://example.com/avatars/5.jpg"
    },
    {
        _id: "6",
        firstName: "Eva",
        lastName: "Brown",
        avatar: "https://example.com/avatars/5.jpg"
    },
    {
        _id: "7",
        firstName: "Eva",
        lastName: "Brown",
        avatar: "https://example.com/avatars/5.jpg"
    },
    {
        _id: "8",
        firstName: "Eva",
        lastName: "Brown",
        avatar: "https://example.com/avatars/5.jpg"
    },
    {
        _id: "9",
        firstName: "Eva",
        lastName: "Brown",
        avatar: "https://example.com/avatars/5.jpg"
    },
    {
        _id: "10",
        firstName: "Eva",
        lastName: "Brown",
        avatar: "https://example.com/avatars/5.jpg"
    },
];


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
            <img src={Avatar} alt="" />
          </div>
          <div>
            <div className='font-[600]'>
              Catalog
            </div>
            <p>Catalogapp.io</p>
          </div>
        </span>

        <div className="grid   gap-[1rem] sm:grid-cols-2 md:grid-cols-4 ">
          {
            headerItems.map((header: headerItem) => {
              return <div key={header.id} className="w-full box-shadow-2  h-[184px] flex flex-col gap-[1rem] items-start justify-center  p-[1rem] rounded-md  border overflow-hidden">
                <div className="font-[600] text-[#101828]">{header.title}</div>
                <div className="font-[600] text-[2rem] text-[#101828]">${header.total}</div>
              </div>
            })
          }
        </div>

      </div>


      <div className="mt-[2rem]">
        <Table2 Component={UserCard} data={users} columns={columns} />
      </div>
    </div>
  )
}

export default Details;
