import Logo from '../../assets/Logo.svg';
import { NavLink } from 'react-router-dom'; // Changed from Link to NavLink
import { LanguageDropdown } from '../LanguageDropDown/LanguageDropDown';
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';

const Navbar = () => {
    const [active, setActive] = useState(false);

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
                            to='/'
                            className={({ isActive }) =>
                                `flex flex-col  items-center font-[600] text-[16px]  justify-center    ${isActive ? 'text-black' : 'text-gray-600'}  h-full duration-300  font-500 duration-300 cursor-pointer`
                            }>
                            <span>Dashboard</span>

                        </NavLink>
                        <NavLink
                            to='/referrals'
                            className={({ isActive }) =>
                                `flex flex-col  items-center font-[600] text-[16px]  justify-center    ${isActive ? 'text-black' : 'text-gray-600'}  h-full duration-300  font-500 duration-300 cursor-pointer`
                            }>
                            <span>Referrals</span>

                        </NavLink>
                        <NavLink
                            to='/blog'
                            className={({ isActive }) =>
                                `flex flex-col  items-center font-[600] text-[16px]  justify-center    ${isActive ? 'text-black' : 'text-gray-600'}  h-full duration-300  font-500 duration-300 cursor-pointer`
                            }>
                            <span>Blog</span>

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
                    <NavLink to='/' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' >Dashboard</NavLink>
                    <NavLink to='/referrals' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' >Referrals</NavLink>
                    <NavLink to='/blog' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' >Blog</NavLink>
                </div>
            )}
        </div>
    );
}

export default Navbar;
