const mongoose = require("mongoose");

const EsquemaPirata = new mongoose.Schema({
    pirateName: {
        type: String,
        required: [true, "Nombre del pirata es necesario."]
    },
    imagen: {
        type: String,
        required: [true, "Imagen del pirata es necesario."]
    },
    treasureChests: {
        type: Number,
        required: [true, "Numero de cofres del tesoro es necesario."]
    },
    phrase: {
        type: String,
        required: [true, "Frase del pirata es necesario."]
    },
    crewPosition: {
        type: String,
        required: [true, "Crew del pirata es necesario."]
    },
    pegLeg: {
        type: Boolean,
        default: false
    },
    eyePatch: {
        type: Boolean,
        default: false
    },
    hookHand: {
        type: Boolean,
        default: false
    }

},{timestamps: true, versionKey:false});

const Pirata = mongoose.model("piratas", EsquemaPirata);
module.exports = Pirata;
