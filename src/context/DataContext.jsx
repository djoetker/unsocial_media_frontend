import { createContext, useContext, useState, useEffect } from "react";
import * as api from "../utilities/api.js";

const DataContext = createContext({});

function DataContextProvider({children}) {
  const [randomPosts, setRandomPosts] = useState([]);
  const [previousPostIds, setPreviousPostIds] = useState([]);
  const [dataLeft, setDataLeft] = useState(true);
  const [update, setUpdate] = useState(true);


  const getRandomPosts = async (prevPostIds) => {
    try {
      const response = await api.getRandomPosts(prevPostIds);
      if (response.posts.length === 0) setDataLeft(false);
      setRandomPosts((prevPosts) => ([
        ...prevPosts,
        ...response.posts
      ]));

    setPreviousPostIds(([...response.updatedPostIds]));

    } catch (error) {
      console.error("Error fetching posts: ", error);
    };
  };

  const updateVisiblePosts = async (prevPostIds) => {
    try {
      const response = await api.updatePosts(prevPostIds);
      setRandomPosts([...response]);
    } catch (error) {
      console.error("Error fetching posts: ", error);
    };
  };

  useEffect(() => {
    if (previousPostIds.length > 0){
      updateVisiblePosts(previousPostIds);
  }
  }, [update]);

  useEffect(() => {
    getRandomPosts(previousPostIds);
  }, []);


return (
  <DataContext.Provider value={{randomPosts, getRandomPosts, previousPostIds, setRandomPosts, setPreviousPostIds, dataLeft, setUpdate, update}}>
    {children}
  </DataContext.Provider> 
  );  
};

export default DataContextProvider;

export const useData = () => {
  return useContext(DataContext);
};