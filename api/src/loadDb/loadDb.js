const axios = require ('axios');
const { Country, } = require ('../db')

async function LoadDb(req, res) {
  try {
    {
      const AllCountApi = await axios.get('https://restcountries.com/v3/all');
      const ModelCountries = AllCountApi.data.map((e) => {
        return {
          name: e.name.common,
          id: e.cca3,
          flags: e.flags[1] ? e.flags[1]: 'Image not found',
          continent: e.region,
          capital:e.capital ? e.capital[0] : "Capital not found",
          subregion: e.subregion ? e.subregion : "Subregion not found",
          area: e.area  ? parseInt(e.area) : 0,
          population: e.population ? e.population : 0,
        };
      });
      ModelCountries.forEach(async (e) => {
        await Country.findOrCreate({ // Cargar solo lo que no existe (mantengo index en false)
          where: {
            name: e.name,
            id: e.id,
            flags: e.flags,
            continent: e.continent,
            capital: e.capital,
            subregion: e.subregion,
            area: e.area,
            population: e.population,
          },
        });
      });
    }
    console.log('DB success')
  } catch (error) {
    res.send(error);
  }
}
module.exports= {LoadDb}