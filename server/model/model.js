const mongoose = require('mongoose')

//species object schema for db
let speciesSchema = new mongoose.Schema({
    name: {
        type: String, 
        require: true, 
        unique: true
    },
    homeworld: {
        type: String, 
        require: true
    }, 
    biology: String,
    culture: String,
    technology: String, 
    image: {
        filename: {
            type: String,
            unique: true, 
            require: true
        },
        contentType: {
            type: String, 
            require: true,
        }, 
        imageBase64: {
            type: String, 
            require: true
        }
    }
})

//episode object schema for db
let episodeSchema = new mongoose.Schema({
    speciesName: {
        type: String, 
        require: true
    },
    title: {
        type: String, 
        require: true,
        unique: true
    },
    season: {
        type: Number, 
        require: true,
    },
    episodeNumber: {
        type: Number, 
        //require: true,
    },
    summary: {
        type: String, 
        require: true,
        unique: true
    },
    image: {
        filename: {
            type: String,
            unique: true, 
            require: true
        },
        contentType: {
            type: String, 
            require: true,
        }, 
        imageBase64: {
            type: String, 
            require: true
        }
    }
})

const species = mongoose.model('species', speciesSchema)
const encounter = mongoose.model('encounter', episodeSchema)

module.exports = {encounter, species}
