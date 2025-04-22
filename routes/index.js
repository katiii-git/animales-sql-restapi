const { Router } =require('express');
const controllers =require('../controllers');

const router= Router();

router.get('/', (req, res) => res.send('Welcome'));

router.post('/animals', controllers.createAnimal);

router.get('/animals', controllers.getAllAnimals);

router.get('/animals/:id', controllers.getAnimalById);

router.delete('/animals/:id', controllers.deleteAnimal);

router.put('/animals/:id', controllers.updateAnimal);

module.exports = router;

