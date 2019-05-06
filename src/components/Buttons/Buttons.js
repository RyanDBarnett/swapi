import React from 'react';
import './_Buttons.scss';
import PropTypes from 'prop-types';

const Buttons = ({changeCategory, totalFavorites}) => {
  return (
    <section className="Buttons">
      <button name="people" onClick={(e) => changeCategory(e)}>People</button>
      <button name="planets" onClick={(e) => changeCategory(e)}>Planets</button>
      <button name="vehicles" onClick={(e) => changeCategory(e)}>Vehicles</button>
      <button name="favorites" onClick={(e) => changeCategory(e)}>View Favorites {totalFavorites}</button>
    </section>
  )
}

Buttons.propTypes = {
  changeCategory: PropTypes.func,
  totalFavorites: PropTypes.number
}

export default Buttons;