import React, { Component } from 'react';
import './_App.scss';
import CardContainer from '../CardContainer/CardContainer';
import Crawl from '../Crawl/Crawl';
import Header from '../Header/Header';
import { fetchData, getCategories } from '../../apiCalls/apiCalls.js';
import { 
  createPeople,
  createPlanets,
  createVehicles,
  getLocalStorage,
  setLocalStorage
} from './helperFunctions.js';

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      loaded: false,
      currentDisplay: 'crawl',
      film: {},
      people: [],
      planets: [],
      vehicles: [],
      favorites: [],
      error: ''
    };
  }

  componentDidUpdate = () => {
    setLocalStorage(this.state)
  }

  componentDidMount = () => {
    if(localStorage.getItem('state')) {
      return this.setState({...getLocalStorage()});
    }
    const randomFilmNum = Math.floor(Math.random() * 1 + 1);
    fetchData(`https://swapi.co/api/films/${randomFilmNum}`)
    .then(film => this.setState({ film, loaded: true }))
    .catch(error => this.setState({ error: error.message }))
    
    getCategories()
    .then(categories => { 
      let people = categories[0].results;
      let planets = categories[1].results;
      let vehicles = categories[2].results;
      
      people = createPeople(people);
      planets = createPlanets(planets);
      vehicles = createVehicles(vehicles);
      
      Promise.all(people).then(people => {
        this.setState({ people, planets, vehicles })
        setLocalStorage(this.state)
      })
    })
  }

  changeCategory = (e) => {
    this.setState({currentDisplay: e.target.name});
  }

  addFavorite = (id) => {
    if(this.state.favorites.find(fav => fav.id === id)) {
      return;
    }
    const {people, planets, vehicles} = this.state;
    const allData = [...people, ...planets, ...vehicles];
    const newFavorite = allData.find(element => {
      return element.id === id;
    })
    const favorites = [...this.state.favorites, newFavorite];
    this.setState({ favorites });
  }

  removeFavorite = (id) => {
    const favorites = this.state.favorites.filter(favorite => {
      return favorite.id !== id;
    }) 
    this.setState({ favorites });
  }

  render = () => {
    const {loaded, currentDisplay, film, error} = this.state;
    let mainContent = 'Loading...';
    if (loaded) {
      if (currentDisplay === 'crawl') {
        mainContent = <Crawl film={film} />;
      } else {
        mainContent = <CardContainer 
          addFavorite={this.addFavorite}
          removeFavorite={this.removeFavorite} 
          items={this.state[currentDisplay]}
          favorites={this.state.favorites}
          currentDisplay={currentDisplay}
        />;
      }
    }
    if (error) {
      mainContent = <h1>{error}</h1>;
    }

    return (
      <div className="App">
        <Header 
          totalFavorites={this.state.favorites.length}
          changeCategory={this.changeCategory}
        />
        {mainContent}
      </div>
    );
  }
}

export default App;
