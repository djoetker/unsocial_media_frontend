import "./Navbar.css"
import { useData } from "../../context/DataContext";
import { useState } from "react";

function Navbar() {
  const { setPreviousPostIds, setRandomPosts, getPostsBySearchQuery, setSearchBarActive, setQueryData, setDataLeft, searchBarActive } = useData();
  const [searchData, setSearchData] = useState("");

  const changeHandler = (evt) => {
    setSearchData(evt.target.value);
  };

  const submitHandler = async (evt) => {
    evt.preventDefault();
    setDataLeft(true);
    if (!searchBarActive) setSearchBarActive(true);
    setPreviousPostIds([]);
    setRandomPosts([]);
    setQueryData(searchData);
    // fetch with search query
    try {
      await getPostsBySearchQuery([], searchData);
      setSearchData("");
    } catch (error) {
      console.error(error, "Error fetching posts!");
    };
  };

  return (
    <div className="navbar_container">
      <section className="brandname_container">
        <p><span>un</span>social media</p>
      </section>
      <form action="" className="searchbar_container" onSubmit={submitHandler}>
        <input type="text" name="search_bar" id="search_bar" value={searchData} onChange={changeHandler} placeholder="text or #" />
        <button type="submit">
          <img src="../../../images/magnifying_glass.png" alt="magnifying_glass" />
        </button>
      </form>
    </div>
  );
};


export default Navbar;