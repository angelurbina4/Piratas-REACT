const Pirata = require("../models/pirata.model");

module.exports.get_all = (req, res) => {
    Pirata.find().collation({locale: "en"}).sort({pirateName: 1})
        .then(piratas => res.json(piratas))
        .catch( err => res.status(400).json(err));
}

module.exports.create_pirata = (req, res) => {
    Pirata.create(req.body)
        .then(pirata => res.json(pirata))
        .catch(err => res.status(400).json(err));
}

module.exports.get_pirata = (req, res) => {
    Pirata.findOne({_id: req.params.id})
    .then(pirata => res.json(pirata))
    .catch(err => res.status(400).json(err));
}

module.exports.update_pirata = (req, res) => {
    Pirata.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators:true})
    .then(pirata => res.json(pirata))
    .catch(err => res.status(400).json(err));
}

module.exports.delete_pirata = (req, res) => {
    Pirata.deleteOne({_id: req.params.id})
    .then(result => res.json(result))
    .catch(err => res.status(400).json(err));
}

module.exports.get_captain = (req, res) => {
    Pirata.findOne({crewPosition: "Capitán"})
    .then(captain => res.json(captain))
    .catch(err => res.status(400).json(err));
}