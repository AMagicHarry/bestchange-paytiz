import { FaAward } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import ReviewersCard from "../../../../components/ReviewersCard/ReviewersCard";
import SwitchButton from "../../../../components/switchbutton/SwitchButton";
import { useState } from "react";
import { getExchangerApi } from "../../../../service/api/exchanger";
import useFetch from "../../../../components/useFetch/useFetch";
import { Exchanger } from "../../../../utils/types";
import { useParams } from "react-router-dom";
import { getReviewsApi } from "../../../../service/api/review";
import { Review } from "../../../../utils/types";
import { useEffect } from "react";
import { CountryAvatar } from "../../../../components/CountryFlag/CountryFlage";

const ExchangerDetails = () => {

  const {exchangerId} = useParams()

    const { data:exchanger} = useFetch<Exchanger>({
      apiCall: ()=>getExchangerApi({exchangerId:exchangerId??""}),
      dependencies:[exchangerId]
    });

    const { data:reviews } = useFetch<Review[]>({
      apiCall: ()=>getReviewsApi(exchangerId??""),
      dependencies:[exchangerId]
    });

   const [isToggled, setIsToggled] = useState(false);
   const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
     setIsToggled(e.target.checked); 
   };

   useEffect(() => {
    if (exchanger) {
      setIsToggled(exchanger.siteOn);
    }
  }, [exchanger]);


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
            <img src={exchanger?.avatar} className='w-full h-full' alt="Image" />
          </div>

          <div className='flex flex-col justify-start gap-[2rem]'>

            <span>
              <div className='w-[60px] h-[60px] rounded-full overflow-hidden'>
                <img src={exchanger?.avatar} alt="" />
              </div>
              <div className='font-[600]'>
                {exchanger?.name}
              </div>
              <p>{exchanger?.website}</p>
            </span>

            <div className='flex items-center gap-[.5rem]'>
                                {Array.from({ length: exchanger?.rating??0 }, (_, index) => (
                                    <FaStar key={index} className='text-[#FDB022] text-[14px]' />
                                ))}
              </div>

            <div className='flex items-center gap-[1rem]'>
              {
                exchanger?.verified && <FaAward className='text-[#17B26A] text-[35px]' />
              }
             {
              exchanger?.legalRegistration &&  <RiVerifiedBadgeFill className='text-[#17B26A] text-[35px]' />
             }
            </div>

          </div>

          <div className='flex flex-col gap-[1rem]'>
            <div className='flex items-center gap-[1rem]'>
              <span className='w-[5rem] font-[400]'>Status:   </span>
              <div className='rounded-full border  flex items-center px-[1rem] justify-center h-[33px]  bg-[#ABEFC6]'>{exchanger?.isActive?"Active":"Suspended"}</div>
            </div>
            <div className='flex items-center gap-[1rem]'>
              <span className='w-[5rem] font-[400]'>Owner:   </span>
              <div >{exchanger?.user?.firstName}  {exchanger?.user?.lastName}</div>
            </div>
            <div className='flex items-center gap-[1rem]'>
              <span className='w-[5rem] font-[400]'>Country:   </span>
              <div className='w-[40px] h-[40px] rounded-full overflow-hidden'>
                            <CountryAvatar code={exchanger?.user.countryCode??""}/>
                        </div>
            </div>
            <div className='flex items-center gap-[1rem]'>
              <span className='w-[5rem] font-[400]'>Established:   </span>
              <div>{exchanger?.createdAt}</div>
            </div>
          </div>

        </div>

      </div>

      <div className="box-shadow mt-[3rem] py-[1rem]  px-[1rem] rounded-lg w-full bg-white h-[max-content]">
        <div className="font-[500]">
          Reviews
        </div>
         {
          reviews?.map(review=>{
            return <ReviewersCard key={review._id} isEditable={false} review={review}/>
          })
         }
      </div>

    </div>
  )
}

export default ExchangerDetails