const { Router } = require('express');
const { getAllCountries, GetCountryId } = require('../controllers/country')
const router= Router();

router.get('/', getAllCountries)  
router.get('/:id', GetCountryId) 
  
module.exports = router;

