import React, { Component } from 'react';
import './App.css';
import Buttons from '../Buttons/Buttons';
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

  componentDidMount = () => {
    const randomFilmNum = Math.floor(Math.random() * 1 + 1);
    fetchData(`https://swapi.co/api/films/${randomFilmNum}`)
    .then(film => this.setState({ film, loaded: true }))
    .catch(error => this.setState({ error }))
    
    getCategories()
    .then(categories => { 
      // let people = categories[0].results;
      // let planets = categories[1].results;
      // let vehicles = categories[2].results;
      // categories = {
      //   people: categories[0].results,
      //   planets: categories[1].results,
      //   vehicles: categories[2].results
      // }
      console.log(categories)
      categories.forEach((cat, index) => {
        const unresolvedPromises = cat.map(element => {
          if (index === 0) {
            return this.createPerson(element);
          } else if (index === 1) {
            return this.createPlanet(element);
          } else {
            return this.createVehicle(element);
          }
        });
        Promise.all(unresolvedPromises)
        .then(result => {
          let key = index === 0 ? 'people' : index === 1 ? 'planets' : 'vehicles' 
          this.setState({[key]: result})
        })
      })
      
      // people = people.map(person => {
      //   return this.createPerson(person);
      // })

      // planets = planets.map(planet => {
      //   return this.createPlanet(planet)
      // })

      // vehicles = vehicles.map(vehicle => {
      //   return this.createVehicle(vehicle);
      // })
      
      // Promise.all(people).then(people => {
      //   this.setState({ people, planets, vehicles })
      // })
    })
  }

  createPlanet(planet) {
    let {climate, name, terrain, population, residents} = planet;
    residents = residents.length;
    return {
      Name: name,
      id: Date.now() + 2000,
      Climate: climate,
      Terrain: terrain,
      Population: population,
      Residents: residents
    };
  }

  createPerson(person) {
    const {homeworld, name, species} = person;
    const newPerson = {
      Name: name,
      id: Date.now() + 4000
    };
    const pendingPromises = [fetchData(homeworld), fetchData(species)];
    return Promise.all(pendingPromises).then(results => {
      newPerson.Species = results[1].name;
      newPerson.Homeworld = results[0].name;
      newPerson.HomeworldPopulation = results[0].population;
      return newPerson;
    })
  }

  createVehicle(vehicle) {
    const {name, model, vehicle_class, passengers} = vehicle;
    return {
      Name: name,
      id: Date.now() + 6000,
      Model: model,
      Class: vehicle_class,
      "Passenger Capacity": passengers 
    }
  }

  changeCategory = (e) => {
    this.setState({currentDisplay: e.target.name});
  }

  addFavorite = (id) => {
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
        />
      }
    }

    return (
      <div className="App">
        <Header />
        <Buttons 
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
