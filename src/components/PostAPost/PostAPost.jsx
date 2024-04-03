import "./PostAPost.css";

function PostAPost() {

  return (
    <div className="post_container">
      <div className="form_container">
        <form action="submit">
          <label htmlFor="post">
            <textarea name="post" id="post" cols="5" rows="10" placeholder="what's on your mind?"></textarea>
            </label>
            <section className="tags_and_button_container">
              <label htmlFor="tags">
                <input type="text" id="tags" placeholder="enter hashtags"/>
              </label>
              <section className="button_and_count">
                <button>POST</button>
              </section>
            </section>
        </form>
      </div>
    </div>
  );
};


export default PostAPost;