const buildQuery = require('../utils/querys');
const util = require('util');
const conn = require('../../config/database');
const resource = "clientes";
const ctrl = {};

const queryAsync = util.promisify(conn.query).bind(conn);

ctrl.list = async(req,res) => {

    const params = req.query;

    const consulta = buildQuery.select(resource, params);
    const result = await queryAsync(consulta, consulta.vals);

    res.status(200).json(result);

};

ctrl.create = async (req,res) => {
    try{
        
        const body = req.body;
        const data = {
            ...body,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        const columns = Object.keys(data);
        const vals = Object.values(data);

        const consulta = buildQuery.insert(resource,columns);
        const result = await queryAsync(consulta, vals);

        res.status(200).json({ mensaje: 'Inserción exitosa', insertId: result.insertId });

    } catch (error) {
        console.log(error);
    }
}

module.exports = ctrl;