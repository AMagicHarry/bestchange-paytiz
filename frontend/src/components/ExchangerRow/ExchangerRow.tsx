import React, { useState } from 'react';
import { FaStar, FaAward } from 'react-icons/fa';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import SwitchButton from '../switchbutton/SwitchButton';
import { useNavigate } from 'react-router-dom';
import { Exchanger } from '../../utils/types';
import { CountryAvatar } from '../CountryFlag/CountryFlage';


interface ExchangerRowProps {
    exchanger: Exchanger;
}

const ExchangerRow: React.FC<ExchangerRowProps> = ({ exchanger }) => {
    const navigate = useNavigate();
    const [isToggled, setIsToggled] = useState(exchanger.siteOn);

    const handleNavigate = () => {
        navigate(`${exchanger.user.userName}/${exchanger._id}`);
    };

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setIsToggled(e.target.checked);
    };

    return (
        <tr className='hover:bg-gray-100 duration-300'>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex gap-[2rem] items-center">
                    <div className="flex items-center gap-[.5rem]">
                        <span onClick={handleNavigate} className="border cursor-pointer hover:bg-gray-200 duration-300 rounded-md min-w-[20px] h-[20px]"></span>
                        <div className='w-[40px] h-[40px] rounded-full overflow-hidden'>
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
                                <p className='font-[400] text-[14px]'>{exchanger.website}</p>
                            </div>
                        </span>

                        <div className="flex gap-[1rem]">
                            <div className='flex items-center gap-[.5rem]'>
                                {exchanger.verified && <FaAward className='text-[#17B26A] text-[14px]' />}
                                {exchanger.legalRegistration && <RiVerifiedBadgeFill className='text-[#17B26A] text-[14px]' />}
                            </div>
                            <div className='flex items-center gap-[.5rem]'>
                                {Array.from({ length: exchanger.rating }, (_, index) => (
                                    <FaStar key={index} className='text-[#FDB022] text-[14px]' />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className='flex flex-col items-start gap-[.5rem]'>
                    <span className='flex items-center gap-[.2rem]'>
                        <span>min:</span>
                        <span className='font-[600] text-[14px]'>{exchanger.rateRange.min}</span> <span className='font-[400] text-[12px]'>{exchanger.currency.code}</span>
                    </span>
                    <div className='border-[1px] border-[#D0D0D0] w-full'></div>
                    <span className='flex items-center gap-[.2rem]'>
                        <span>max:</span>
                        <span className='font-[600] text-[14px]'>{exchanger.rateRange.max}</span> <span className='font-[400] text-[12px]'>{exchanger.currency.code}</span>
                    </span>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <SwitchButton
                    name="toggleSwitch"
                    isChecked={isToggled}
                    handleChange={handleToggle}
                />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span  className={`flex ${!exchanger.isActive?"border-[#B54708] text-[#B54708] ":""} font-[500] items-center justify-center border px-[1rem] bg-[#ECFDF3]   py-[.1rem] rounded-full overflow-hidden cursor-pointer`}>
                    {exchanger.isActive ? "Active" : 'Suspended'}
                </span>
            </td>
        </tr>
    );
}

export default ExchangerRow;
