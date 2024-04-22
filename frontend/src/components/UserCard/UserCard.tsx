import React from 'react'
import { User } from '../../utils/types'
import { formatDate } from '../../utils/functions'

interface UserCard {
    user:User
    established:string;
}

const UserCard:React.FC<UserCard> = ({user,established}) => {
  console.log(user)
  return (
    <div className='flex items-center gap-[1rem]'>
        <div className='w-[2.2rem] h-[2.2rem] rounded-full overflow-hidden'>
            <img src={user?.avatar} alt="Image" />
        </div>
        <div className='flex flex-col'>
            <span className='font-[500] text-[#344054] text-[14px]'>{user?.firstName}  {user?.lastName}</span>
            <span className='text-[400] text-[#475467] text-[14px]'>{formatDate(established)}</span>
        </div>
    </div>
  )
}

export default UserCard