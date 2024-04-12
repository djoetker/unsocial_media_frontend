import { createContext, useContext, useState, useEffect, useRef } from "react";
import * as api from "../utilities/api.js";

const DataContext = createContext({});

function DataContextProvider({ children }) {
  const searchInputRef = useRef(null);
  const [queryData, setQueryData] = useState("");
  const [randomPosts, setRandomPosts] = useState([]);
  const [previousPostIds, setPreviousPostIds] = useState([]);
  const [dataLeft, setDataLeft] = useState(true);
  const [update, setUpdate] = useState(true);
  const [searchBarActive, setSearchBarActive] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [initialized, setInitialized] = useState(false);

  const getPostsBySearchQuery = async (prevPostIds, query) => {
    try {

      const response = await api.searchPosts(prevPostIds, query);
      if (response.posts.length < 4) setDataLeft(false);
      setRandomPosts((prevPosts) => ([
        ...prevPosts,
        ...response.posts
      ]));

      setPreviousPostIds((prevPostIds) => ([...response.updatedPostIds]));

    } catch (error) {
      console.error("Error fetching posts: ", error);
    };
  };

  const getRandomPosts = async (prevPostIds) => {
    try {
      const response = await api.getRandomPosts(prevPostIds);
      if (response.posts.length < 8) setDataLeft(false);
      setRandomPosts((prevPosts) => ([
        ...prevPosts,
        ...response.posts
      ]));

      setPreviousPostIds((prevPostIds) => ([...response.updatedPostIds]));


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

  // useEffect(() => {
  //   if (!initialized) {
  //     getRandomPosts(previousPostIds);
  //   }
  // }, []);


  return (
    <DataContext.Provider value={{ randomPosts, getRandomPosts, previousPostIds, setRandomPosts, setPreviousPostIds, dataLeft, setUpdate, update, searchBarActive, setSearchBarActive, getPostsBySearchQuery, queryData, setQueryData, setDataLeft, searchData, setSearchData, searchInputRef, setInitialized }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;

export const useData = () => {
  return useContext(DataContext);
};