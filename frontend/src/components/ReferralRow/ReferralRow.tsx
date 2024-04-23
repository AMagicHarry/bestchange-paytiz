import ImageStack from '../ImageStack/ImageStack'
import { useNavigate } from 'react-router-dom';
import { Exchanger } from '../../utils/types';
import { CountryAvatar } from '../CountryFlag/CountryFlage';



export interface ReferralRowProps {
    exchanger:Exchanger
}




const ReferralRow:React.FC<ReferralRowProps> = ({exchanger}) => {

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(`${exchanger.user.userName}/${exchanger._id}`);
    };

    return (
        <tr onClick={handleNavigate} className='hover:bg-gray-100 duration-300'>
            <td className="px-6  py-4 whitespace-nowrap">

                <div className="flex gap-[1rem] items-center">
                    <div className="flex items-center gap-[.5rem]">
                        <span className="border cursor-pointer hover:bg-gray-200 duration-300 rounded-md w-[20px] h-[20px]"></span>
                        <div className='w-[30px] h-[30px] rounded-full overflow-hidden'>
                            <CountryAvatar code={exchanger.user.countryCode??""}/>
                        </div>
                    </div>

                    <div className='flex flex-col gap-[.6rem]'>

                        <span className='flex gap-[1rem]'>
                            <div className='w-[40px] h-[40px] rounded-full overflow-hidden'>
                                <img src={exchanger.avatar} alt="" />
                            </div>
                            <div>
                                <div className='font-[600] text-[14px]'>
                                    {exchanger.name}
                                </div>
                                <p className='font-[400] text-[14px]'>
                                    {exchanger.website}
                                </p>
                            </div>
                        </span>

                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className='font-[500] text-[14px]'>{exchanger.user.firstName} {exchanger.user.lastName}</span>
            </td>

            <td className="px-6 py-4 whitespace-nowrap">
                <ImageStack referrals={exchanger.user.referrals || []} />
            </td>


        </tr>
    )
}

export default ReferralRow