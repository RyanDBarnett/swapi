import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import Buttons from '../Buttons/Buttons';
import { getSpecies, getHomeworld, getCategories, getFilms } from '../../apiCalls/apiCalls.js';

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      loaded: false,
      films: [],
      people: [],
      planets: [],
      error: ''
    };
  }

  componentDidMount = () => {
    getFilms()
    .then(films => this.setState({ films, loaded: true }))
    .catch(error => this.setState({ error: error, loaded: true }))
    
    let result = getCategories().then(promises => { 
      let people = promises[0].results;
      let planets = promises[1].results;
      let vehicles = promises[2].results;
      
      people = people.map(person => {
        return this.createNewPerson(person)
      })

      planets = planets.map(planet => {
        return this.createNewPlanet(planet)
      })
      
      this.setState({ people, planets })
    });
  }

  createNewPlanet(planet) {
    let {climate, name, terrain, population, residents} = planet;
    residents = residents.length
    return {climate, name, terrain, population, residents};
  }

  createNewPerson(person) {
    const {homeworld, name, species} = person;
    const newPerson = {name};
    const pendingPromises = [getHomeworld(homeworld), getSpecies(species)];
    Promise.all(pendingPromises).then(results => {
      newPerson.homeworld = results[0].name;
      newPerson.homeworldPopulation = results[0].population;
      newPerson.species = results[1].name;
    });
    return newPerson;
  }

  render = () => {
    const {loaded, films, error} = this.state;
    let startingDisplay = 'Loading...';
    if(loaded) {
      const randomFilm = films[Math.floor(Math.random() * films.length)];
      const {title, opening_crawl, release_date} = randomFilm;
      startingDisplay = !error ?
        <div>
          <h2>{title}</h2>
          <h3>{opening_crawl}</h3>
          <p>{release_date}</p>
        </div>
        : <h3>{error}</h3>;
    }

    return (
      <div className="App">
        <Header />
        <Buttons />
        {startingDisplay}
      </div>
    );
  }
}

export default App;
