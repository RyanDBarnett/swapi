import React from 'react';

const Crawl = ({film}) => {
  const {title, opening_crawl, release_date} = film;
  return (
    <div>
      <h2>{title}</h2>
      <h3>{opening_crawl}</h3>
      <p>{release_date}</p>
    </div>
  )
}

export default Crawl;