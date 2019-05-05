import React from 'react';
import Card from './Card.js';
import { shallow } from 'enzyme';

const mockPerson = {
  name: 'Luke Skywalker',
  species: 'Human',
  homeworld: 'Tatooine',
  population: '200000'
}
const mockPlanet = {

}
const mockVehicle = {

}

const mockAddFavorite = jest.fn()
const mockRemoveFavorite = jest.fn()

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