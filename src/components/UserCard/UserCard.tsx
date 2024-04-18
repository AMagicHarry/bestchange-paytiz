import React from 'react'
import Avatar from '../../assets/user-avatar.svg'
import { User } from '../../utils/types'

interface UserCard {
    user:User
}

const UserCard:React.FC<UserCard> = ({user}) => {
  return (
    <div className='flex items-center gap-[1rem]'>
        <div>
            <img src={Avatar} alt="Image" />
        </div>
        <div className='flex flex-col'>
            <span className='font-[500] text-[#344054] text-[14px]'>{user.firstName}  {user.lastName}</span>
            <span className='text-[400] text-[#475467] text-[14px]'>OCT 13,2023 at 08:05am</span>
        </div>
    </div>
  )
}

export default UserCard