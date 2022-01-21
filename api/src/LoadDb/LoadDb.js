const axios = require ('axios');
const { Country, } = require ('../db')
//const { API_ALL } = process.env;

// ******************************************* GET /countries: *****************************************************
// Traer todos los paises desde la API a DB 
// Almacenar solo datos requeridos para la ruta principal 
// Obtener listado de los paises
async function LoadDb (req, res) {
    try{
    {
        const countriesUrl = await axios.get('https://restcountries.com/v3/all');
        //console.log(countriesUrl)
        const modelCountries = await countriesUrl.data.map(country => { // data postparse
            return{
            name: country.name.common,
            id: country.cca3,
            flag: country.flags[1] ? country.flags[1]: 'Image not found',
            continent: country.region,
            capital: country.capital ? country.capital[0] : "Capital not found",
            subregion: country.subregion ? country.subregion : "Subregion not found",
            area: country.area  ? parseInt(country.area) : 0,
            population: country.population ? country.population : 0,
            // maps: country.maps['googleMaps'] ? country.maps['googleMaps']: 'Map not found'
            };
        }); 
        //console.log(countries)
        modelCountries.forEach(async (country) => { // guarda BD
            await Country.findOrCreate({ // Cargar solo lo que no existe (mantengo index en false)
            where: {
                name: country.name,
                id: country.id,
                flag: country.flag,
                continent: country.continent,
                capital: country.capital,
                subregion: country.subregion,
                area: country.area,
                population: country.population,
                // maps: country.maps
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