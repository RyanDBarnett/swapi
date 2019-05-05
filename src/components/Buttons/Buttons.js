import React from 'react';
import './_Buttons.scss';

const Buttons = ({changeCategory, totalFavorites}) => {
  return (
    <section className="Buttons">
      <div className="categories">
        <button name="people" onClick={(e) => changeCategory(e)}>People</button>
        <button name="planets" onClick={(e) => changeCategory(e)}>Planets</button>
        <button name="vehicles" onClick={(e) => changeCategory(e)}>Vehicles</button>
      </div>
      <button name="favorites" onClick={(e) => changeCategory(e)}>View Favorites {totalFavorites}</button>
    </section>
  )
}

export default Buttons;