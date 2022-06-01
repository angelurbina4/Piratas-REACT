const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser"); //npm install cookie-parser

//Para usar json y obtener datos de URL
app.use( express.json(), express.urlencoded({extended: true}) );

//Para usar cookies
app.use(cookieParser());

//Permitir accesar desde origen distinto
app.use(
    cors( {
        origin: "http://localhost:3000",
        //Credenciales
        credentials: true
    })
)

//inicializamos DB
require("./server/config/mongoose.config");

//importamos rutas
const misRutas =require("./server/routes/pirata.routes");
misRutas(app);

const misRutas2 = require("./server/routes/user.routes");
misRutas2(app);

//ejecutamos server
app.listen(8000, () => console.log("servidor listo!"));