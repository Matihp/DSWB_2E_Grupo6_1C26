const novedadModel = require('../models/Novedad');
const empleadoModel = require('../models/Empleado');

const NovedadController = {
    obtenerTodos: (req, res) => {
        const novedades = novedadModel.obtenerTodos();
        res.status(200).json(novedades);
    },   
    crear: (req, res) => {
        try {
            const empleado = empleadoModel.buscarPorId(req.body.empleadoId);
            if (!empleado) {
                return res.status(400).json({ error: "No se puede registrar novedad: El empleado no existe." });
            }
            
            const nuevaNovedad = novedadModel.crear(req.body);
            res.status(201).json(nuevaNovedad);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },    
    buscarPorId: (req, res) => {
        const novedad = novedadModel.buscarPorId(req.params.id);
        if (!novedad) {
            return res.status(404).json({ error: "Novedad no encontrada" });
        }
        res.status(200).json(novedad);
    },    
    actualizar: (req, res) => {
        try {
            const actualizada = novedadModel.actualizar(req.params.id, req.body);
            if (!actualizada) {
                return res.status(404).json({ error: "Novedad no encontrada para actualizar" });
            }
            res.status(200).json(actualizada);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },    
    eliminar: (req, res) => {
        const eliminada = novedadModel.eliminar(req.params.id);
        if (!eliminada) {
            return res.status(404).json({ error: "Novedad no encontrada para eliminar" });
        }
        res.status(200).json({ mensaje: "Novedad eliminada correctamente", novedad: eliminada });
    },
    cambiarEstado: (req, res) => {
        const { estado } = req.body;
        if (!['pendiente', 'procesada', 'rechazada'].includes(estado)) {
            return res.status(400).json({ error: "El estado proporcionado es inválido." });
        }
        
        const actualizada = novedadModel.actualizar(req.params.id, { estado });
        if (!actualizada) {
            return res.status(404).json({ error: "Novedad no encontrada" });
        }
        res.status(200).json(actualizada);
    }
};

module.exports = NovedadController;
