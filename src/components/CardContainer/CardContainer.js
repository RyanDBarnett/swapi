import React from 'react';
import Card from '../Card/Card';
import './_CardContainer.scss';

const CardContainer = ({items, addFavorite, removeFavorite}) => {
  const cards = items.map((item, index) => {
    return <Card 
      {...item} 
      addFavorite={addFavorite}
      removeFavorite={removeFavorite} 
      key={item.id + index} />
  });

  return (
    <div className="CardContainer">
      {cards}
    </div>
  )
}

export default CardContainer;