import React from 'react';
import Buttons from '../Buttons/Buttons';
import './_Header.scss'
import PropTypes from 'prop-types';

const Header = ({totalFavorites, changeCategory}) => {
  return (
    <header className='Header'>
      <h1><img src="https://fontmeme.com/permalink/190506/2f9decc54ab5c68a61423e6ffce47f73.png" alt="star-wars-api-font" /></h1>
      <Buttons 
        totalFavorites={totalFavorites} 
        changeCategory={changeCategory} 
      />
    </header>
  )
}

Header.propTypes = {
  totalFavorites: PropTypes.number,
  changeCategory: PropTypes.func
}

export default Header;