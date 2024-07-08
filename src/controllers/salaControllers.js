exports.get = async  (req, res)=> {
    const salaModel = require('../model/salaModel')
    return salaModel.listarSalas();
}