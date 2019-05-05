export const fetchData = (url) => {
  return fetch(url).then(response => {
    if(!response.ok) {
      throw Error(`Error fetching data from ${response.url}`);
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
    return fetchData(url)
  });
  return Promise.all(unresolvedPromises);
}