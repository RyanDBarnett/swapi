import React from 'react';
import Buttons from '../Buttons/Buttons';
import './_Header.scss'

const Header = ({totalFavorites, changeCategory}) => {
  return (
    <header className='Header'>
      <h1>SWAPI-Box</h1>
      <Buttons 
        totalFavorites={totalFavorites} 
        changeCategory={changeCategory} 
      />
    </header>
  )
}

export default Header;