import React, { Component } from 'react';
import './_Card.scss';
import PropTypes from 'prop-types';

const uuid = require("uuid");

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
    const favorited = this.state.favorited ? 'favorited' : '';
    const favBtnText = this.state.favorited ? 'Unfavorite' : 'Favorite';
    let index = 1;
    const cardData = Object.keys(this.props).map((key) => {
      index += 1;
      const ifKeyAllowed = 
        key !== 'id' && 
        key !== 'addFavorite' &&
        key !== 'removeFavorite' &&
        key !== 'favorited';
      return ifKeyAllowed && <div><h4 key={uuid()}>{key}</h4><p> {this.props[key]}</p></div>;
    });
    
    return (
      <article className={"Card " + favorited}>
        {cardData}
        <button onClick={this.handleClick}>{favBtnText}</button>  
      </article>
    )
  }
}

Card.propTypes = {
  favorited: PropTypes.bool
}

export default Card;