import React from 'react';
import Buttons from '../Buttons/Buttons';

const Header = ({totalFavorites, changeCategory}) => {
  return (
    <header>
      <h1>SWAPI-Box</h1>
      <Buttons 
        totalFavorites={totalFavorites} 
        changeCategory={changeCategory} 
      />
    </header>
  )
}

export default Header;