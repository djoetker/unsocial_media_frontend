import DOMPurify from 'dompurify';

import "./ViewPost.css";

function ViewPost ({post}) {
  
  function calculateTimeDifference(postDate) {
    const currentDate = new Date();
    const postTime = new Date(postDate);
    
    const timeDifference = currentDate - postTime;
  
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
  
    if (daysDifference > 0) {
      return `${daysDifference} days ago`;
    } else if (hoursDifference > 0) {
      return `${hoursDifference} hours ago`;
    } else if (minutesDifference > 0) {
      return `${minutesDifference} minutes ago`;
    } else {
      return `just now`;
    }
  };

  const sanitizeContent = (content) => {
    return DOMPurify.sanitize(content);
  };

  const getLinksFromText = (content) => {
    const sanitizedContent = sanitizeContent(content);

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = sanitizedContent.split(urlRegex);
    console.log(parts);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        );
      } else {
        return part;
      }
    });
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
          <section className="post_info_container">
            <p>{post.comments.length} comments</p>
            <span>posted {calculateTimeDifference(post.date)}</span>
          </section>
        </div>
  </>
  )
};

export default ViewPost;