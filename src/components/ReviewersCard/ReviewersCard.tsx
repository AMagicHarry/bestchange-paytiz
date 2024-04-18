import React from 'react'
import { FaStar } from 'react-icons/fa';
import CommentIcon from '../../assets/comment.svg'
import PenIcon from '../../assets/pen.svg'


export interface Review {
    id: string,
    name: string;
    date: string;
    content: string;
    rating: string;
    countryIcon: string;
}


export interface ReviewersCardProps {
    review: Review,
    isEditable: boolean,
}


const ReviewersCard: React.FC<ReviewersCardProps> = ({ review, isEditable }) => {
    return (
        <div className='flex py-[1rem] border-b w-full flex-col gap-[2rem]'>
            <div className='flex items-center   justify-between'>
                <div className='flex flex-col'>
                    <span className='font-[600] text-base'>{review.name}</span>
                    <div className='flex item-center gap-[1rem]'>
                        <span className='text-[12px] font-[500]'>{review.date}</span>
                        <img className='w-[24px] h-[24px]' src={review.countryIcon} alt="Icon" />
                    </div>
                </div>
                {
                    isEditable && <div className=' flex items-center gap-[1rem]'>
                       <div className='hover:bg-gray-200 duration-300 rounded-full p-[.3rem]'>
                        <img  className='cursor-pointer ' src={PenIcon} alt="" />
                       </div>
                        <div className='hover:bg-gray-200 duration-300 rounded-full p-[.3rem]'>
                        <img className='cursor-pointer ' src={CommentIcon} alt="" />
                        </div>
                    </div>
                }

            </div>
            <div className='font-[500]'>
                {
                    review.content
                }
            </div>
            <div className='flex items-center gap-[.5rem]'>
                <FaStar className='text-[#FDB022]' />
                <FaStar className='text-[#FDB022]' />
                <FaStar className='text-[#FDB022]' />
                <FaStar className='text-[#FDB022]' />
                <FaStar className='text-[#FDB022]' />
                <FaStar className='text-[#FDB022]' />
            </div>

        </div>
    )
}

export default ReviewersCard