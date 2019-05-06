import { fetchData, getCategories } from "./apiCalls.js";

describe('Api Calls', () => {  
  const mockReject = jest.fn().mockImplementation(() => 
    Promise.resolve({ 
      ok: false,
     }));

  const mockResolve = (response) => jest.fn().mockImplementation(() => 
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(response)
    }));


  describe('Fetch Data', () => {
    const mockFilmResponse = { film: 'The Force Awakens' };
    const mockFilmUrl = 'https://swapi.co/api/films/1';

    it('Should fetch with the correct params', () => {
      window.fetch = mockResolve(mockFilmResponse);

      fetchData(mockFilmUrl);
      expect(window.fetch).toHaveBeenCalledWith(mockFilmUrl);
    });
  
    it('Should return parsed response if response "ok"', async () => {
      window.fetch = mockResolve(mockFilmResponse);
      const result = await fetchData(mockFilmUrl)

      expect(result).toEqual(mockFilmResponse);
    });
  
    it('Should return an error if request fails', async () => {
      window.fetch = mockReject;
      
      await expect(fetchData(mockFilmUrl)).rejects.toEqual(Error(`Error fetching data`));
    });
  });
});