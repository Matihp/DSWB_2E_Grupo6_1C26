const BaseModel = require('./BaseModel');

class Socio extends BaseModel {
    constructor() {
        super('socios.json');
    }
    
    crear(datosSocio) {
        if (!datosSocio.nombre || !datosSocio.porcentajeParticipacion) {
            throw new Error("Nombre y porcentaje de participación son obligatorios");
        }
        if (datosSocio.nombre.trim().length < 3) {
            throw new Error("El nombre del socio debe tener al menos 3 caracteres");
        }
        if (Number(datosSocio.porcentajeParticipacion) <= 0) {
            throw new Error("El porcentaje de participación debe ser mayor a 0");
        }
        return super.crear(datosSocio);
    }

    actualizar(id, datosSocio) {
        if (datosSocio.nombre && datosSocio.nombre.trim().length < 3) {
            throw new Error("El nombre del socio debe tener al menos 3 caracteres");
        }
        if (datosSocio.porcentajeParticipacion && Number(datosSocio.porcentajeParticipacion) <= 0) {
            throw new Error("El porcentaje de participación debe ser mayor a 0");
        }
        return super.actualizar(id, datosSocio);
    }
}

module.exports = new Socio();
