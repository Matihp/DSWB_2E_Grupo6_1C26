const BaseModel = require('./BaseModel');

class Empresa extends BaseModel {
    constructor() {
        super('empresas.json');
    }

    crear(datosEmpresa) {
        if (!datosEmpresa.nombre || !datosEmpresa.cuit) {
            throw new Error("Nombre y CUIT son obligatorios para la empresa");
        }
        if (datosEmpresa.nombre.trim().length < 3) {
            throw new Error("El nombre de la empresa debe tener un mínimo de 3 caracteres");
        }
        if (datosEmpresa.cuit.trim().length < 11) {
            throw new Error("El CUIT debe tener al menos 11 caracteres (ej: 20123456789)");
        }
        return super.crear(datosEmpresa);
    }

    actualizar(id, datosEmpresa) {
        if (datosEmpresa.nombre && datosEmpresa.nombre.trim().length < 3) {
            throw new Error("El nombre de la empresa debe tener un mínimo de 3 caracteres");
        }
        if (datosEmpresa.cuit && datosEmpresa.cuit.trim().length < 11) {
            throw new Error("El CUIT debe tener al menos 11 caracteres (ej: 20123456789)");
        }
        return super.actualizar(id, datosEmpresa);
    }
}

module.exports = new Empresa();
