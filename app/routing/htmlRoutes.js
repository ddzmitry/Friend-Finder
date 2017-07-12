let path = require('path');
let data = require(path.join(__dirname, '../data/data.js'))


module.exports = (app) => {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
    app.get('/api', (req, res) => {
        res.json(data)
    })


};