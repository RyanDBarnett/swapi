import React from 'react';
import Buttons from '../Buttons/Buttons';
import './_Header.scss'

const Header = ({totalFavorites, changeCategory}) => {
  return (
    <header className='Header'>
      <h1><img src="https://fontmeme.com/permalink/190506/ede3df12a6b3e957bc250b714e168954.png" alt="star-wars-font" /></h1>
      <Buttons 
        totalFavorites={totalFavorites} 
        changeCategory={changeCategory} 
      />
    </header>
  )
}

export default Header;