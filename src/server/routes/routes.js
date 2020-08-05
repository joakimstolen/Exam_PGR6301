const express = require('express');
//const {getAllCountries, getCountry, getIndividualCountry, deleteCountry, updateCountryList} = require('../db/countries');
const {addCountryToUser} =require('../db/users');

const countries = require("../db/countries");
const router = express.Router();



router.post('/inserthere', (req, res) => {
    if (!req.user) {
        res.status(401).send();
        return;
    }

    let userId = req.user.id;

    const payload = addCountryToUser(userId);
    console.log(payload)

    res.status(200).json(payload);
});

router.post('/inserthere', (req, res) => {

    const payload = getAllCountries();
    console.log(payload)
    res.status(200).json(payload);
});





router.get('/countries', (req, res) => {
    const payload = getAllCountries();
    console.log(payload)
    res.status(200).json(payload);
});

router.put('/api/inserthere/:id', (req, res) => {
    if (req.params.id !== req.body.id){
        res.status(409);
        res.send();
        return;
    }

    const updated = countries.updateCountryList(req.body);

    if (updated){
        res.status(204);
    } else {
        res.status(404);
    }

    res.send();
});


router.delete('/api/inserthere/:id', (req, res) => {
    console.log(req, res)
    const deleted = countries.deleteCountry(req.params.id);

    if (deleted){
        res.status(204);
    } else {
        res.status(404);
    }

    res.send();
});

module.exports = router;