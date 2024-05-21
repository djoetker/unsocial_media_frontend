import DOMPurify from 'dompurify';

const sanitizeContent = (content) => {
  return DOMPurify.sanitize(content);
};

const getLinksFromText = (content) => {
  const sanitizedContent = sanitizeContent(content);

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  // const parts = sanitizedContent.split(urlRegex);

  // return parts.map((part, index) => {
  //   if (part.match(urlRegex)) {
  //     return (
  //       // <a key={index} href={part} target="_blank" rel="noopener noreferrer">
  //       //   {part}
  //       // </a>
  //     );
  //   } else {
  //     return part;
  //   }
  // });

  const replace = sanitizedContent.replace(urlRegex, (url) => {
    return `<a href="${url}">${url}</a>`;
  });

  return replace;
};

export { getLinksFromText };