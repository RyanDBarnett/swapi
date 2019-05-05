import React, { Component } from 'react';
import './_Card.scss';

class Card extends Component {
  render(props) {
    const cardData = Object.keys(this.props).map((key, index) => {
      const ifKeyAllowed = key !== 'id' && key !== 'addFavorite' && key !== 'removeFavorite';
      return ifKeyAllowed && <p key={index}>{key}<br/> {this.props[key]}</p>;
    });

    return (
      <article className="Card">
        {cardData}
        <button onClick={() => this.props.addFavorite(this.props.id)}>Favorite</button>  
      </article>
    )
  }
}

export default Card;