import InfiniteScroll from 'react-infinite-scroll-component';

import PostAPost from "../../components/PostAPost/PostAPost";
import "./Home.css";
import { useData } from '../../context/DataContext';
import ViewPost from '../../components/ViewPost/ViewPost';

function Home() {
  const {randomPosts, getRandomPosts, previousPostIds, dataLeft} = useData();

  const fetchRandomPosts = () => {
    getRandomPosts(previousPostIds);
  };

  return (
    <div className="home_container">
      <PostAPost/>
      <InfiniteScroll 
      dataLength={randomPosts.length}
      next={fetchRandomPosts}
      hasMore={dataLeft}
      loader={<h4>loading...</h4>} 
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>You have seen it all</b>
        </p>
      }
      >
        <div className='viewpost_container'>
        {randomPosts.map(post => (
          <ViewPost key={post._id} post={post} />
        ))}
      </div>
      </InfiniteScroll>
    </div>
  );
};


export default Home;