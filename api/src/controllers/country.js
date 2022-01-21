const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

// Traigo tablas DB
const { Country, Activity } = require("../db");

// ******************************************* GET /countries?name="...": *********************************************
// Obtener países que coincidan con el nombre pasado como query parameter (No tiene que ser case sensitive)
// Si no existe ningún país mostrar un mensaje

async function getAllCountries(req, res) {
  const { name } = req.query; //Guardo el name pasado por query
  try {
    if (!name) {
      const countryAll = await Country.findAll({ include: Activity});
      res.send(countryAll);
    } else {
      const countryQuery = await Country.findAll({
        where: {
          name: { // Operador que busca coincidencias y no es case sensitive
            [Op.iLike]: `%${name}%`
          },
        },
         include: Activity
      });

      if (!countryQuery[0]) {
        console.log("error");
        return res
          .status(404)
          .json({
            error: ` Country not found , ${name}`,
          });
      }
      return res.send(countryQuery);
    }
  } catch (error) {
    res.send(error);
  }
}

// ******************************************* GET /countries/{idPais}: **********************************************
// Obtener el detalle de un país en particular
// Traer solo los datos pedidos en la ruta de detalle de país
// Incluir los datos de las actividades turísticas correspondientes
async function GetCountryId(req, res) {
  try {
    const id = req.params.id.toUpperCase();
    const country = await Country.findOne({
      where: {
        id: id,
      },
      include: Activity,
    });

    return res.json(country);
  } catch (error) {
    res.send(error);
  }
}
  
module.exports = { getAllCountries, GetCountryId };
