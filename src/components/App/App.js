import React, { Component } from 'react';
import './App.css';
import CardContainer from '../CardContainer/CardContainer';
import Crawl from '../Crawl/Crawl';
import Header from '../Header/Header';
import { fetchData, getCategories } from '../../apiCalls/apiCalls.js';

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
    this.setLocalStorage()
  }

  componentDidMount = () => {
    if(localStorage.getItem('state')) {
      const state = this.getLocalStorage();
      this.setState({...state});
      return;
    }
    const randomFilmNum = Math.floor(Math.random() * 1 + 1);
    fetchData(`https://swapi.co/api/films/${randomFilmNum}`)
    .then(film => this.setState({ film, loaded: true }))
    .catch(error => this.setState({ error }))
    
    getCategories()
    .then(categories => { 
      let people = categories[0].results;
      let planets = categories[1].results;
      let vehicles = categories[2].results;
      
      people = people.map((person, index) => {
        return this.createPerson(person, index);
      })

      planets = planets.map((planet, index) => {
        return this.createPlanet(planet, index)
      })

      vehicles = vehicles.map((vehicle, index) => {
        return this.createVehicle(vehicle, index);
      })
      
      Promise.all(people).then(people => {
        this.setState({ people, planets, vehicles })
        this.setLocalStorage()
      })
    })
  }

  createPlanet(planet, index) {
    let {climate, name, terrain, population, residents} = planet;
    residents = residents.length;
    return {
      Name: name,
      id: Date.now() + 2000 + index,
      Climate: climate,
      Terrain: terrain,
      Population: population,
      Residents: residents
    };
  }

  createPerson(person, index) {
    const {homeworld, name, species} = person;
    const newPerson = {
      Name: name,
      id: Date.now() + 4000 + index
    };
    const pendingPromises = [fetchData(homeworld), fetchData(species)];
    return Promise.all(pendingPromises).then(results => {
      newPerson.Species = results[1].name;
      newPerson.Homeworld = results[0].name;
      newPerson.HomeworldPopulation = results[0].population;
      return newPerson;
    })
  }

  createVehicle(vehicle, index) {
    const {name, model, vehicle_class, passengers} = vehicle;
    return {
      Name: name,
      id: Date.now() + 6000 + index,
      Model: model,
      Class: vehicle_class,
      "Passenger Capacity": passengers 
    }
  }

  getLocalStorage() {
    return JSON.parse(localStorage.getItem('state'));
  }

  setLocalStorage() {
    const state = JSON.stringify(this.state);
    localStorage.setItem('state', state);
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
        mainContent = <Crawl film={film} />
      } else {
        mainContent = <CardContainer 
          addFavorite={this.addFavorite}
          removeFavorite={this.removeFavorite} 
          items={this.state[currentDisplay]}
          favorites={this.state.favorites} 
        />
      }
    }

    return (
      <div className="App">
        <Header 
          totalFavorites={this.state.favorites.length}
          changeCategory={this.changeCategory}
        />
        {mainContent}
        <h1>{error}</h1>
      </div>
    );
  }
}

export default App;
