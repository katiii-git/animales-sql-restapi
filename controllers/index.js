const models = require("../database/models");
const Animal = models.Animal;

const createAnimal = async (req, res) => {
    try {
        const animal = await models.Animal.create(req.body);
        return res.status(201).json({ animal });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

/*const getAllAnimals = async (req, res) => {
  try {
    console.log('🔍 Entrando al controlador getAllAnimals');
    const animals = await Animal.findAll();
    console.log('📦 Datos encontrados:', animals);
    res.status(200).json({ animals });
  } catch (error) {
    console.error('💥 Error en getAllAnimals:', error);
    res.status(500).json({ error: 'Error al obtener los animales' });
  }
};*/
const getAllAnimals = async (req, res) => {
    console.log('getting animals');
    try {
        const animals = await models.Animal.findAll();
        return res.status(200).json({ animals });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

// Obtener animal por ID
const getAnimalById = async (req, res) => {
    try {
        const animal = await models.Animal.findOne({ where: { id: req.params.id } });
        if (!animal) {
            return res.status(404).json({ error: `El animal con ID ${req.params.id} no existe.` });
        }
        return res.status(200).json({ animal });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const updateAnimal = async (req, res) => {
    console.log('updating animal...');
    try {
        const animal = await models.Animal.findOne({ where: { id: req.params.id } });
        if (animal) {
            animal.name = req.body.name;
            animal.species = req.body.species;
            animal.age = req.body.age;
            animal.gender = req.body.gender;
            animal.habitat = req.body.habitat;
            animal.diet = req.body.diet;
            animal.description = req.body.description;
            await animal.save();
            return res.status(200).json({ updated: animal });
        } else {
            return res.status(404).json({ error: `El animal con ID ${req.params.id} no existe.` });
        }
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const deleteAnimal = async (req, res) => {
    console.log('deleting animal...');
    try {
        const animal = await models.Animal.findOne({ where: { id: req.params.id } });
        if (animal) {
            await animal.destroy();
            return res.status(200).json({ deleted: req.params.id });
        } else {
            return res.status(404).json({ error: `El animal con ID ${req.params.id} no existe.` });
        }
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = {
    createAnimal,
    getAllAnimals,
    getAnimalById,
    updateAnimal,
    deleteAnimal
};


