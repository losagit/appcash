const express = require('express');
const router = express.Router();

const uploadCtrl = require('../lib/upload');
const categoriaCtrl = require('../controllers/categoriaController');
const productoCtrl = require('../controllers/productoController');
const modeloCtrl = require('../controllers/modeloController');
const clienteCtrl = require('../controllers/clienteController');
const pedidoCtrl = require('../controllers/pedidoController');


router.get('/api/listCategorias', categoriaCtrl.list);
router.get('/api/findCategoria/:id', categoriaCtrl.findById);
router.post('/api/createCategoria', categoriaCtrl.create);
router.patch('/api/updateCategoria/:id', categoriaCtrl.update);

router.get('/api/allProductos', productoCtrl.all);
router.get('/api/listProductos/:id', productoCtrl.list);
router.get('/api/listParamProductos', productoCtrl.listParam);
router.get('/api/findProducto/:id', productoCtrl.findById);
router.post('/api/createProducto', uploadCtrl.upload , productoCtrl.create);
router.patch('/api/updateProducto/:id',uploadCtrl.upload , productoCtrl.update);

router.get('/api/listModelos/:id', modeloCtrl.list);
router.post('/api/createModelo', uploadCtrl.upload ,modeloCtrl.create);
router.patch('/api/updateModelo/:id', modeloCtrl.update);

router.get('/api/listClientes',clienteCtrl.list);
router.post('/api/createCliente',clienteCtrl.create);

router.get('/api/listPedidos',pedidoCtrl.list);
router.get('/api/detailPedido',pedidoCtrl.details);
router.post('/api/createPedido',pedidoCtrl.create);




module.exports = router;
