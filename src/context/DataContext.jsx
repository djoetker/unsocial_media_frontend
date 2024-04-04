import { createContext, useContext, useState, useEffect } from "react";
import * as api from "../utilities/api.js";

const DataContext = createContext({});

function DataContextProvider({children}) {
  const [randomPosts, setRandomPosts] = useState([]);
  const [previousPostIds, setPreviousPostIds] = useState([]);

  const getRandomPosts = async (prevPostIds) => {
    try {
      const response = await api.getRandomPosts(prevPostIds);
      console.log(response);
      setRandomPosts((prevPosts) => ([
        ...prevPosts,
        ...response.posts
      ]));

    setPreviousPostIds(([...response.updatedPostIds]));
    console.log(previousPostIds)

    } catch (error) {
      console.error("Error fetching posts: ", error);
    };
  };

  useEffect(() => {
    getRandomPosts(previousPostIds);
  }, []);


return (
  <DataContext.Provider value={{randomPosts, getRandomPosts, previousPostIds, setRandomPosts, setPreviousPostIds}}>
    {children}
  </DataContext.Provider> 
  );  
};

export default DataContextProvider;

export const useData = () => {
  return useContext(DataContext);
};