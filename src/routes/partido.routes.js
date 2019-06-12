module.exports = (app) => {
const controller = require('../controllers/partido.controller');
    app.get('/api/partido', controller.getAllPartidos)

}
