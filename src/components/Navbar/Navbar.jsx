import "./Navbar.css"
import { useData } from "../../context/DataContext";

import image from "../../../images/magnifying_glass.png";

function Navbar() {
  const { setPreviousPostIds, setRandomPosts, getPostsBySearchQuery, setSearchBarActive, setQueryData, setDataLeft, searchBarActive, setSearchData, searchData, searchInputRef } = useData();



  const changeHandler = (evt) => {
    setSearchData(evt.target.value);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      <form className="searchbar_container" onSubmit={submitHandler}>
        <input type="text" name="search_bar" id="search_bar" value={searchData} onChange={changeHandler} placeholder="text or #" ref={searchInputRef} />
        <button type="submit">
          <img src={image} alt="magnifying_glass" />
        </button>
      </form>
    </div>
  );
};


export default Navbar;