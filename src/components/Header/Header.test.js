import React from 'react';
import Header from './Header.js';
import {shallow} from 'enzyme';

describe('Crawl', () => {
  let wrapper;
  const mockChangeCategory = jest.fn();

  beforeEach( () => {
    wrapper = shallow(
      <Header
        totalFavorites={0}
        changeCategory={mockChangeCategory}
      />
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});