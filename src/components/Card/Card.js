import React, { Component } from 'react';
import './_Card.scss';

class Card extends Component {
  constructor() {
    super();
    this.state = {
      favorited: false
    }
  }

  componentDidMount() {
    const {favorited} = this.props
    this.setState({favorited})
  }

  handleClick = (e) => {
    const {addFavorite, removeFavorite, id} = this.props;
    const favorited = !this.state.favorited;
    favorited ? addFavorite(id) : removeFavorite(id);
    this.setState({ favorited });
  }

  render() {
    const favorited = this.state.favorited ? "favorited" : ""
    const cardData = Object.keys(this.props).map((key, index) => {
      const ifKeyAllowed = 
        key !== 'id' && 
        key !== 'addFavorite' &&
        key !== 'removeFavorite' &&
        key !== 'favorited';
      return ifKeyAllowed && <p key={index}>{key}<br/> {this.props[key]}</p>;
    });
    
    return (
      <article className={"Card " + favorited}>
        {cardData}
        <button onClick={this.handleClick}>Favorite</button>  
      </article>
    )
  }
}

export default Card;