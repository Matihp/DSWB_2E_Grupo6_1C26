const BaseModel = require('./BaseModel');

class Liquidacion extends BaseModel {
    constructor() {
        super('liquidaciones.json');
    }
    crear(datosLiquidacion) {
        if (!datosLiquidacion.empleadoId || !datosLiquidacion.mes || !datosLiquidacion.monto) {
            throw new Error("Empleado, mes y monto son obligatorios");
        }
        if (Number(datosLiquidacion.monto) <= 0) {
            throw new Error("El monto de la liquidación debe ser mayor a 0");
        }
        return super.crear(datosLiquidacion);
    }

    actualizar(id, datosLiquidacion) {
        if (datosLiquidacion.monto && Number(datosLiquidacion.monto) <= 0) {
            throw new Error("El monto de la liquidación debe ser mayor a 0");
        }
        return super.actualizar(id, datosLiquidacion);
    }
}

module.exports = new Liquidacion();
