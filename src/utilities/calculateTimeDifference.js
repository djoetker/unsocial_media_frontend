function calculateTimeDifference(postDate) {
  const currentDate = new Date();
  const postTime = new Date(postDate);
  
  const timeDifference = currentDate - postTime;

  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24);

  if (daysDifference > 0) {
    return `${daysDifference} day(s) ago`;
  } else if (hoursDifference > 0) {
    return `${hoursDifference} hours ago`;
  } else if (minutesDifference > 0) {
    return `${minutesDifference} minutes ago`;
  } else {
    return `just now`;
  }
};

export default calculateTimeDifference;

