const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/53d5e9f243a8f1519160645fdf561d92/' + latitude + ',' + longitude + '?units=si'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Can not connect to Weather API', undefined)
        } else if (body.error) {
            callback('Wrong input data', undefined)
        } else {
            const data = body.daily.data[0].summary + ' It is ' + body.currently.temperature + ' degrees outside, and ' + body.currently.precipProbability + ' chance of rain'
            callback(undefined, data)
        }
    })
}

module.exports = forecast