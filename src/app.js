const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')

const app = express()
const publicDir = path.join(__dirname, '../public')

app.use(express.static(publicDir))

app.get('/weather', (req, res) => {

    if (!req.query.city) {
        return res.send({
            error: 'You must provide city name'
        })
    }

    const city = req.query.city

    geocode(city, (error, {latitude, longitude, location} = {}) => {
    
        if (error) { return res.send({error}) }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) { return res.send({error}) }

            res.send({
                forecast: forecastData,
                location: location
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 

    res.send({
        products: []
    })
})

app.listen(3000, () => {
    console.log('Server is up and listening at port 3000')
})

//new change