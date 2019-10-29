const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidXh2bGFkaSIsImEiOiJjazI3YzY3bG4wNXFkM2dxZmxleWR2dHdlIn0.8h9PvGXMJ_ODH76Rxi4Z9w&limit=1'

    request({url, json: true}, (error, {body}) => {

        if (error) {
            callback('Unable to connect to geocoding API', undefined)
        } else if (body.features.length === 0) {
            callback('Data input is incorrect', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode