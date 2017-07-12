let express = require('express')
let path = require('path');
let bodyParser = require('body-parser');
let fs = require("fs");
let HTMLRouts = require(path.join(__dirname, 'app/routing/htmlRoutes.js'))
let apiRouts = require(path.join(__dirname, 'app/routing/apiRoutes.js'))
let PORT = process.env.PORT || 3000;
let app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}))


//allowing stacitc folder for usage
app.use("/static/", express.static(path.join(__dirname, "app/public")));
HTMLRouts(app)
apiRouts(app)


app.all('*', (req, res) => {
    res.redirect("http://localhost:3000/");
});


app.listen(PORT)