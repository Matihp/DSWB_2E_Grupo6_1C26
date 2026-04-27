const socioModel = require('../models/Socio');

const SocioController = {
    obtenerTodos: (req, res) => {
        const socios = socioModel.obtenerTodos();
        res.status(200).json(socios);
    },    
    buscarPorId: (req, res) => {
        const socio = socioModel.buscarPorId(req.params.id);
        if (!socio) {
            return res.status(404).json({ error: "Socio no encontrado" });
        }
        res.status(200).json(socio);
    },    
    crear: (req, res) => {
        try {
            const nuevoSocio = socioModel.crear(req.body);
            res.status(201).json(nuevoSocio);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },    
    actualizar: (req, res) => {
        try {
            const actualizado = socioModel.actualizar(req.params.id, req.body);
            if (!actualizado) {
                return res.status(404).json({ error: "Socio no encontrado para actualizar" });
            }
            res.status(200).json(actualizado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },   
    eliminar: (req, res) => {
        const eliminado = socioModel.eliminar(req.params.id);
        if (!eliminado) {
            return res.status(404).json({ error: "Socio no encontrado para eliminar" });
        }
        res.status(200).json({ mensaje: "Socio eliminado correctamente", socio: eliminado });
    }
};

module.exports = SocioController;
