
const conn = require('../../config/database');
const buildQuery = require('../utils/querys');
const fs = require("fs");
const path = require("path");
const util = require('util');
const queryAsync = util.promisify(conn.query).bind(conn);

const resource = "productos";
const ctrl = {};

ctrl.all = async (req, res) => {
    const sql = `SELECT * FROM ${resource}`
    conn.query(sql, (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
};

ctrl.listParam = async (req, res) => {

    const params = req.query;

    const consulta = buildQuery.select(resource, params);
    const result = await queryAsync(consulta, consulta.vals);
    res.status(200).json(result);
};

ctrl.list = async (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM ${resource} where categoria_id = ? `
    conn.query(sql, [id], (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
};

ctrl.findById = async (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM ${resource} where id = ? `
    conn.query(sql, [id], (err, rows) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
};

ctrl.create = async (req, res) => {

    try{
        const file = fs.readFileSync(
            path.join(__dirname, "../../images/" + req.file.filename)
          );

        const body = req.body;
        delete body.imagen;
        const data = {
            ...body,
            imagen: file,
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
        const file = fs.readFileSync(
            path.join(__dirname, "../../images/" + req.file.filename)
          );
        const body = req.body;
        delete body.imagen;
        const data = {
            ...body,
            imagen: file,
            updatedAt: new Date(),
        }

        const query = `UPDATE ${resource} SET ? WHERE id = ?`;
        const result = conn.query(query, [data, id]);

        res.json(result);

    } catch (error) {
        console.log(error)
    }
};

module.exports = ctrl;