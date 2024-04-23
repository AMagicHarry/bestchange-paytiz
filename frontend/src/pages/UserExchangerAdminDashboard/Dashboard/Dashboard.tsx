import ReviewersCard from "../../../components/ReviewersCard/ReviewersCard";
import SwitchButton from "../../../components/switchbutton/SwitchButton";
import Avatar from '../../../assets/exchangerAvatar.svg'
import DatePicker from '../../../components/DatePicker/DatePicker';
import { MdOutlineFilterList } from 'react-icons/md';
import Arrowup from '../../../assets/arrow-up.svg'
import Chart from '../../../assets/Line and bar chart.svg'
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { getReviewsApi } from '../../../service/api/review';
import { Exchanger, Review } from '../../../utils/types';
import { getUserExchangerApi } from '../../../service/api/exchanger';
import { useEffect } from 'react';
import { CountryAvatar } from "../../../components/CountryFlag/CountryFlage";
import { formatDate } from "../../../utils/functions";
import { useAuthContext } from "../../../hooks/useAuthContext";


const Dashboard = () => {
  const { username } = useParams();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [exchanger, setExchanger] = useState<Exchanger | null>(null);

  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [exchangerLoading, setExchangersLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState(null);
  const [exchangerError, setExchangerError] = useState(null);

  const { setUser } = useAuthContext()


  useEffect(() => {
    if (reviewsError) {
      console.error("Failed to load reviews:", reviewsError);
    }
    if (exchangerError) {
      console.error("Failed to load exchanger info:", exchangerError);
    }
    if(reviewsLoading){
      console.error("Failed to load exchanger info:", reviewsError);
    }
  }, [reviewsError, exchangerError,reviewsLoading]);
  



  const fetchReviews = async () => {
    setReviewsLoading(true);
    setReviewsError(null);
    try {
      if (username && exchanger?._id) {
        const { data } = await getReviewsApi(exchanger.user._id);
        console.log(data)
        setReviews(data);
      }
    } catch (error: any) {
      setReviewsError(error?.response.data);
      console.error("Failed to fetch reviews:", error);
    } finally {
      setReviewsLoading(false);
    }
  };


  const fetchExchanger = async () => {
    setExchangersLoading(true);
    setExchangerError(null);
    try {
      if (username) {
        const { data }: { data: Exchanger } = await getUserExchangerApi({ userName: username });
        setExchanger(data);
        setUser(data?.user)
      }
    } catch (error: any) {
      setExchangerError(error.message);
      console.error("Failed to fetch exchangers:", error);
    } finally {
      setExchangersLoading(false);
    }
  };

  useEffect(() => {
    fetchExchanger();
  }, [username]);

  useEffect(() => {
    fetchReviews();
  }, [exchanger?.user._id]);

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
            <span className="font-[500] text-[12px]">
              Get Verified
            </span>
          </span>
          <span className="cursor-pointer flex items-center  gap-[.5rem] hover:text-gray-500">
            <span className="font-[500] text-[12px]">
              Verify legal registration
            </span>
          </span>
        </div>
      </div>

      <div className="w-full box-shadow flex flex-col gap-[2rem] justify-between p-[1rem] sm:rounded-lg  bg-white mt-[2rem]">
        <span className='text-[#475467] text-[25px] font-[500] '>Welcome Back Administrator</span>

        {
          exchangerLoading && !exchanger ? <div className="w-full  flex flex-col items-start justify-center p-4 rounded-md border overflow-hidden">
            <div className="h-full flex flex-col gap-[1rem] w-full">
              <div className="h-[4rem] w-full max-w-[20rem] bg-gray-200 rounded-md animate-pulse">
              </div>
              <div className="h-[8rem] w-full max-w-[35rem] bg-gray-200 rounded-md animate-pulse">
              </div>
              <div className="h-[1rem] w-full max-w-[10rem] bg-gray-200 rounded-md animate-pulse">
              </div>
            </div>
          </div> : <div className="flex flex-col  items-start gap-[3rem]">

            <div className='flex items-center  justify-start gap-[1rem]'>
              <div className='w-[60px] h-[60px] rounded-full overflow-hidden'>
                <img src={Avatar} alt="" />
              </div>
              <div>
                <div className='font-[600]'>
                  {
                    exchanger?.name
                  }
                </div>
                <p>{exchanger?.website}</p>
              </div>

            </div>

            <div className="flex flex-col sm:flex-row gap-[4rem]">
              <div className='flex flex-col gap-[1rem]'>
                <div className='flex items-center gap-[1rem]'>
                  <span className='w-[5rem] text-[16px] text-[#475467] font-[400]'>Status:   </span>
                  <div className='rounded-full border w-[81px] flex items-center justify-center h-[22px]  bg-[#ABEFC6]'>{exchanger?.isActive ? "Active" : "Suspended"}</div>
                </div>
                <div className='flex items-center gap-[1rem]'>
                  <span className='w-[5rem]  text-[16px]text-[#475467] font-[400]'>Owner:   </span>
                  <div >{exchanger?.user.firstName}  {exchanger?.user.lastName}</div>
                </div>
                <div className='flex items-center gap-[1rem]'>
                  <span className='w-[5rem] text-[16px] text-[#475467] font-[400]'>Country:   </span>
                  <div className='w-[40px] h-[40px] rounded-full overflow-hidden'>
                    <CountryAvatar code={exchanger?.user.countryCode ?? ""} />
                  </div>
                  <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                    <img className="w-ful h-full " src={exchanger?.user.country} alt="" />
                  </div>
                </div>
                <div className='flex items-center gap-[1rem]'>
                  <span className='w-[5rem] text-[16px] text-[#475467] font-[400]'>Established:   </span>
                  <div>{formatDate(exchanger?.createdAt ?? "")}</div>
                </div>
              </div>

              <div className="flex flex-col gap-[1rem]">
                <h1 className="text-[#475467] text-[12px] font-[500]">Compatible Amount</h1>
                <div className='flex flex-col items-start gap-[.5rem]'>

                  <span className='flex items-center gap-[.2rem]'>
                    <span className="text-[#475467]">min:</span>
                    <span className='font-[600] text-[14px]'>{exchanger?.rateRange.min}</span> <span className='font-[400] text-[#475467] text-[12px]'>BTC</span>
                  </span>
                  <div className='border-[1px] border-[#D0D0D0] w-full sm:w-[200px]'>

                  </div>
                  <span className='flex items-center gap-[.2rem]'>
                    <span className="text-[#475467]">max:</span>
                    <span className='font-[600] text-[14px]'>{exchanger?.rateRange.min}</span> <span className='font-[400] text-[#475467] text-[12px]'>BTC</span>
                  </span>

                </div>

              </div>
            </div>

          </div>
        }



      </div>

      <div className="w-full box-shadow p-[1rem] sm:rounded-lg  bg-white mt-[2rem]">
        <div className="flex gap-[1rem] sm:justify-between flex-col md:flex-row">

          <div className='flex border w-[max-content] rounded-md overflow-hidden'>
            <div className='w-[max-content] px-[1rem] py-[.5rem] border-r'>12 months</div>
            <div className='w-[max-content] px-[1rem] py-[.5rem] border-r'>30 days</div>
            <div className='w-[max-content] px-[1rem] py-[.5rem] border-r'>7 days</div>
            <div className='w-[max-content] px-[1rem] py-[.5rem] '>24 hours</div>
          </div>

          <div className='flex gap-[1rem]'>
            <DatePicker />
            <div className='flex items-center gap-[1rem] rounded-md bg-white py-[.5rem] border px-[.5rem]'>
              <span>Filters</span>
              <MdOutlineFilterList />
            </div>
          </div>

        </div>

        <div className='flex flex-col sm:flex-row justify-between gap-[1rem] mt-[2rem]'>
          <div>
            <div className='text-[12px] font-[500]'>Total traffic</div>
            <div className='flex items-end gap-[1rem]'>
              <span className='text-[2rem] font-[600]'>
                18,880
              </span>
              <div className='flex items-center mb-[1rem]  gap-[.5rem]'>
                <img src={Arrowup} alt="" />
                <span
                  style={{
                    color: "#17B26A"
                  }}
                  className='font-[500]'>
                  7.4%
                </span>
              </div>

            </div>
          </div>
          <div className='flex-1'>
            <img className='w-full h-full object-cover ' src={Chart} alt="chart" />
          </div>

          <div className='flex flex-col'>
            <div>
              <div className='font-[500] text-[12px]'>Total traffic</div>
              <div className='flex items-end gap-[1rem]'>
                <span className='text-[2rem] font-[600]'>
                  100,239
                </span>
                <div className='flex items-center mb-[1rem]  gap-[.5rem]'>
                  <img src={Arrowup} alt="" />
                  <span
                    style={{
                      color: "#17B26A"
                    }}
                    className='font-[500]'>
                    7.4%
                  </span>
                </div>

              </div>
            </div>
            <div>
              <div className='font-[500] text-[12px]'>Total traffic</div>
              <div className='flex items-end gap-[1rem]'>
                <span className='text-[2rem] font-[600]'>
                  300,781
                </span>
                <div className='flex items-center mb-[1rem]  gap-[.5rem]'>
                  <img src={Arrowup} alt="" />
                  <span
                    style={{
                      color: "#17B26A"
                    }}
                    className='font-[500]'>
                    6.6%
                  </span>
                </div>

              </div>
            </div>
            <div>
              <div className='font-[500] text-[12px]'>Conversion rate</div>
              <div className='flex items-end gap-[1rem]'>
                <span className='text-[2rem] font-[600]'>
                  33%
                </span>
                <div className='flex items-center mb-[1rem]  gap-[.5rem]'>
                  <img src={Arrowup} alt="" />
                  <span
                    style={{
                      color: "#17B26A"
                    }}
                    className='font-[500]'>
                    8.1%
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>


      <div className="box-shadow mt-[3rem] py-[1rem]  px-[1rem] rounded-lg w-full bg-white h-[max-content]">
        <div className='w-full border-b'>
          <div className="font-[500]">
            Reviews
          </div>
          {
            reviews && reviews.length > 0 && reviews.slice(0, 1).map(review => {
              return <ReviewersCard key={review._id} isEditable={true} review={review} />
            })
          }
        </div>
        <div className="flex p-[1rem] justify-end">
          <Link to="reviews" className='mt-[1rem] font-[500]'>See all</Link>
        </div>
      </div>

    </div>
  )
}

export default Dashboard