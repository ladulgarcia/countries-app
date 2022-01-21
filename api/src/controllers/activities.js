// Traigo tablas DB
const { Country, Activity } = require("../db");

// ******************************************* POST /activity ********************************************************
// Recibe datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
// Crear actividad turística en la base de datos
async function newActivity(req, res) {
  try{
  const { 
      name, 
      difficulty, 
      duration, 
      season, 
      countryID 
    } = req.body;

  const validateAct = await Activity.findOne({
    where: {
      name: name,
    },
  });
  if (!validateAct) {
    const addAct = await Activity.create({
      name: name,
      difficulty: difficulty,
      duration: duration,
      season: season,
    });
    const countryMatch = await Country.findAll({
      where: {
        name: countryID,
      },
    });

    const resAct = await addAct.addCountries(countryMatch);

    return res.send(resAct);
  }
  
  const countryMatch = await Country.findAll({
    where: {
      name: countryID,
    },
  });
  // console.log(addAct)
  // console.log(countryMatch)

  const resAct = await validateAct.addCountries(countryMatch);

  return res.send(resAct);

 }catch(error){
   console.log(error)
 }
}

async function getAllActivities(req, res) { 
  try {
      const ActivityAll = await Activity.findAll({ include: Country});
      res.send(ActivityAll);
  } catch (error) {
    res.send(error);
  }
}

module.exports = { newActivity, getAllActivities };
