import { useEffect, useState } from "react";
import "./Comment.css";

import * as api from "../../utilities/api.js";
import { getLinksFromText } from "../../utilities/getLinksFromText.jsx";
import calculateTimeDifference from "../../utilities/calculateTimeDifference.js";
import { useData } from "../../context/DataContext.jsx";

const inititalCommentState = {
  content: ""
};

function Comment({ postId, getComments, setGetComments }) {
  const { setUpdate, update } = useData();

  const [commentData, setCommentData] = useState(inititalCommentState);
  const [commentContent, setCommentContent] = useState([]);

  const changeHandler = (evt) => {
    setCommentData({ [evt.target.name]: evt.target.value })
  };

  const onSubmitHandler = async (evt) => {
    evt.preventDefault();
    const response = await api.createNewComment(postId, commentData);
    setCommentData(inititalCommentState);
    setGetComments(!getComments);
    setUpdate(!update);
  };

  const getCommentsOfPost = async (id) => {
    const response = await api.getPostById(id);
    setCommentContent(response.comments);
  };

  useEffect(() => {
    getCommentsOfPost(postId);
  }, [getComments]);


  return (
    <>
      <div className="comment_container">

        <div className="comment_content_container">
          {commentContent.length > 0 && commentContent.map((comment) => {
            return (
              <div key={comment._id} className="comment">
                <section className="comment_content">
                  <p>{getLinksFromText(comment.content)}</p>
                </section>
                <section className="comment_info"  >
                  <span>posted {calculateTimeDifference(comment.date)}</span>
                </section>
              </div>
            )
          })}
        </div>
        <div className="form_comment_container">
          <form onSubmit={onSubmitHandler}>
            <label htmlFor="content">
              <textarea name="content" id="content" cols="5" rows="10" placeholder="how do you feel about that?" onChange={changeHandler} value={commentData.content}></textarea>
            </label>
            <section className="comment_button">
              <button type="submit">POST</button>
            </section>
          </form>
        </div>
      </div>
    </>
  );
};

export default Comment;