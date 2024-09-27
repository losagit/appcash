const conn = require('../../config/database');
const ctrl = {};
const util = require('util');
const buildQuery = require('../utils/querys');
const resource = "categorias";

const queryAsync = util.promisify(conn.query).bind(conn);

ctrl.list = async (req, res) => {
    const sql = `SELECT * FROM categorias`
    conn.query(sql, (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
};

ctrl.findById = async (req, res) => {
    const { id }  = req.params;
    const sql = `SELECT * FROM categorias where id = ?`
    conn.query(sql,[id], (err, rows) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
};

ctrl.create = async (req, res) => {

    const body = req.body;
    try {
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
};

ctrl.update = (req, res) => {

    try {
        const { id } = req.params;
        const body = req.body;

        const data = {
            ...body,
            updatedAt: new Date(),
        }

        const query = 'UPDATE categorias SET ? WHERE id = ?';
        const result = conn.query(query, [data, id]);

        res.json(result);

    } catch (error) {
        console.log(error)
    }
};

module.exports = ctrl;