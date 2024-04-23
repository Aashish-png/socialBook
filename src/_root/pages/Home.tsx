import Loader from '@/components/shared/Loader';
import PostCard from '@/components/shared/PostCard';
import { useGetRecentPost } from '@/lib/React-query/queriesAndMutation';
import { Models } from 'appwrite';
import { Divide } from 'lucide-react';

const Home = () => {
  

  // const { data:posts, isPending:isPostLoading, isError: isErrorPosts}= useGetRecentPost();
  const { data:posts, isPending:isPostLoading, isError: isErrorPosts}= useGetRecentPost();


  return (
    <div className='flex flex-1'>
      <div  className='home-container'>
      <div className='home-posts'>

        <h2  className='h3-bold md:h2-bold text-left w-full' >Home Feed</h2>
          {isPostLoading && !posts? (<Loader/>):(
            <ul  className='flex flex-col flex-1 gap-9  w-full'>
            {posts?.documents.map((post:Models.Document)=>(

              <PostCard post={post} key={post.caption} />
            ))}
            
            </ul>
          )}
          {isErrorPosts && ( <h2  className='h3-bold md:h2-bold text-left w-full' > Something went wrong Please try again later  </h2>)}
      </div>
      </div>
    </div>
  )
}

export default Home