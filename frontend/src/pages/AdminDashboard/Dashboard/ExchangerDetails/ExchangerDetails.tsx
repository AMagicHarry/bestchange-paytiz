import { FaAward } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import Avatar from '../../../../assets/exchangerAvatar.svg'
import Image from '../../../../assets/exchangerImage.svg'
import { FaStar } from "react-icons/fa";
import Country from '../../../../assets/country.svg'
import ReviewersCard from "../../../../components/ReviewersCard/ReviewersCard";
import SwitchButton from "../../../../components/switchbutton/SwitchButton";
import { useState } from "react";


const ExchangerDetails = () => {
   const reviewers = [
    {
      id:"1",
      name:"Caitylin King",
      content:" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, natus quasi consequuntur, necessitatibus quis ratione iste odio aliquam labore numquam excepturi veritatis placeat quo consectetur ad suscipit dicta sunt saepe.",
      date:"Jan 11,2023 at 01:49pm",
      rating:'5',
      countryIcon:Country
    },
    {
      id:"2",
      name:"Caitylin King",
      content:" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, natus quasi consequuntur, necessitatibus quis ratione iste odio aliquam labore numquam excepturi veritatis placeat quo consectetur ad suscipit dicta sunt saepe.",
      date:"Jan 11,2023 at 01:49pm",
      rating:'5',
      countryIcon:Country
    },
    {
      id:"3",
      name:"Caitylin King",
      content:" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, natus quasi consequuntur, necessitatibus quis ratione iste odio aliquam labore numquam excepturi veritatis placeat quo consectetur ad suscipit dicta sunt saepe.",
      date:"Jan 11,2023 at 01:49pm",
      rating:'5',
      countryIcon:Country
    },
    {
      id:"4",
      name:"Caitylin King",
      content:" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, natus quasi consequuntur, necessitatibus quis ratione iste odio aliquam labore numquam excepturi veritatis placeat quo consectetur ad suscipit dicta sunt saepe.",
      date:"Jan 11,2023 at 01:49pm",
      rating:'5',
      countryIcon:Country
    },
    {
      id:"5",
      name:"Caitylin King",
      content:" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, natus quasi consequuntur, necessitatibus quis ratione iste odio aliquam labore numquam excepturi veritatis placeat quo consectetur ad suscipit dicta sunt saepe.",
      date:"Jan 11,2023 at 01:49pm",
      rating:'5',
      countryIcon:Country
    },
   ]


   const [isToggled, setIsToggled] = useState(false);
   const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
     setIsToggled(e.target.checked);  // Update state based on checkbox's checked status
   };


  return (
    <div className='w-full sm:px-[1rem] pb-[2rem]  '>
      <div className='w-full rounded-b mb-[2rem] sm:h-[44px] p-[1rem] bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between'>
        <div className='flex items-center gap-[3rem]'>
          <span>On/off site</span>
          <SwitchButton
        name="toggleSwitch"
        isChecked={isToggled}
        handleChange={handleToggle}
      />
        </div>
        <div className="flex gap-[1rem] ">
          <span className="cursor-pointer hover:text-gray-500">Suspend account</span>
          <span className="cursor-pointer hover:text-gray-500">Send message</span>
        </div>
      </div>

      <div className="w-full box-shadow flex flex-col gap-[2rem] justify-between p-[1rem] sm:rounded-lg  bg-white mt-[2rem]">
        <span className='text-[#475467] font-[400]'>Track and manage exchange admins</span>

        <div className="flex flex-wrap justify-start sm:justify-start items-center gap-[3rem]">
          <div className='w-[256px] h-[256px]'>
            <img src={Image} className='w-full h-full' alt="Image" />
          </div>

          <div className='flex flex-col justify-start gap-[2rem]'>

            <span>
              <div className='w-[60px] h-[60px] rounded-full overflow-hidden'>
                <img src={Avatar} alt="" />
              </div>
              <div className='font-[600]'>
                Catalog
              </div>
              <p>Catalogapp.io</p>
            </span>

            <div className='flex items-center gap-[1rem]'>
              <FaStar className='text-[#FDB022] text-[35px]' />
              <FaStar className='text-[#FDB022] text-[35px]' />
              <FaStar className='text-[#FDB022] text-[35px]' />
              <FaStar className='text-[#FDB022] text-[35px]' />
              <FaStar className='text-[#FDB022] text-[35px]' />
            </div>

            <div className='flex items-center gap-[1rem]'>
              <FaAward className='text-[#17B26A] text-[35px]' />
              <RiVerifiedBadgeFill className='text-[#17B26A] text-[35px]' />
            </div>

          </div>

          <div className='flex flex-col gap-[1rem]'>
            <div className='flex items-center gap-[1rem]'>
              <span className='w-[5rem] font-[400]'>Status:   </span>
              <div className='rounded-full border w-[81px] flex items-center justify-center h-[22px]  bg-[#ABEFC6]'>Active</div>
            </div>
            <div className='flex items-center gap-[1rem]'>
              <span className='w-[5rem] font-[400]'>Owner:   </span>
              <div >Henry VII</div>
            </div>
            <div className='flex items-center gap-[1rem]'>
              <span className='w-[5rem] font-[400]'>Country:   </span>
              <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                <img className="w-ful h-full " src={Country} alt="" />
              </div>
            </div>
            <div className='flex items-center gap-[1rem]'>
              <span className='w-[5rem] font-[400]'>Established:   </span>
              <div>2017</div>
            </div>
          </div>

        </div>

      </div>

      <div className="box-shadow mt-[3rem] py-[1rem]  px-[1rem] rounded-lg w-full bg-white h-[max-content]">
        <div className="font-[500]">
          Reviews
        </div>
         {
          reviewers.map(review=>{
            return <ReviewersCard key={review.id} isEditable={false} review={review}/>
          })
         }
      </div>

    </div>
  )
}

export default ExchangerDetails