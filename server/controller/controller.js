const { traceDeprecation } = require('process')
const {encounter, species}  = require('../model/model')
const fs = require('fs')

//API GET to load all species data into map page
exports.loadAllSpecies = (req, res) => {
    species.find()
        .then(aliens => {
            // for (let i = 0; i < aliens.length; i++) {
            // }
            res.send(aliens)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error while retrieving species information."
            })
        })
}

//API GET to load all species data into list page
exports.loadSpeciesList = (req, res) => {
    species.find()
        .then(aliens => {
            res.send(aliens)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error while retrieving species information."
            })
        })
}

//API GET to load species data into species page by name
exports.loadSpecies = (req, res) => {
    if (req.params.name) {
        const name = req.params.name
        species.find({'name': name})
            .then(alien => {
                if (!alien) {
                    res.status(404).send({
                        message: `Species id ${name} not found.`
                    })
                } else {
                    res.send(alien)
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error retrieving species ${name}.`
                })
            })
    }
}

//API GET to load all episode data into species page (encounters area)
exports.loadEpisodes = (req, res) => {
 if (req.params.speciesName) {
    const speciesName = req.params.speciesName
    encounter.find({'speciesName': speciesName})
        .then(episodes => {
            if (!episodes) {
                res.status(404).send({
                    message: `Encounters associated with ${speciesName} not found.`
                })
            } else {
                res.send(episodes)
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving encounters associated with ${speciesName}.`
            })
        })
    }
}

//API POST new encounter to the database
exports.addEpisode = (req, res) => {
    //need to validate request
    if(!req.body){
        res.status(400).send({ message : "Encounter upload must contain data."})
        return
    }

    const image = req.file
    let img = fs.readFileSync(image.path)
    encode_image = img.toString('base64')

    fs.unlink(image.path, (err) => {
        if (err) {
            console.log(err)
        }
    })

    //new episode
    const episode = new encounter({
        speciesName: req.body.speciesName,
        title: req.body.title,
        season: req.body.season,
        episodeNumber: req.body.episodeNumber,
        summary: req.body.summary,
        image: {
            filename: image.originalname,
            contentType: image.mimetype,
            imageBase64: encode_image
        }
    })

    //save episode to database
    episode
        .save(episode)
        .then(data => {
            res.redirect(`/encounter/${req.body.speciesName}`)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message : err.message || "Error, unable to comply."
        })
    })
}

