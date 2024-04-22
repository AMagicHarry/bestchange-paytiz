import { FaAward } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import ReviewersCard from "../../../components/ReviewersCard/ReviewersCard";
import SwitchButton from "../../../components/switchbutton/SwitchButton";
import { useState } from "react";
import { getReviewsApi } from "../../../service/api/review";
import { Review } from "../../../utils/types";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { getUserExchangerApi } from "../../../service/api/exchanger";
import { useEffect } from "react";



const Reviews = () => {

  const {username} = useParams()

  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);




  const fetchReviews = async () => {
    setReviewsLoading(true);
    try {
     if(username){
      const exchangerResponse = await getUserExchangerApi({userName:username}); 
      const {data} = await getReviewsApi(exchangerResponse?.data.user._id); 
      console.log(data)
      setReviews(data);
     }
    } catch (error:any) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setReviewsLoading(false);
    }
  };


  useEffect(() => {
    fetchReviews();
  }, [username]);

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
          reviews && reviews.length > 0 && !reviewsLoading ? reviews.map((review:Review) => {
            return <ReviewersCard key={review._id} isEditable={true} review={review} />
          }):<div className="mt-[2rem] flex items-center justify-center">
          <ClipLoader size={14} color='black' />
        </div>
        }
      </div>

    </div>
  )
}

export default Reviews