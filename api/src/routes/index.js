const { Router } = require('express');
// Importar todos los routers;

const Sequelize = require('sequelize')

const axios = require('axios');

// Traigo tablas DB
const { Country, Activity, country_activity} = require('../db.js');

const router = Router();

const {LoadDb} = require('../loadDb/loadDb.js')

// Configurar los routers

// ******************************************* Get API info **********************************************************
/* const countriesApi = async () => {
    const countriesUrl = await axios.get('https://restcountries.com/v3/all');
    const countries = await countriesUrl.data.map(country => {
        return{
            name: country.name.common,
            id: country.cca3,
            flags: country.flags[0],
            continent: country.region[0],
            capital: country.capital != null ? country.capital : 'No capital found',
            subregion: country.subregion,
            area: country.area,
            population: country.population,
            maps: country.googleMaps,
        };
    });
    return countries;
};
 */

// ******************************************* GET /countries: *****************************************************
    // Traer todos los paises desde la API a DB 
    // Almacenar solo datos requeridos para la ruta principal 
    // Obtener listado de los paises
/*     router.get('/countries', async (req,res) => {
    const countries = await countriesApi() // Guardo en una constante lo que obtengo de la api 
    const queryName = req.query.name// Guardo el name pasado por query
    const queryOrder = req.query.order
    try{
        // Si la db esta llena no se hace nada
        let full = await Country.findAll({
            include: {
                model: Activity,
            }
        })
        if(!full.length){ // Si no hay datos, se crean
            // bulkCreate busca los campos en el objeto y los pasa a la tabla
            // los datos del objeto para los que no hay campos en la tabla, no los guarda
            await Country.bulkCreate(countries)
        } 
    } catch (error){
        console.log(error) 
    }
// ******************************************* GET /countries?name="...": *********************************************
// Obtener países que coincidan con el nombre pasado como query parameter (No tiene que ser case sensitive)
// Si no existe ningún país mostrar un mensaje

    if(queryName){
        let countryName = await Country.findAll({
            where : {
                name: {
                    // Operador que busca coincidencias y no es case sensitive
                    [Sequelize.Op.iLike] : `%${queryName}%` // % antes y después de queryName (busca coincidencias) para búsqueda no sensitiva
                }
            }
        })
        countryName.length ?
        res.status(200).send(countryName) :
        res.status(404).send('Country not found')
    } else if(queryOrder){
        try {
        let country = await Country.findAll({
            order : [['population', queryOrder]],
            include: {
                model: Activity,
            }
        })
        res.status(200).send(country)
        } catch (error) {
        res.status(500).send('Error')
        }
    } else {
        let full = await Country.findAll({
            include: {
                model: Activity
            }
        })
        res.status(200).send(full)
    }

}) */

// ******************************************* GET /countries/{idPais}: **********************************************
// Obtener el detalle de un país en particular
// Traer solo los datos pedidos en la ruta de detalle de país
// Incluir los datos de las actividades turísticas correspondientes
router.get('/loadDb/:id', async (req,res) => {
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
            countries
        } = req.body
        // Se crea la actividad
        let newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season,
            countries
        })

        // Se revisa el array de paises para ver en cual crear la actividad 
        countries.forEach(async (country) => {
            let activityCountry = await Country.findOne({ where: { name: country }}) // country llega por body
            await newActivity.addCountry(activityCountry)
        });
        res.status(200).send('The activity was successfully created')
    } catch(error) {
        console.log(error)
        res.status(500).send('The activity could not be created')
    }
})

module.exports = router;
