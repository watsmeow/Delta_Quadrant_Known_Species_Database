const express = require('express')
const route = express.Router()


const services = require('../services/render')
const controller = require('../controller/controller')
const store = require('../middleware/multer')

//Root route to RENDER intro page
route.get('/', services.intro)

//Route to RENDER map page
route.get('/map', services.loadAllSpecies)
//API GET to load all species data into map page
route.get('/api/v1/species', controller.loadAllSpecies)



//Route to RENDER species info page, takes in species name
route.get('/species/:speciesName', services.loadSpecies)
//API GET to load species data by species name into species page
route.get('/api/v1/species/:name', controller.loadSpecies)



//API GET to load episode data to page 3, takes in species name as request parameter
route.get('/api/v1/episodes/:speciesName', controller.loadEpisodes)


//Route to RENDER add an episode page
route.get('/encounter/:speciesName', services.addEpisode)
//API POST to add an episode to the database
route.post('/api/v1/episodes/:speciesName', store.single('file'), controller.addEpisode)

module.exports = route