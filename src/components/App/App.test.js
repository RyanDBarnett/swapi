import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow, mount} from 'enzyme';
import {mockPerson, mockEvent} from '../../mockData.js';

describe('App', () => {
  let wrapper;

  beforeEach( () => {
    wrapper = shallow(<App />);
    wrapper.setState({
      people: [],
      favorites: [],
      vehicles: [],
      planets: []
    })
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should change current display when changeCategory is called', () => {
    expect(wrapper.state().currentDisplay).toEqual('crawl');
    wrapper.instance().changeCategory(mockEvent);
    expect(wrapper.state().currentDisplay).toEqual('planets');
  });

  it('should add a card info to favorites if addFavorite is called', () => {
    wrapper.setState({people: [mockPerson]});
    expect(wrapper.state().people.length).toEqual(1);
    expect(wrapper.state().favorites.length).toEqual(0);
    wrapper.instance().addFavorite(1557118669139);
    expect(wrapper.state().favorites.length).toEqual(1);
  });

  it('should prevent card info from being added to favorites if that card is already in favorites', () => {
    wrapper.setState({people: [mockPerson]});
    expect(wrapper.state().favorites.length).toEqual(0);
    wrapper.instance().addFavorite(1557118669139);
    expect(wrapper.state().favorites.length).toEqual(1);
    wrapper.instance().addFavorite(1557118669139);
    expect(wrapper.state().favorites.length).toEqual(1);
  });

  it('should remove a card info from favorites if removeFavorite is called', () => {
    wrapper.setState({favorites: [mockPerson]});
    expect(wrapper.state().favorites.length).toEqual(1);
    wrapper.instance().removeFavorite(1557118669139);
    expect(wrapper.state().favorites.length).toEqual(0);
  });

})

