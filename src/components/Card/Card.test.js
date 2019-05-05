import React from 'react';
import Card from './Card.js';
import { shallow } from 'enzyme';

const mockAddFavorite = jest.fn()
const mockRemoveFavorite = jest.fn()
const mockPerson = {
  name: 'Luke',
  species: 'Human',
  homeworld: 'Tattoo',
  population: '200'
}

describe('Card', () => {
  let wrapper = shallow(
    <Card 
      {...mockPerson}
      addFavorite={mockAddFavorite}
      removeFavorite={mockRemoveFavorite}
      key={0}
    />
  );
  it('Should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
})