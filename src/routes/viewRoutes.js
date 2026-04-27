const express = require('express');
const router = express.Router();
const empresaModel = require('../models/Empresa');
const novedadModel = require('../models/Novedad');
const empleadoModel = require('../models/Empleado');
const DashboardController = require('../controllers/DashboardController');

router.get('/', DashboardController.obtenerIndicadores);


// Vistas Empresas
router.get('/empresas', (req, res) => {
    const empresas = empresaModel.obtenerTodos();
    res.render('empresas/index', { empresas });
});

router.get('/empresas/nuevo', (req, res) => {
    res.render('empresas/nuevo');
});

router.get('/empresas/:id/editar', (req, res) => {
    const empresa = empresaModel.buscarPorId(req.params.id);
    if (!empresa) return res.redirect('/empresas');
    res.render('empresas/editar', { empresa });
});

router.post('/empresas/:id/editar', (req, res) => {
    try {
        empresaModel.actualizar(req.params.id, req.body);
        res.redirect('/empresas');
    } catch (error) {
        res.status(400).send(`<h2>Error</h2><p>${error.message}</p><a href='/empresas'>Volver</a>`);
    }
});

router.post('/empresas/:id/eliminar', (req, res) => {
    const empleados = empleadoModel.obtenerTodos();
    const tieneEmpleados = empleados.some(e => e.empresaId === req.params.id);
    
    if (tieneEmpleados) {
        return res.status(400).send(`
            <div style="font-family: sans-serif; padding: 20px;">
                <h2 style="color: red;">Error de Integridad</h2>
                <p>No se puede eliminar la empresa porque tiene empleados registrados.</p>
                <p>Debe eliminar a todos los empleados de esta empresa primero.</p>
                <a href="/empresas">Volver a Empresas</a>
            </div>
        `);
    }
    
    empresaModel.eliminar(req.params.id);
    res.redirect('/empresas');
});

// Vistas Novedades
router.get('/novedades', (req, res) => {
    let novedades = novedadModel.obtenerTodos();
    const filtroEstado = req.query.estado;
    
    if (filtroEstado) {
        novedades = novedades.filter(n => n.estado === filtroEstado);
    }
    
    const empleados = empleadoModel.obtenerTodos();
    const novedadesConEmpleado = novedades.map(n => {
        const emp = empleados.find(e => e.id === n.empleadoId);
        return { ...n, empleadoNombre: emp ? emp.nombre : 'Desconocido' };
    });

    res.render('novedades/index', { novedades: novedadesConEmpleado, filtroEstado });
});

router.get('/novedades/nuevo', (req, res) => {
    const empleados = empleadoModel.obtenerTodos();
    res.render('novedades/nuevo', { empleados });
});

router.get('/novedades/:id/editar', (req, res) => {
    const novedad = novedadModel.buscarPorId(req.params.id);
    if (!novedad) return res.redirect('/novedades');
    const empleados = empleadoModel.obtenerTodos();
    res.render('novedades/editar', { novedad, empleados });
});

router.post('/novedades/:id/editar', (req, res) => {
    try {
        novedadModel.actualizar(req.params.id, req.body);
        res.redirect('/novedades');
    } catch (error) {
        res.status(400).send(`<h2>Error</h2><p>${error.message}</p><a href='/novedades'>Volver</a>`);
    }
});

router.post('/novedades/:id/estado', (req, res) => {
    const { estado } = req.body;
    if (['pendiente', 'procesada', 'rechazada'].includes(estado)) {
        novedadModel.actualizar(req.params.id, { estado });
    }
    res.redirect('/novedades');
});

router.post('/novedades/:id/eliminar', (req, res) => {
    novedadModel.eliminar(req.params.id);
    res.redirect('/novedades');
});

// Vistas Empleados
router.get('/empleados', (req, res) => {
    const empleados = empleadoModel.obtenerTodos();
    res.render('empleados/index', { empleados });
});

router.get('/empleados/nuevo', (req, res) => {
    const empresas = empresaModel.obtenerTodos();
    res.render('empleados/nuevo', { empresas });
});

router.get('/empleados/:id/editar', (req, res) => {
    const empleado = empleadoModel.buscarPorId(req.params.id);
    if (!empleado) return res.redirect('/empleados');
    const empresas = empresaModel.obtenerTodos();
    res.render('empleados/editar', { empleado, empresas });
});

router.post('/empleados/:id/editar', (req, res) => {
    try {
        empleadoModel.actualizar(req.params.id, req.body);
        res.redirect('/empleados');
    } catch (error) {
        res.status(400).send(`<h2>Error</h2><p>${error.message}</p><a href='/empleados'>Volver</a>`);
    }
});

router.post('/empleados/:id/eliminar', (req, res) => {
    const novedades = novedadModel.obtenerTodos();
    const tieneNovedades = novedades.some(n => n.empleadoId === req.params.id);
    
    if (tieneNovedades) {
        return res.status(400).send(`
            <div style="font-family: sans-serif; padding: 20px;">
                <h2 style="color: red;">Error de Integridad</h2>
                <p>No se puede eliminar el empleado porque tiene novedades registradas en el historial.</p>
                <p>Para evitar inconsistencias en los datos, primero debe eliminar todas las novedades de este empleado.</p>
                <a href="/empleados">Volver a Empleados</a>
            </div>
        `);
    }
    
    empleadoModel.eliminar(req.params.id);
    res.redirect('/empleados');
});

// Vistas SOCIOS
const socioModel = require('../models/Socio');

router.get('/socios', (req, res) => {
    const socios = socioModel.obtenerTodos();
    res.render('socios/index', { socios });
});

router.get('/socios/nuevo', (req, res) => {
    res.render('socios/nuevo');
});

router.post('/socios', (req, res) => {
    try {
        socioModel.crear(req.body);
        res.redirect('/socios');
    } catch (error) {
        res.status(400).send(`<h2>Error</h2><p>${error.message}</p><a href='/socios'>Volver</a>`);
    }
});

router.get('/socios/:id/editar', (req, res) => {
    const socio = socioModel.buscarPorId(req.params.id);
    if (!socio) return res.redirect('/socios');
    res.render('socios/editar', { socio });
});

router.post('/socios/:id/editar', (req, res) => {
    try {
        socioModel.actualizar(req.params.id, req.body);
        res.redirect('/socios');
    } catch (error) {
        res.status(400).send(`<h2>Error</h2><p>${error.message}</p><a href='/socios'>Volver</a>`);
    }
});

router.post('/socios/:id/eliminar', (req, res) => {
    socioModel.eliminar(req.params.id);
    res.redirect('/socios');
});

// Vistas LIQUIDACIONES
const liquidacionModel = require('../models/Liquidacion');

router.get('/liquidaciones', (req, res) => {
    const liquidaciones = liquidacionModel.obtenerTodos();
    const empleados = empleadoModel.obtenerTodos();
    
    const liquidacionesConEmpleado = liquidaciones.map(l => {
        const emp = empleados.find(e => e.id === l.empleadoId);
        return { ...l, empleadoNombre: emp ? emp.nombre : 'Desconocido' };
    });
    
    res.render('liquidaciones/index', { liquidaciones: liquidacionesConEmpleado });
});

router.get('/liquidaciones/nuevo', (req, res) => {
    const empleados = empleadoModel.obtenerTodos();
    res.render('liquidaciones/nuevo', { empleados });
});

router.post('/liquidaciones', (req, res) => {
    try {
        liquidacionModel.crear(req.body);
        res.redirect('/liquidaciones');
    } catch (error) {
        res.status(400).send(`<h2>Error</h2><p>${error.message}</p><a href='/liquidaciones'>Volver</a>`);
    }
});

router.get('/liquidaciones/:id/editar', (req, res) => {
    const liquidacion = liquidacionModel.buscarPorId(req.params.id);
    if (!liquidacion) return res.redirect('/liquidaciones');
    const empleados = empleadoModel.obtenerTodos();
    res.render('liquidaciones/editar', { liquidacion, empleados });
});

router.post('/liquidaciones/:id/editar', (req, res) => {
    try {
        liquidacionModel.actualizar(req.params.id, req.body);
        res.redirect('/liquidaciones');
    } catch (error) {
        res.status(400).send(`<h2>Error</h2><p>${error.message}</p><a href='/liquidaciones'>Volver</a>`);
    }
});

router.post('/liquidaciones/:id/eliminar', (req, res) => {
    liquidacionModel.eliminar(req.params.id);
    res.redirect('/liquidaciones');
});

module.exports = router;
