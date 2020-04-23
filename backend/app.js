"use strict";

let express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    path            = require("path"),
    cors            = require("cors");

    mongoose.connect("mongodb://localhost/blog-it-up", { useNewUrlParser: true,useUnifiedTopology:true });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("./"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

 let API = require("./api/index");
 app.use("/api", API);

//Listening on port 5000
app.listen(5000, () => console.log("Backend Server started on port 5000"));
