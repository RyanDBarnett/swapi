import React from 'react';
import Crawl from './Crawl.js';
import {shallow} from 'enzyme';
import {mockFilm} from '../../mockData.js';

describe('Crawl', () => {
  let wrapper;

  beforeEach( () => {
    wrapper = shallow(
      <Crawl 
        film={mockFilm}
      />
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});