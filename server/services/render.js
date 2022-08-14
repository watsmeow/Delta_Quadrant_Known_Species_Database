const axios = require('axios')
const { promiseImpl } = require('ejs')
const express = require('express')
const { species } = require('../model/model')


//renders intro page
exports.intro = (req, res) => {
    res.render('index')
}

//renders the interactive map page
exports.loadAllSpecies = async (req, res) => {
    try {
        let speciesResponse = await axios.get(`${process.env.API_URL}/api/v1/species`)
        res.render('database_map', { species: JSON.stringify(speciesResponse.data).replace(/'/g, '\\u0027') })
    } catch (error) {
        console.error(error)
        res.render('error_page')
    }
};

//renders the species list page
exports.loadSpeciesList = async (req, res) => {
    try {
        let response = await axios.get(`${process.env.API_URL}/api/v1/species`)
        res.render('species_list', { species: response.data })
    } catch (error) {
        console.error(error)
        res.render('error_page')
    }
};

//renders the species specific page
exports.loadSpecies = async (req, res) => {
    try {
        const getSpecies = await axios.get(`${process.env.API_URL}/api/v1/species/${req.params.speciesName}`)
        console.log(getSpecies)
        const getEpisodes = await axios.get(`${process.env.API_URL}/api/v1/episodes/${req.params.speciesName}`)
        if (getSpecies.data.length == 0) {
            res.render('error_page')
        }
        res.render('species_info', { episodes: getEpisodes.data, species: getSpecies.data, speciesName: req.params.speciesName})
    } catch (error) {
        console.error(err)
        res.render('error_page')
    }
};

//renders the add an episode form page
exports.addEpisode = async (req, res) => {
    try {
        let response = await axios.get(`${process.env.API_URL}/api/v1/species`)
        let names = response.data.map((alien) => {
            return alien.name
        })
        res.render('add_encounter', {encounter: req.params.speciesName, alienNames: names})
    } catch (error) {
        console.error(error)
        res.render('error_page')
    }
};

