import React from 'react'
import { FaStar } from 'react-icons/fa';
import CommentIcon from '../../assets/comment.svg'
import PenIcon from '../../assets/pen.svg'
import { Review } from '../../utils/types';
import { CountryAvatar } from '../CountryFlag/CountryFlage';
import { formatDate } from '../../utils/functions';


export interface ReviewersCardProps {
    review: Review,
    isEditable: boolean,
}


const ReviewersCard: React.FC<ReviewersCardProps> = ({ review, isEditable }) => {
    return (
        <div className='flex py-[1rem] border-b w-full flex-col gap-[2rem]'>
            <div className='flex items-center   justify-between'>
                <div className='flex flex-col'>

                    <span className='font-[600] text-base'>{review.user.firstName}  {review.user.lastName}</span>

                    <div className='flex items-center gap-[1rem]'>
                        <span className='text-[12px] font-[500]'>{formatDate(review?.createdAt??"")}</span>
                        <div className='w-[40px] h-[40px] rounded-full overflow-hidden'>
                            <CountryAvatar code={review.user.countryCode??""}/>
                        </div>
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
                                {Array.from({ length: review.rating??0 }, (_, index) => (
                                    <FaStar key={index} className='text-[#FDB022] text-[14px]' />
                                ))}
                            </div>

        </div>
    )
}

export default ReviewersCard