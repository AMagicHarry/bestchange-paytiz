import Blog1 from '../../../assets/Blog1.svg'
import Blog2 from '../../../assets/Blog2.svg'
import Blog3 from '../../../assets/Blog3.svg'
import Arrow from '../../../assets/arrow.svg'
import Pagination from '../../../components/pagination/Pagination'
import { useState } from 'react'

import Blog4 from '../../../assets/Blog4.svg'
import Blog6 from '../../../assets/Blog6.svg'
import Blog7 from '../../../assets/Blog7.svg'
import Blog8 from '../../../assets/Blog8.svg'
import Blog9 from '../../../assets/Blog9.svg'

interface BlogPost {
  id: string;
  title: string;
  avatar: string;
  content: string;
  user: string;
  date: string;
}


const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Crypto; what you need to know",
    content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque labore culpa magnam corrupti. Inventore doloribus ut accusantium libero illo incidunt, asperiores consequuntur cum mollitia doloremque consequatur sunt soluta sit maiores",
    avatar: Blog1,
    user: 'Olivia Rhyne',
    date: '20 Jan 2024'
  },
  {
    id: "2",
    title: "Crypto; what you need to know",
    content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque labore culpa magnam corrupti. Inventore doloribus ut accusantium libero illo incidunt, asperiores consequuntur cum mollitia doloremque consequatur sunt soluta sit maiores",
    avatar: Blog2,
    user: 'Olivia Rhyne',
    date: '20 Jan 2024'
  },
  {
    id: "3",
    title: "Crypto; what you need to know",
    content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque labore culpa magnam corrupti. Inventore doloribus ut accusantium libero illo incidunt, asperiores consequuntur cum mollitia doloremque consequatur sunt soluta sit maiores",
    avatar: Blog3,
    user: 'Olivia Rhyne',
    date: '20 Jan 2024'
  },
  {
    id: "3",
    title: "Crypto; what you need to know",
    content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque labore culpa magnam corrupti. Inventore doloribus ut accusantium libero illo incidunt, asperiores consequuntur cum mollitia doloremque consequatur sunt soluta sit maiores",
    avatar: Blog3,
    user: 'Olivia Rhyne',
    date: '20 Jan 2024'
  },
]

const allBlogPosts = [
  {
    id: "1",
    title: "Crypto; what you need to know",
    content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque labore culpa magnam corrupti. Inventore doloribus ut accusantium libero illo incidunt, asperiores consequuntur cum mollitia doloremque consequatur sunt soluta sit maiores",
    avatar: Blog4,
    user: 'Olivia Rhyne',
    date: '20 Jan 2024'
  },
  {
    id: "2",
    title: "Crypto; what you need to know",
    content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque labore culpa magnam corrupti. Inventore doloribus ut accusantium libero illo incidunt, asperiores consequuntur cum mollitia doloremque consequatur sunt soluta sit maiores",
    avatar: Blog9,
    user: 'Olivia Rhyne',
    date: '20 Jan 2024'
  },
  {
    id: "3",
    title: "Crypto; what you need to know",
    content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque labore culpa magnam corrupti. Inventore doloribus ut accusantium libero illo incidunt, asperiores consequuntur cum mollitia doloremque consequatur sunt soluta sit maiores",
    avatar: Blog6,
    user: 'Olivia Rhyne',
    date: '20 Jan 2024'
  },
  {
    id: "4",
    title: "Crypto; what you need to know",
    content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque labore culpa magnam corrupti. Inventore doloribus ut accusantium libero illo incidunt, asperiores consequuntur cum mollitia doloremque consequatur sunt soluta sit maiores",
    avatar: Blog7,
    user: 'Olivia Rhyne',
    date: '20 Jan 2024'
  },
  {
    id: "5",
    title: "Crypto; what you need to know",
    content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque labore culpa magnam corrupti. Inventore doloribus ut accusantium libero illo incidunt, asperiores consequuntur cum mollitia doloremque consequatur sunt soluta sit maiores",
    avatar: Blog8,
    user: 'Olivia Rhyne',
    date: '20 Jan 2024'
  },
  {
    id: "6",
    title: "Crypto; what you need to know",
    content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque labore culpa magnam corrupti. Inventore doloribus ut accusantium libero illo incidunt, asperiores consequuntur cum mollitia doloremque consequatur sunt soluta sit maiores",
    avatar: Blog9,
    user: 'Olivia Rhyne',
    date: '20 Jan 2024'
  },
  {
    id: "7",
    title: "Crypto; what you need to know",
    content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque labore culpa magnam corrupti. Inventore doloribus ut accusantium libero illo incidunt, asperiores consequuntur cum mollitia doloremque consequatur sunt soluta sit maiores",
    avatar: Blog7,
    user: 'Olivia Rhyne',
    date: '20 Jan 2024'
  },
  {
    id: "8",
    title: "Crypto; what you need to know",
    content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque labore culpa magnam corrupti. Inventore doloribus ut accusantium libero illo incidunt, asperiores consequuntur cum mollitia doloremque consequatur sunt soluta sit maiores",
    avatar: Blog9,
    user: 'Olivia Rhyne',
    date: '20 Jan 2024'
  },
]



const Blog = () => {

  const resultsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * resultsPerPage;
  const indexOfFirstPost = indexOfLastPost - resultsPerPage;
  const currentPosts = allBlogPosts.slice(indexOfFirstPost, indexOfLastPost);


  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };


  return (
    <div className='sm:p-[1rem] pb-[2rem] '>
      <div className='w-full bg-white mt-[2rem] box-shadow sm:rounded-lg  p-[1rem]'>
        <h1 className='font-[500] text-[1.5rem] mb-[2rem]'>Recent blog posts</h1>

        <div className='w-full flex flex-col md:flex-row   gap-[1rem] flex-wrap'>
          <div className='flex flex-1 flex-col gap-[.2rem]'>
            <div className="w-full h-[296px] rounded-lg overflow-hidden ">
              <img className='w-full h-full object-cover' src={blogPosts[0].avatar} alt="" />
            </div>
            <div className='font-[600] mt-[.3rem] text-[14px] text-[#6941C6]'>
              <span>{blogPosts[0].user} <span>.</span> {blogPosts[0].date}</span>
            </div>
            <div className='flex font-[600] text-[24px] items-center justify-between gap-[1rem]'>
              <span>
                {
                  blogPosts[0].title
                }
              </span>
              <img src={Arrow} alt="Icon" />
            </div>
            <span className='ellipsis-2-lines text-[#475467]'>
              {
                blogPosts[0].content
              }
            </span>

          </div>

          <div className='flex-1 flex flex-col sm:flex-row md:flex-col  gap-[1rem]'>
            {
              blogPosts.slice(0, 2).map((blog) => {
                return <div key={blog.id} className='flex flex-col md:flex-row gap-[1rem]'>
                  <div className='h-[200px] md:min-w-[352px]  overflow-hidden rounded-lg w-full max-w-[320px]'>
                    <img src={blog.avatar} className='w-full object-cover h-full' alt="Image" />
                  </div>
                  <div>
                    <div>
                      <span className='font-[600] mt-[.3rem] text-[14px] text-[#6941C6]'>{blog.user}.{blog.date}</span>
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

      </div>
      <div className='w-full bg-white mt-[2rem] box-shadow sm:rounded-lg  p-[1rem]'>
        <h1 className='font-[500] text-[1.5rem] mb-[2rem]'>All blog posts</h1>

        <div className="w-full flex flex-wrap gap-4">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {currentPosts.map((blog) => (
            <div key={blog.id} className="flex  group   flex-col ">
              <div className="w-full relative rounded-lg cursor-pointer hover:scale-[102%] duration-300 overflow-hidden">
              <div className="absolute w-full opacity-0 group-hover:opacity-[.1] h-full bg-black">

              </div>
                <img className="w-full h-[240px] object-cover" src={blog.avatar} alt="" />
              </div>
              <div className="font-semibold mt-1 text-sm text-purple-600">
                <span>{blog.user} <span>·</span> {blog.date}</span>
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

        <Pagination
        totalResults={allBlogPosts.length}
        resultsPerPage={resultsPerPage}
        onPageChange={onPageChange}
        maxVisiblePages={5}
      />


      </div>


    </div>
  )
}

export default Blog