import Logo from '../../assets/Logo.svg';
import { NavLink } from 'react-router-dom'; // Changed from Link to NavLink
import { LanguageDropdown } from '../LanguageDropDown/LanguageDropDown';
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

const Navbar2 = () => {
    const [active, setActive] = useState(false);
    const {user} = useAuthContext()

    return (
        <div className='bg-white border-b'>
            <div className='flex max-w-7xl mx-auto items-center h-16 px-4 justify-between'>
                <div className='flex items-center gap-4'>
                    <NavLink to='/' className='flex items-center gap-4' >
                        <img src={Logo} alt="logo" className='h-8 w-8' />
                        <span className='hidden font-[600] text-[16px] sm:flex'>Paytiz</span>
                    </NavLink>
                    <div className={`hidden md:flex items-center gap-4 ${active ? 'flex' : 'hidden'}`}>
                        <NavLink
                            to={`/user-admin/${user?.userName}`}
                            className={({ isActive }) =>
                                `flex flex-col  items-center font-[600] text-[16px]  justify-center    ${isActive ? 'text-black' : 'text-gray-600'}  h-full duration-300  font-500 duration-300 cursor-pointer`
                            }>
                            <span>Dashboard</span>

                        </NavLink>
                        <NavLink
                            to={`/user-admin/${user?.userName}/referrals`}
                            className={({ isActive }) =>
                                `flex flex-col  items-center font-[600] text-[16px]  justify-center    ${isActive ? 'text-black' : 'text-gray-600'}  h-full duration-300  font-500 duration-300 cursor-pointer`
                            }>
                            <span>Referrals</span>

                        </NavLink>
                        <NavLink
                             to={`/user-admin/${user?.userName}/reviews`}
                            className={({ isActive }) =>
                                `flex flex-col  items-center font-[600] text-[16px]  justify-center    ${isActive ? 'text-black' : 'text-gray-600'}  h-full duration-300  font-500 duration-300 cursor-pointer`
                            }>
                            <span>Reviews</span>

                        </NavLink>

                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <LanguageDropdown />
                    <IoMdNotificationsOutline className='text-[1.4rem] cursor-pointer' />
                    <FaBars onClick={() => setActive(!active)} className='sm:hidden' />
                </div>
            </div>
            {/* Mobile Menu */}
            {active && (
                <div className='md:hidden bg-white'>
                    <NavLink to='/user' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' >Dashboard</NavLink>
                    <NavLink to='/user/referrals' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Referrals</NavLink>
                    <NavLink to='/user/reviews' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' >Reviews</NavLink>
                </div>
            )}
        </div>
    );
}

export default Navbar2;
