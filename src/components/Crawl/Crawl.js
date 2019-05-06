import React from 'react';
import './_Crawl.scss';

const Crawl = ({film}) => {
  const {title, opening_crawl, release_date} = film;
  return (
    <div className="Crawl">
      <h2>{title}</h2>
      <h3>{opening_crawl}</h3>
      <h3>Film Released: {release_date}</h3>
    </div>
  )
}

export default Crawl;