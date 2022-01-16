const { Router } = require('express');
// Importar todos los routers;

const Sequelize = require('sequelize')

const axios = require('axios');

// Traigo tablas DB
//const { Country, Activity, country_activity} = require('../db.js');
const { Country, Activity} = require('../db.js');

const router = Router();

// const {LoadDb} = require('../loadDb/loadDb.js')

// Configurar los routers


// ******************************************* GET /countries: *****************************************************
    // Traer todos los paises desde la API a DB 
    // Almacenar solo datos requeridos para la ruta principal 
    // Obtener listado de los paises
const countriesApi = async (req, res) => {
   try{
    const countriesUrl = await axios.get('https://restcountries.com/v3/all');
    //console.log(countriesUrl)
    const countries = await countriesUrl.data.map(country => { // data postparse
        return{
        name: country.name.common,
        id: country.cca3,
        flags: country.flags[1] ? country.flags[1]: 'Image not found',
        continent: country.region,
        capital: country.capital ? country.capital[0] : "Capital not found",
        subregion: country.subregion ? country.subregion : "Subregion not found",
        area: country.area  ? parseInt(country.area) : 0,
        population: country.population ? country.population : 0,
        maps: country.maps['googleMaps'] ? country.maps['googleMaps']: 'Map not found'
        };
    });
    //console.log(countries)
    countries.forEach(async (country) => { // guarda BD
        await Country.findOrCreate({ // Cargar solo lo que no existe (mantengo index en false)
          where: {
            name: country.name,
            id: country.id,
            flags: country.flags,
            continent: country.continent,
            capital: country.capital,
            subregion: country.subregion,
            area: country.area,
            population: country.population,
            maps: country.maps
          },
        });
      });
      console.log('DB success')
      return countries; //Listado
    }catch (error) {
        res.send(error);
    }  
}

// ******************************************* GET /countries?name="...": *********************************************
// Obtener países que coincidan con el nombre pasado como query parameter (No tiene que ser case sensitive)
// Si no existe ningún país mostrar un mensaje

    router.get('/countries', async (req,res) => {
        const queryName = req.query.name// Guardo el name pasado por query
        //const queryOrder = req.query.order
        if(queryName){
            let countryName = await Country.findAll({
                where : {
                    name: { // Operador que busca coincidencias y no es case sensitive
                        [Sequelize.Op.iLike] : `%${queryName}%` // % antes y después de queryName (busca coincidencias) para búsqueda no sensitiva
                    }
                }
            })
            countryName.length ? // if(countryName.length > 0 then countryName --> else not found)
            res.status(200).send(countryName) :
            res.status(404).send('Country not found')
        } else {   
        const countries = await countriesApi(req, res) // Guardo en una constante lo que obtengo de la api 
        res.status(200).send(countries) 
    }
    })


// ******************************************* GET /countries/{idPais}: **********************************************
// Obtener el detalle de un país en particular
// Traer solo los datos pedidos en la ruta de detalle de país
// Incluir los datos de las actividades turísticas correspondientes
router.get('/countries/:id', async (req,res) => {
    const countryId = req.params.id //const {id} = req.params;
    let countryById = await Country.findByPk(countryId, {
        include : {
            model : Activity
        }
    })
    res.status(200).send(countryById)
})

router.get('/activity', async (req,res) => {
    try {
        let activities = await Activity.findAll()
        res.status(200).send(activities)
    } catch (errors) {
        res.status(500).send('Error')
    }
})

// ******************************************* POST /activity ********************************************************
// Recibe datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
// Crear actividad turística en la base de datos
router.post('/activity', async (req,res) => {
    try{
        let {
            name,
            difficulty,
            duration, 
            season, 
            countries,
            reference
        } = req.body
        // Se crea la actividad
        let newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season,
            countries,
            reference
        })
        // Se revisa el array de paises para ver en cual crear la actividad 
        req.body.countries.forEach(async (country) => {
            let activityCountry = await Country.findOne({ where: { id: country }}) // country llega por body
            await newActivity.addCountry(activityCountry)
        });
        res.status(200).send('The activity was successfully created')
    } catch(error) {
        console.log(error)
        res.status(500).send('The activity could not be created')
    }
})


module.exports = router;
