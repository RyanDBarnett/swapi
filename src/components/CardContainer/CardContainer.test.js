import React from 'react';
import CardContainer from './CardContainer.js';
import {shallow} from 'enzyme';
import {mockFavorites, mockPeople} from '../../mockData.js';

describe('Crawl', () => {
  let wrapper;

  beforeEach( () => {
    wrapper = shallow(
      <CardContainer
        addFavorite={jest.fn()}
        removeFavorite={jest.fn()} 
        items={mockPeople}
        favorites={mockFavorites}
        currentDisplay={'people'}
      />
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});