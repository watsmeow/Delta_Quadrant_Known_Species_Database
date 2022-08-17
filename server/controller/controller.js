const { traceDeprecation } = require('process')
const {encounter, species}  = require('../model/model')
const fs = require('fs')
const { name } = require('ejs')

//API GET to load all species data into map page
exports.loadAllSpecies = async (req, res) => {
    try {
        let aliens = await species.find()
        res.send(aliens)
    } catch (error) {
        res.status(500).send({
            message: error.message || "Error while retrieving species information."
        })
    }
};

//API GET to load all species data into list page
exports.loadSpeciesList = async (req, res) => {
    try {
        let aliens = await species.find()
        res.send(aliens)
    } catch (error) {
        res.status(500).send({
            message: err.message || "Error while retrieving species information."
        })
    }
};

//API GET to load species data into species page by name
exports.loadSpecies = async (req, res) => {
    const name = req.params.name
    try {
        let alien = await species.find({'name': name})
        if (!alien) {
            res.status(404).send({
                message: `Species id ${name} not found.`
            })
        }
        res.send(alien)
    } catch (error) {
        res.status(500).send({
            message: `Error retrieving species ${name}.`
        })
    }
};

//API GET to load all episode data into species page (encounters area)
exports.loadEpisodes = async (req, res) => {
    try {
        const speciesName = req.params.speciesName
        let episodes = await encounter.find({'speciesName': speciesName})
        if (!episodes) {
            res.status(404).send({
                message: `Encounters associated with ${speciesName} not found.`
            })
        }
        res.send(episodes)
    } catch (error) {
        res.status(500).send({
            message: `Error retrieving encounters associated with ${speciesName}.`
        })
    }
};

//API POST new encounter to the database
exports.addEpisode = async (req, res) => {
    try {
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

        await episode.save()
        res.redirect(`/encounter/${req.body.speciesName}`)

    } catch (error) {
        res.status(500).send({
            message : err.message || "Error, unable to comply."
        })
    }
};

