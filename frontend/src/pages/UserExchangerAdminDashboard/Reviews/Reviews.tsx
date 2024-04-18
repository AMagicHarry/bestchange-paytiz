import { FaAward } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import Country from '../../../assets/country.svg'
import ReviewersCard from "../../../components/ReviewersCard/ReviewersCard";
import SwitchButton from "../../../components/switchbutton/SwitchButton";
import { useState } from "react";





const Reviews = () => {
  const reviewers = [
    {
      id: "1",
      name: "Caitylin King",
      content: " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, natus quasi consequuntur, necessitatibus quis ratione iste odio aliquam labore numquam excepturi veritatis placeat quo consectetur ad suscipit dicta sunt saepe.",
      date: "Jan 11,2023 at 01:49pm",
      rating: '5',
      countryIcon: Country
    },
    {
      id: "2",
      name: "Caitylin King",
      content: " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, natus quasi consequuntur, necessitatibus quis ratione iste odio aliquam labore numquam excepturi veritatis placeat quo consectetur ad suscipit dicta sunt saepe.",
      date: "Jan 11,2023 at 01:49pm",
      rating: '5',
      countryIcon: Country
    },
    {
      id: "3",
      name: "Caitylin King",
      content: " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, natus quasi consequuntur, necessitatibus quis ratione iste odio aliquam labore numquam excepturi veritatis placeat quo consectetur ad suscipit dicta sunt saepe.",
      date: "Jan 11,2023 at 01:49pm",
      rating: '5',
      countryIcon: Country
    },
    {
      id: "4",
      name: "Caitylin King",
      content: " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, natus quasi consequuntur, necessitatibus quis ratione iste odio aliquam labore numquam excepturi veritatis placeat quo consectetur ad suscipit dicta sunt saepe.",
      date: "Jan 11,2023 at 01:49pm",
      rating: '5',
      countryIcon: Country
    },
    {
      id: "5",
      name: "Caitylin King",
      content: " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, natus quasi consequuntur, necessitatibus quis ratione iste odio aliquam labore numquam excepturi veritatis placeat quo consectetur ad suscipit dicta sunt saepe.",
      date: "Jan 11,2023 at 01:49pm",
      rating: '5',
      countryIcon: Country
    },
  ]

  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsToggled(e.target.checked);
  };

  return (
    <div className='w-full sm:px-[1rem] pb-[2rem]  '>

      <div className='w-full rounded-b mb-[2rem] sm:h-[44px] p-[1rem] bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between'>
        <div className='flex font-[500] text-[12px] items-center gap-[1rem] sm:gap-[3rem]'>
          <span>Turn On/off service</span>
          <SwitchButton
            name="toggleSwitch"
            isChecked={isToggled}
            handleChange={handleToggle}
          />
        </div>
        <div className="flex gap-[1rem] sm:gap-[3rem] ">
          <span className="cursor-pointer  flex items-center  gap-[.5rem] hover:text-gray-500">
            <RiVerifiedBadgeFill className="text-[#079455] " />
            <span className="font-[500] text-[12px]">
              Get Verified
            </span>
          </span>
          <span className="cursor-pointer flex items-center  gap-[.5rem] hover:text-gray-500">
            <FaAward className="text-[#17B26A] " />
            <span className="font-[500] text-[12px]">
              Verify legal registration
            </span>
          </span>
        </div>
      </div>

      <div className="w-full mt-[2rem]">
        <span className='text-[#475467] font-[400]'>Track and manage exchange admins</span>
      </div>

      <div className="box-shadow mt-[3rem] py-[1rem]  px-[1rem] rounded-lg w-full bg-white h-[max-content]">
        <div className="font-[500]">
          Reviews
        </div>
        {
          reviewers.map(review => {
            return <ReviewersCard key={review.id} isEditable={true} review={review} />
          })
        }
      </div>

    </div>
  )
}

export default Reviews