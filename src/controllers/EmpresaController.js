const empresaModel = require('../models/Empresa');

const EmpresaController = {
    obtenerTodos: (req, res) => {
        const empresas = empresaModel.obtenerTodos();
        res.status(200).json(empresas);
    },    
    buscarPorId: (req, res) => {
        const empresa = empresaModel.buscarPorId(req.params.id);
        if (!empresa) {
            return res.status(404).json({ error: "Empresa no encontrada" });
        }
        res.status(200).json(empresa);
    },   
    crear: (req, res) => {
        try {
            const nuevaEmpresa = empresaModel.crear(req.body);
            res.status(201).json(nuevaEmpresa);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },   
    actualizar: (req, res) => {
        try {
            const actualizada = empresaModel.actualizar(req.params.id, req.body);
            if (!actualizada) {
                return res.status(404).json({ error: "Empresa no encontrada para actualizar" });
            }
            res.status(200).json(actualizada);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },  
    eliminar: (req, res) => {
        const empleadoModel = require('../models/Empleado');
        const empleados = empleadoModel.obtenerTodos();
        const tieneEmpleados = empleados.some(e => e.empresaId === req.params.id);
        
        if (tieneEmpleados) {
            return res.status(400).json({ error: "No se puede eliminar la empresa porque tiene empleados asociados. Elimínelos primero." });
        }
        
        const eliminada = empresaModel.eliminar(req.params.id);
        if (!eliminada) {
            return res.status(404).json({ error: "Empresa no encontrada para eliminar" });
        }
        res.status(200).json({ mensaje: "Empresa eliminada correctamente", empresa: eliminada });
    }
};

module.exports = EmpresaController;
