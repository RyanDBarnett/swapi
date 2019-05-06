import React from 'react';
import Buttons from './Buttons.js';
import {shallow} from 'enzyme';

const mockTotalFavorites = 0;
const mockChangeCategory = jest.fn();

describe('Buttons', () => {
  let wrapper;

  beforeEach( () => {
    wrapper = shallow(
      <Buttons 
        totalFavorites={mockTotalFavorites} 
        changeCategory={mockChangeCategory}
      />
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should invoke changeCategory when a button is clicked', () => {
    wrapper.find('button').first().simulate('click');
    expect(mockChangeCategory).toBeCalled();
  });
});