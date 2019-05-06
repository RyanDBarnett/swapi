import React from 'react';
import Card from '../Card/Card';
import './_CardContainer.scss';

const CardContainer = ({items, favorites, addFavorite, removeFavorite, currentDisplay}) => {
  let cards = items.map((item, index) => {
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

  if(currentDisplay === 'favorites' && favorites.length === 0) {
    cards = <h2>No Favorites To Display</h2>
  }

  return (
    <div>
      <h2 className="currentDisplay">{currentDisplay}</h2>
      <div className="CardContainer">
        {cards}
      </div>
    </div>
  )
}

export default CardContainer;