const BaseModel = require('./BaseModel');

class Empleado extends BaseModel {
    constructor() {
        super('empleados.json');
    }

    crear(datosEmpleado) {
        if (!datosEmpleado.nombre || !datosEmpleado.empresaId) {
            throw new Error("Nombre y empresaId son obligatorios para el empleado");
        }
        if (datosEmpleado.nombre.trim().length < 4) {
            throw new Error("El nombre y apellido del empleado debe tener un mínimo de 4 caracteres");
        }
        return super.crear(datosEmpleado);
    }

    actualizar(id, datosEmpleado) {
        if (datosEmpleado.nombre && datosEmpleado.nombre.trim().length < 4) {
            throw new Error("El nombre y apellido del empleado debe tener un mínimo de 4 caracteres");
        }
        return super.actualizar(id, datosEmpleado);
    }
}

module.exports = new Empleado();
