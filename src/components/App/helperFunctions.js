import {fetchData} from '../../apiCalls/apiCalls'

export function createPeople(people) {
  return people.map((person, index) => {
    return createPerson(person, index);
  });
}

export function createPlanets(planets) {
  return planets.map((planet, index) => {
    return createPlanet(planet, index)
  });
}

export function createVehicles(vehicles) {
  return vehicles.map((vehicle, index) => {
    return createVehicle(vehicle, index)
  });
}

export function getLocalStorage() {
  return JSON.parse(localStorage.getItem('state'));
}

export function setLocalStorage(state) {
  state = JSON.stringify(state);
  localStorage.setItem('state', state);
}

function createPlanet(planet, index) {
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

function createPerson(person, index) {
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

function createVehicle(vehicle, index) {
  const {name, model, vehicle_class, passengers} = vehicle;
  return {
    Name: name,
    id: Date.now() + 6000 + index,
    Model: model,
    Class: vehicle_class,
    "Passenger Capacity": passengers 
  }
}