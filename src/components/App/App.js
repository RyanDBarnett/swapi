import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import Buttons from '../Buttons/Buttons';

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      loaded: false,
      films: [],
      error: ''
    };
  }

  componentDidMount = () => {
    const url = 'https://swapi.co/api/films';
    fetch(url)
      .then(response => response.json())
      .then(data => data.results)
      .then(films => this.setState({ films, loaded: true }))
      .catch(error => this.setState({ error: error, loaded: true }))

    const categoryUrls = ['https://swapi.co/api/people']
    const unresolvedPromises = categoryUrls.map(url => {
      return fetch(url).then(response => response.json());
    });
    const promise = Promise.all(unresolvedPromises);
    let result = promise.then(data => { 
      data[0].results.map(person => {
        const {homeworld, name, species} = person;
        const newPerson = {name}

        fetch(homeworld)
        .then(response => response.json())
        .then(planet => {
          newPerson.homeworld = planet.name;
          newPerson.homeworldPopulation = planet.population;
        });

        console.log(newPerson)
      });
    });
  }

  render = () => {
    const {loaded, films, error} = this.state;
    const startingDisplay = loaded && !error ?
      <div>
        <h2>{films[0].title}</h2>
        <h3>{films[0].opening_crawl}</h3>
        <p>{films[0].release_date}</p>
      </div>
      : <h3>{error}</h3>;

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
