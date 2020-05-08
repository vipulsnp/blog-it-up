"use strict";

let express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    path            = require("path"),
    cors            = require("cors");
require('dotenv').config();

if (process.env.NODE_ENV === 'production') 
mongoose.connect(process.env.MONGO_DB_PROD, { useNewUrlParser: true,useUnifiedTopology:true });
else
mongoose.connect(process.env.MONGO_DB_DEV, { useNewUrlParser: true, useUnifiedTopology: true });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("./"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

 let API = require("./api/index");
 app.use("/api", API);

if (process.env.NODE_ENV === 'production') 
{
    app.use(express.static(path.join(__dirname, '..', "frontend/build")));
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', "frontend/build", 'index.html'));  
    });
}


//Listening on port 5000
app.listen(5000, () => console.log("Backend Server started on port 5000"));
