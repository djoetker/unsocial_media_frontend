import { createContext, useContext, useState, useEffect } from "react";
import * as api from "../utilities/api.js";

const DataContext = createContext({});

function DataContextProvider({ children }) {
  const [queryData, setQueryData] = useState("");
  const [randomPosts, setRandomPosts] = useState([]);
  const [previousPostIds, setPreviousPostIds] = useState([]);
  const [dataLeft, setDataLeft] = useState(true);
  const [update, setUpdate] = useState(true);
  const [searchBarActive, setSearchBarActive] = useState(false);

  console.log("prevIds: ", previousPostIds);

  const getPostsBySearchQuery = async (prevPostIds, query) => {
    try {
      const response = await api.searchPosts(prevPostIds, query);
      if (response.posts.length === 0) setDataLeft(false);
      console.log("dataLeft: ", dataLeft);
      setRandomPosts((prevPosts) => ([
        ...prevPosts,
        ...response.posts
      ]));
      setPreviousPostIds(([...response.updatedPostIds]));

    } catch (error) {
      console.error("Error fetching posts: ", error);
    };
  };

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
      console.error("Error updating posts: ", error);
    };
  };

  useEffect(() => {
    if (previousPostIds.length > 0) {
      updateVisiblePosts(previousPostIds);
    }
  }, [update]);

  useEffect(() => {
    getRandomPosts(previousPostIds);
  }, []);


  return (
    <DataContext.Provider value={{ randomPosts, getRandomPosts, previousPostIds, setRandomPosts, setPreviousPostIds, dataLeft, setUpdate, update, searchBarActive, setSearchBarActive, getPostsBySearchQuery, queryData, setQueryData, setDataLeft }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;

export const useData = () => {
  return useContext(DataContext);
};