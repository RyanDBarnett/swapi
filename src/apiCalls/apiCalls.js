export const getHomeworld = (url) => {
  return fetch(url).then(response => {
    if(!response.ok) {
      throw Error('Oh fork');
    } else {
      return response.json();
    }
  })
}

export const getSpecies = (url) => {
  return fetch(url).then(response => {
    if(!response.ok) {
      throw Error('Oh fudge');
    } else {
      return response.json();
    }
  })
}

export const getCategories = () => {
  const categoryUrls = [
    'https://swapi.co/api/people',
    'https://swapi.co/api/planets',
    'https://swapi.co/api/vehicles'
  ];
  const unresolvedPromises = categoryUrls.map(url => {
    return fetch(url)
    .then(response => {
      if(!response.ok) {
        throw Error('bummer');
      } else {
        return response.json();
      }
    });
  });
  return Promise.all(unresolvedPromises);
}

export const getFilms = () => {
  const url = 'https://swapi.co/api/films';
  return fetch(url)
  .then(response => response.json())
  .then(data => {
    const films = data.results.map(film => {
      const {title, opening_crawl, release_date} = film;
      const newFilm = {title, opening_crawl, release_date};
      return newFilm;
    });
    return films;
  })
  .catch(error => {
    console.log('Argh', error);
  })
}