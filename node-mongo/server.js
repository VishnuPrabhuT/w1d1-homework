const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(cors());
app.use(bodyParser.json());
// app.use(express.static("public"));

require("./app/models/inventory.model.js");

require("dotenv").config();

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection
    .on("open", () => {
        console.log("Mongoose connection open");
    })
    .on("error", (err) => {
        console.log("Connection error:" + err.message);
    });

require("./app/routes/inventory.router.js")(app);

const server = app.listen(8000, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log("App listening at http://localhost:8000");
});
