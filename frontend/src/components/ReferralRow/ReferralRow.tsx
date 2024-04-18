import Avatar from '../../assets/exchangerAvatar.svg'
import Country from '../../assets/country.svg'
import ImageStack from '../ImageStack/ImageStack'
import { User } from '../../utils/types';
import { useNavigate } from 'react-router-dom';


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
    }
];





const ReferralRow = () => {

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('details')
    }

    return (
        <tr onClick={handleNavigate} className='hover:bg-gray-100 duration-300'>
            <td className="px-6  py-4 whitespace-nowrap">

                <div className="flex gap-[1rem] items-center">
                    <div className="flex items-center gap-[.5rem]">
                        <span className="border cursor-pointer hover:bg-gray-200 duration-300 rounded-md w-[20px] h-[20px]"></span>
                        <img className="rounded-md w-[20px] h-[20px]" src={Country} alt="" />
                    </div>

                    <div className='flex flex-col gap-[.6rem]'>

                        <span className='flex gap-[1rem]'>
                            <div className='w-[40px] h-[40px] rounded-full overflow-hidden'>
                                <img src={Avatar} alt="" />
                            </div>
                            <div>
                                <div className='font-[600] text-[14px]'>
                                    Catalog
                                </div>
                                <p className='font-[400] text-[14px]'>Catalogapp.io</p>
                            </div>
                        </span>

                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className='font-[500] text-[14px]'>Jenny Wilson</span>
            </td>

            <td className="px-6 py-4 whitespace-nowrap">
                <ImageStack users={users} />
            </td>


        </tr>
    )
}

export default ReferralRow