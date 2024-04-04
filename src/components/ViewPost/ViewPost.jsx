import "./ViewPost.css";

function ViewPost ({post}) {
  return (
    <>
        <div className="single_post_container" id={post._id}>
          <section className="hashtag_container">
            {post.tags.map((tag, index) => {
              return (<p key={index}>{tag}</p>)
            })}
          </section>
          <p>{post.content}</p>
        </div>
  </>
  )
};

export default ViewPost;