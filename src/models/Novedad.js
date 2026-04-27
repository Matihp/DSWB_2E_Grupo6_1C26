const BaseModel = require('./BaseModel');

class Novedad extends BaseModel {
    constructor() {
        super('novedades.json');
    }

    crear(datosNovedad) {
        if (!datosNovedad.empleadoId || !datosNovedad.descripcion) {
            throw new Error("empleadoId y descripcion son obligatorios para la novedad");
        }
        if (datosNovedad.descripcion.trim().length < 8) {
            throw new Error("La descripción de la novedad debe tener al menos 8 caracteres");
        }
        // Estado por defecto
        datosNovedad.estado = datosNovedad.estado || 'pendiente'; 
        return super.crear(datosNovedad);
    }

    actualizar(id, datosNovedad) {
        if (datosNovedad.descripcion && datosNovedad.descripcion.trim().length < 8) {
            throw new Error("La descripción de la novedad debe tener al menos 8 caracteres");
        }
        return super.actualizar(id, datosNovedad);
    }
}

module.exports = new Novedad();
