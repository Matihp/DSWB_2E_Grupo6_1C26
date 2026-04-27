const empresaModel = require('../models/Empresa');
const novedadModel = require('../models/Novedad');

const DashboardController = {
    obtenerIndicadores: (req, res) => {
        const empresas = empresaModel.obtenerTodos();
        const novedades = novedadModel.obtenerTodos();
        
        const totalEmpresasActivas = empresas.length; 
        const novedadesPendientes = novedades.filter(n => n.estado === 'pendiente').length;
        
        const cargaOperativaEstimada = novedadesPendientes * 1;
        
        const indicadores = {
            totalEmpresasActivas,
            novedadesPendientes,
            cargaOperativaEstimadaHoras: cargaOperativaEstimada
        };
        res.render('dashboard', { indicadores });
    }
};

module.exports = DashboardController;
