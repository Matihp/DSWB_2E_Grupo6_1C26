const empleadoModel = require('../models/Empleado');

const EmpleadoController = {
    obtenerTodos: (req, res) => {
        const empleados = empleadoModel.obtenerTodos();
        res.status(200).json(empleados);
    },    
    buscarPorId: (req, res) => {
        const empleado = empleadoModel.buscarPorId(req.params.id);
        if (!empleado) {
            return res.status(404).json({ error: "Empleado no encontrado" });
        }
        res.status(200).json(empleado);
    },    
    crear: (req, res) => {
        try {
            const nuevoEmpleado = empleadoModel.crear(req.body);
            res.status(201).json(nuevoEmpleado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },    
    actualizar: (req, res) => {
        try {
            const actualizado = empleadoModel.actualizar(req.params.id, req.body);
            if (!actualizado) {
                return res.status(404).json({ error: "Empleado no encontrado para actualizar" });
            }
            res.status(200).json(actualizado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },   
    eliminar: (req, res) => {
        const novedadModel = require('../models/Novedad');
        const novedades = novedadModel.obtenerTodos();
        const tieneNovedades = novedades.some(n => n.empleadoId === req.params.id);
        
        if (tieneNovedades) {
            return res.status(400).json({ error: "No se puede eliminar el empleado porque tiene novedades asociadas. Elimínelas primero." });
        }
        
        const eliminado = empleadoModel.eliminar(req.params.id);
        if (!eliminado) {
            return res.status(404).json({ error: "Empleado no encontrado para eliminar" });
        }
        res.status(200).json({ mensaje: "Empleado eliminado", empleado: eliminado });
    }
};

module.exports = EmpleadoController;
