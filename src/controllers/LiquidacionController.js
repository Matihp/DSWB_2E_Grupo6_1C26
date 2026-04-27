const liquidacionModel = require('../models/Liquidacion');
const empleadoModel = require('../models/Empleado');

const LiquidacionController = {
    obtenerTodos: (req, res) => {
        const liquidaciones = liquidacionModel.obtenerTodos();
        res.status(200).json(liquidaciones);
    },   
    buscarPorId: (req, res) => {
        const liquidacion = liquidacionModel.buscarPorId(req.params.id);
        if (!liquidacion) {
            return res.status(404).json({ error: "Liquidación no encontrada" });
        }
        res.status(200).json(liquidacion);
    },  
    crear: (req, res) => {
        try {
            if (req.body.empleadoId) {
                const empleado = empleadoModel.buscarPorId(req.body.empleadoId);
                if (!empleado) {
                    return res.status(400).json({ error: "El empleado especificado no existe" });
                }
            }
            const nuevaLiquidacion = liquidacionModel.crear(req.body);
            res.status(201).json(nuevaLiquidacion);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },   
    actualizar: (req, res) => {
        try {
            if (req.body.empleadoId) {
                const empleado = empleadoModel.buscarPorId(req.body.empleadoId);
                if (!empleado) {
                    return res.status(400).json({ error: "El empleado especificado no existe" });
                }
            }
            const actualizada = liquidacionModel.actualizar(req.params.id, req.body);
            if (!actualizada) {
                return res.status(404).json({ error: "Liquidación no encontrada para actualizar" });
            }
            res.status(200).json(actualizada);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },   
    eliminar: (req, res) => {
        const eliminada = liquidacionModel.eliminar(req.params.id);
        if (!eliminada) {
            return res.status(404).json({ error: "Liquidación no encontrada para eliminar" });
        }
        res.status(200).json({ mensaje: "Liquidación eliminada correctamente", liquidacion: eliminada });
    }
};

module.exports = LiquidacionController;
