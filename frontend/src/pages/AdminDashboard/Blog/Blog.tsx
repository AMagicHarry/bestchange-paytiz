import Arrow from '../../../assets/arrow.svg'
import Pagination from '../../../components/pagination/Pagination'
import { useState } from 'react'
import useFetch from '../../../components/useFetch/useFetch'
import { getBlogsApi } from '../../../service/api/blog'
import { getRecentBlogsApi } from '../../../service/api/blog'
import { Blog as BlogType } from '../../../utils/types'
import { ClipLoader } from 'react-spinners'
import { formatDate } from '../../../utils/functions'




const Blog = () => {

  const resultsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * resultsPerPage;
  const indexOfFirstPost = indexOfLastPost - resultsPerPage;
  
  
  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  const { data: blogs, loading: blogsLoding, error: blogsError } = useFetch<BlogType[]>({
    apiCall: () => getBlogsApi()
  });
  
  console.log(blogs)
  
  const { data: recentBlogs, loading: recentBlogsLoding, error: recentBlogsError } = useFetch<BlogType[]>({
    apiCall: () => getRecentBlogsApi()
  });

  const currentBlogs = blogs?.slice(indexOfFirstPost, indexOfLastPost);


  return (
    <div className='sm:p-[1rem] pb-[2rem] '>
      {
        recentBlogs && recentBlogs?.length > 0 && !recentBlogsLoding ? 
        <div className='w-full bg-white mt-[2rem] box-shadow sm:rounded-lg  p-[1rem]'>
          <h1 className='font-[500] text-[1.5rem] mb-[2rem]'>Recent blog posts</h1>

          <div className='w-full flex flex-col md:flex-row   gap-[1rem] flex-wrap'>


            <div className='flex flex-1 flex-col gap-[.2rem]'>
              <div className="w-full h-[296px] rounded-lg overflow-hidden ">
                <img className='w-full h-full object-cover' src={recentBlogs[0].avatar} alt="" />
              </div>
              <div className='font-[600] mt-[.3rem] text-[14px] text-[#6941C6]'>
                <span>{recentBlogs[0].user.firstName} {recentBlogs[0].user.lastName} <span>.</span> {formatDate(recentBlogs[0].createdAt)}</span>
              </div>
              <div className='flex font-[600] text-[24px] items-center justify-between gap-[1rem]'>
                <span>
                  {
                    recentBlogs[0].title
                  }
                </span>
                <img src={Arrow} alt="Icon" />
              </div>
              <span className='ellipsis-2-lines text-[#475467]'>
                {
                  recentBlogs[0].content
                }
              </span>

            </div>


            <div className='flex-1 flex flex-col sm:flex-row md:flex-col  gap-[1rem]'>
              {
                recentBlogs.slice(0, 2).map((blog) => {
                  return <div key={blog._id} className='flex flex-col md:flex-row gap-[1rem]'>
                    <div className='h-[200px] md:min-w-[352px]  overflow-hidden rounded-lg w-full max-w-[320px]'>
                      <img src={blog.avatar} className='w-full object-cover h-full' alt="Image" />
                    </div>
                    <div>
                       <div>
                        <span className='font-[600] mt-[.3rem] text-[14px] text-[#6941C6]'>{blog.user.firstName} {blog.user.lastName}.{formatDate(blog.createdAt)}</span>
                      </div>
                      <div >
                        <span className='flex font-[600] text-[18px] items-center justify-between gap-[1rem]'>
                          {
                            blog.title
                          }
                        </span>
                      </div>
                      <span className='ellipsis-2-lines text-[16px] text-[#475467]'>
                        {
                          blog.content
                        }
                      </span>
                    </div>

                  </div>
                })
              }

            </div>

          </div>

        </div>:<div className='w-full h-full h-[20rem] flex items-center justify-center'>
        <ClipLoader size={14} color='black'/>
        </div>
      }

      {
        currentBlogs && currentBlogs.length > 0 && !blogsLoding ? <div className='w-full bg-white mt-[2rem] box-shadow sm:rounded-lg  p-[1rem]'>
          <h1 className='font-[500] text-[1.5rem] mb-[2rem]'>All blog posts</h1>

          <div className="w-full flex flex-wrap gap-4">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {currentBlogs.map((blog) => (
                <div key={blog._id} className="flex  group   flex-col ">
                  <div className="w-full relative rounded-lg cursor-pointer hover:scale-[102%] duration-300 overflow-hidden">
                    <div className="absolute w-full opacity-0 group-hover:opacity-[.1] h-full bg-black">

                    </div>
                    <img className="w-full h-[240px] object-cover" src={blog.avatar} alt="" />
                  </div>
                  <div>
                        <span className='font-[600] mt-[.3rem] text-[14px] text-[#6941C6]'>{blog.user.firstName} {blog.user.lastName} . {formatDate(blog.createdAt)}</span>
                      </div>
                  <div className="flex  font-semibold text-lg mt-1 items-center justify-between">
                    <span className="truncate">
                      {blog.title}
                    </span>
                    <img src={Arrow} className="w-[10px] h-[10px]" alt="Icon" />
                  </div>
                  <p className="text-gray-600 mt-1 line-clamp-2">
                    {blog.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
      </div>:<div className='w-full  h-[20rem] flex items-center justify-center'>
        <ClipLoader size={14} color='black'/>
        </div>
      }

          <Pagination
            totalResults={blogs?.length??0}
            resultsPerPage={resultsPerPage}
            onPageChange={onPageChange}
            maxVisiblePages={5}
          />




    </div>
  )
}

export default Blog