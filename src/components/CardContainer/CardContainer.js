import React from 'react';
import Card from '../Card/Card';
import './_CardContainer.scss';
import PropTypes from 'prop-types';

const uuidv4 = require("uuid/v4");

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
      key={uuidv4()} />
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

CardContainer.propTypes = {
  addFavorite: PropTypes.func,
  removeFavorite: PropTypes.func,
  items: PropTypes.array,
  favorites: PropTypes.array,
  currentDisplay: PropTypes.string
}

export default CardContainer;