import FrenchFlag from '../../assets/french-flag.jpg'
import EnglishFlag from '../../assets/english-flag.svg'
import SpanishFlag from '../../assets/spanish-flag.png'
import { useState } from 'react';
import { IoChevronDownSharp } from "react-icons/io5";


const languages = [
    { code: 'EN', name: 'English', icon: EnglishFlag },
    { code: 'ES', name: 'Spanish', icon: SpanishFlag },
    { code: 'FR', name: 'French', icon: FrenchFlag }
];


export const LanguageDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(languages[0]);

    return (
        <div className='relative'>
            <button className='flex items-center gap-2 bg-white  px-4 py-2 shadow-sm' onClick={() => setIsOpen(!isOpen)}>
               <img className='w-[24px] h-[17px] object-cover' src={selected.icon} alt="Icon" />
                <span className='font-[600] text-[16px]'>{selected.name}</span>
                <div>
                <IoChevronDownSharp/>
                </div>
            </button>
            {isOpen && (
                <div className='absolute z-10  w-full border bg-white'>
                    {languages.map(lang => (
                        <span key={lang.code} className='flex items-center p-2 hover:bg-gray-100 cursor-pointer'
                            onClick={() => {
                                setSelected(lang);
                                setIsOpen(false);
                            }}>
                            <img className='w-[24px] h-[17px]  object-cover' src={lang.icon} alt="Icon" />
                            <span className='ml-2 font-[600] text-[16px]'>{lang.name}</span>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};
