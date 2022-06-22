const axios = require('axios')
const { promiseImpl } = require('ejs')

//renders intro page
exports.intro = (req, res) => {
    res.render('index')
}


//renders the interactive map page
exports.loadAllSpecies = (req, res) => {
    axios.get(`http://localhost:4747/api/v1/species`)
        .then((response) => {
            console.log(response.data)
            res.render('database_map', { species: response.data})
        })
        .catch(err => {
            res.send(err)
        })

}

//renders the species specific page
exports.loadSpecies = (req, res) => {
    const getSpecies = axios.get(`http://localhost:4747/api/v1/species/${req.params.speciesName}`)
    const getEpisodes = axios.get(`http://localhost:4747/api/v1/episodes/${req.params.speciesName}`)
    Promise.all([getSpecies, getEpisodes])
        .then((response) => {
            console.log(response[0].data)
            console.log(response[1].data)
            res.render('species_info', { episodes: response[1].data, species: response[0].data})
        })
        .catch(err => {
            res.send(err)
        })
}

//renders the add an episode form page
exports.addEpisode = (req, res) => {
    res.render('add_encounter', {encounter: req.params.speciesName})
}

