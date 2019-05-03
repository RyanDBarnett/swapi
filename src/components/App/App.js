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
      error: ''
    };
  }

  componentDidMount = () => {
    getFilms()
    .then(films => this.setState({ films, loaded: true }))
    .catch(error => this.setState({ error: error, loaded: true }))
    let result = getCategories().then(promises => { 
      return promises[0].results.map(person => {
        const {homeworld, name, species} = person;
        const newPerson = {name}

        getHomeworld(homeworld)
        .then(planet => {
          newPerson.homeworld = planet.name;
          newPerson.homeworldPopulation = planet.population;
        });

        getSpecies(species)
        .then(species => {
          newPerson.species = species.name
        });
        return newPerson;
      });
    });
    result.then(people => this.setState({ people }));
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
