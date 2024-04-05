import { useState } from "react";
import "./PostAPost.css";

import * as api from "../../utilities/api.js";
import { useData } from "../../context/DataContext";


const initialPostData = {
  content: "",
  tags: ""
}

function PostAPost() {
  const [postData, setPostData] = useState(initialPostData);
  const {setRandomPosts, setPreviousPostIds} = useData();

  const changeHandler = (evt) => {
    setPostData((prevData) => ({
      ...prevData,
      [evt.target.name]: evt.target.value
    }));
  };

  const onSubmitHandler = async (evt) => {
    evt.preventDefault();
    const response = await api.createNewPost(postData);
    setPostData(initialPostData);
    setRandomPosts((prevPosts) => ([
      response,
      ...prevPosts
    ]));

    setPreviousPostIds((prevIds) => ([
      response._id,
      ...prevIds
    ]));
  };

  return (
    <div className="post_container">
      <div className="form_container">
        <form onSubmit={onSubmitHandler}>
          <label htmlFor="post">
            <textarea name="content" id="post" cols="5" rows="10" placeholder="what's on your mind?" onChange={changeHandler} value={postData.content}></textarea>
            </label>
            <section className="tags_and_button_container">
              <label htmlFor="tags">
                <input type="text" name="tags" id="tags" placeholder="enter #hashtags" onChange={changeHandler} value={postData.tags}/>
              </label>
              <section className="button_and_count">
                <button type="submit" >POST</button>
              </section>
            </section>
        </form>
      </div>
    </div>
  );
};


export default PostAPost;