const PirataController = require("../controllers/pirata.controller");

const {authenticate} = require("../config/jwt.config");

module.exports = (app) => {
    app.post("/api/piratas", authenticate, PirataController.create_pirata);

    app.get("/api/piratas", authenticate, PirataController.get_all);

    app.get("/api/piratas/captain", authenticate, PirataController.get_captain);

    app.get("/api/piratas/:id", authenticate, PirataController.get_pirata);

    app.put("/api/piratas/:id", authenticate, PirataController.update_pirata);
    
    app.delete("/api/piratas/:id", authenticate, PirataController.delete_pirata);

}
