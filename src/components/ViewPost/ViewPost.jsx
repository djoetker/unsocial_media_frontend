
import "./ViewPost.css";
import { useState } from 'react';
import Comment from '../Comment/Comment';
import calculateTimeDifference from '../../utilities/calculateTimeDifference.js';
import { getLinksFromText } from "../../utilities/getLinksFromText.jsx";

function ViewPost ({post}) {

  const [showCommentComponent, setShowCommentComponent] = useState(false);
  const [postId, setPostId] = useState("");
  const [getComments, setGetComments] = useState(false);
  

  const toggleCommentSection = (evt) => {
    setShowCommentComponent(!showCommentComponent);
    if (showCommentComponent) setGetComments(!getComments);
    setPostId(evt.target.parentNode.parentNode.id);
  };

  

  return (
    <>
        <div className="single_post_container" id={post._id}>
          <section className="hashtag_container">
            {post.tags.map((tag, index) => {
              return (<p key={index}>{tag}</p>)
            })}
          </section>
          <section className="post_content_container">
            <p>{getLinksFromText(post.content)}</p>
          </section>
          <section className="post_info_container" id='idididid'>
            <button onClick={toggleCommentSection}>{post.comments.length} comments</button>
            <span>posted {calculateTimeDifference(post.date)}</span>
          </section>


        </div>
        {showCommentComponent && <Comment postId={postId} getComments={getComments} setGetComments={setGetComments}/>}  

  </>
  )
};

export default ViewPost;