const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/beltmern", {
   useNewUrlParser: true,
   useUnifiedTopology: true 
})
    .then(() => console.log("Conectado exitosamente con DB"))
    .catch(err => console.log("Error al conectarse con DB "+err));