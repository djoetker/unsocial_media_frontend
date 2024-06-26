import InfiniteScroll from 'react-infinite-scroll-component';

import PostAPost from "../../components/PostAPost/PostAPost";
import "./Home.css";
import { useData } from '../../context/DataContext';
import ViewPost from '../../components/ViewPost/ViewPost';

function Home() {
  const { randomPosts, getRandomPosts, previousPostIds, dataLeft, searchBarActive, getPostsBySearchQuery, queryData, setInitialized } = useData();

  const fetchRandomPosts = () => {
    getRandomPosts(previousPostIds);
  };

  const fetchPostsBySearch = () => {
    getPostsBySearchQuery(previousPostIds, queryData);
  };

  const fetchNextPosts = () => {
    if (searchBarActive) {
      fetchPostsBySearch();
      setInitialized(true);
    } else {
      fetchRandomPosts();
      setInitialized(true);
    };
  };

  return (
    <div className="home_container">
      <PostAPost />
      <InfiniteScroll
        dataLength={randomPosts.length}
        next={fetchNextPosts}
        hasMore={dataLeft}
        // loader={<p style={{ textAlign: 'center', margin: "1rem" }}>scroll to see posts...</p>}
        loader={<div className="loading_spinner"></div>}
        endMessage={
          <div className="end_message">
            < p style={{ textAlign: 'center', margin: "1rem" }}>
              You have seen it all
            </p >
          </div>
        }
        initialScrollY={0}
      >
        <div className='viewpost_container'>
          {randomPosts.map(post => (
            <ViewPost key={post._id} post={post} />
          ))}
        </div>
      </InfiniteScroll >
    </div >
  );
};


export default Home;