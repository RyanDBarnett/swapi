import React from 'react';
import Card from '../Card/Card';
import './_CardContainer.scss';

const CardContainer = ({items, favorites, addFavorite, removeFavorite}) => {
  const cards = items.map((item, index) => {
    const favorited = !!favorites.find(fav => {
      return fav.id === item.id 
    })
    return <Card 
      {...item}
      favorited={favorited} 
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