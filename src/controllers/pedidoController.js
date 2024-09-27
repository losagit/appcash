const buildQuery = require('../utils/querys');
const util = require('util');
const conn = require('../../config/database');
const resource = "pedidos";
const ctrl = {};

const queryAsync = util.promisify(conn.query).bind(conn);

ctrl.list = async (req, res) => {

    const conditions = {
        cliente_id: 'id'
      };
      
    const { sql, vals } = buildQuery.selectJoin('pedidos','clientes', conditions);
    const result = await queryAsync(sql, vals);

    res.status(200).json(result);

};

ctrl.details = async(req,res) => {

    const wheres = req.query;

    const tables = ['detalle_pedidos','pedidos', 'modelos'];

    const joins = [
        'detalle_pedidos.pedido_id = pedidos.id',
        'detalle_pedidos.modelo_id = modelos.id'
    ];

    const {sql, vals} = buildQuery.selectJoinMultiple(tables,joins,wheres);
    const result = await queryAsync(sql, vals);

    res.status(200).json(result);
}

ctrl.create = async (req, res) => {
    try {

        const body = req.body;
        const detalles = body.detalles;
        delete body.detalles;

        const data = {
            ...body,
            estado: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        const columns = Object.keys(data);
        const vals = Object.values(data);

        const consulta = buildQuery.insert(resource, columns);
        const result = await queryAsync(consulta, vals);
        const pedido_id = result?.insertId;

        if (result?.insertId) {
            detalles.forEach(async (det) => {
                const data = {
                    ...det,
                    pedido_id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }

                const columns = Object.keys(data);
                const vals = Object.values(data);

                const consulta = buildQuery.insert("detalle_pedidos", columns);
                const result = await queryAsync(consulta, vals);

            });
        }

        res.status(200).json({ mensaje: 'Inserción exitosa', insertId: result.insertId });

    } catch (error) {
        console.log(error);
    }
}

module.exports = ctrl;