const { Router } = require('express');
const { newActivity ,getAllActivities } = require('../controllers/activities')
const router= Router();

router.post('/', newActivity )  
router.get('/' , getAllActivities)

module.exports = router;
