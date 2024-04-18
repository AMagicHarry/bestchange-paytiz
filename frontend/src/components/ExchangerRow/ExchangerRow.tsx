import Avatar from '../../assets/exchangerAvatar.svg'
import { FaStar } from 'react-icons/fa'
import { FaAward } from 'react-icons/fa'
import { RiVerifiedBadgeFill } from 'react-icons/ri'
import Country from '../../assets/country.svg'
import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";
import { RxDividerVertical } from "react-icons/rx";
import SwitchButton from '../switchbutton/SwitchButton'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'



const ExchangerRow = () => {
    const navigate = useNavigate()

    const handleNavigate = ()=>{
        navigate('details')
    }

    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation(); 
        setIsToggled(e.target.checked);  
      };

    return (
        <tr  className='hover:bg-gray-100 duration-300'>
            <td className="px-6  py-4 whitespace-nowrap">

            <div className="flex gap-[2rem] items-center">

            <div className="flex items-center gap-[.5rem]">
                            <span onClick={handleNavigate} className="border cursor-pointer hover:bg-gray-200 duration-300 rounded-md min-w-[20px] h-[20px]"></span>
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

                    <div className="flex gap-[1rem]">
                        <div className='flex items-center gap-[.5rem]'>
                            <FaAward className='text-[#17B26A] text-[14px]' />
                            <RiVerifiedBadgeFill className='text-[#17B26A] text-[14px]' />
                        </div>
                        <div className='flex items-center gap-[.5rem]'>
                            <FaStar className='text-[#FDB022] text-[14px]' />
                            <FaStar className='text-[#FDB022] text-[14px]' />
                            <FaStar className='text-[#FDB022] text-[14px]' />
                            <FaStar className='text-[#FDB022] text-[14px]' />
                            <FaStar className='text-[#FDB022] text-[14px]' />
                        </div>


                    </div>

                </div>
            </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className='flex items-center gap-[1rem] justify-between'>
                    <span >
                        <span className='font-[600]'>1</span> <span className='font-300'>BTC</span>
                    </span>
                    <span className='flex items-center   gap-[.5rem]'>
                        <GoArrowLeft className='text-[#17B26A] text-[20px]'/>
                        <RxDividerVertical className='text-[2rem] text-[#D0D0D0]'/>
                        <GoArrowRight className='text-[#17B26A] text-[20px]'/>
                    </span>
                    <span>
                        <span className='font-[600] text-[14px]'>19.978730</span> <span className='font-[400] text-[12px]'>ETH</span>
                    </span>

                </div>
                
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
            <div className='flex flex-col items-start gap-[.5rem]'>
                    
                    <span className='flex items-center gap-[.2rem]'>
                        <span>min:</span>
                        <span className='font-[600] text-[14px]'>19.978730</span> <span className='font-[400] text-[12px]'>BTC</span>
                    </span>
                    <div className='border-[1px] border-[#D0D0D0] w-full'>

                    </div>
                    <span className='flex items-center gap-[.2rem]'>
                        <span>min:</span>
                        <span className='font-[600] text-[14px]'>19.978730</span> <span className='font-[400] text-[12px]'>BTC</span>
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
              <span className='flex items-center justify-center px-[1rem] bg-[#ECFDF3] border border-[#ABEFC6] py-[.1rem] rounded-full overflow-hidden cursor-pointer'>
                  Active
              </span>
            </td>
        </tr>
    )
}

export default ExchangerRow