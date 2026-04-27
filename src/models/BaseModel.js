const fs = require('fs');
const path = require('path');

class BaseModel {
    constructor(filename) {
        this.filePath = path.join(__dirname, '../data', filename);
    }

    _readData() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error(`Error leyendo ${this.filePath}:`, error);
            return [];
        }
    }

    _writeData(data) {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
        } catch (error) {
            console.error(`Error escribiendo en ${this.filePath}:`, error);
        }
    }

    obtenerTodos() {
        return this._readData();
    }

    buscarPorId(id) {
        const data = this._readData();
        return data.find(item => item.id === id) || null;
    }

    crear(nuevoItem) {
        const data = this._readData();
        nuevoItem.id = Date.now().toString();
        data.push(nuevoItem);
        this._writeData(data);
        return nuevoItem;
    }

    actualizar(id, itemActualizado) {
        let data = this._readData();
        const index = data.findIndex(item => item.id === id);
        if (index !== -1) {
            data[index] = { ...data[index], ...itemActualizado, id };
            this._writeData(data);
            return data[index];
        }
        return null;
    }

    eliminar(id) {
        let data = this._readData();
        const index = data.findIndex(item => item.id === id);
        if (index !== -1) {
            const eliminado = data.splice(index, 1);
            this._writeData(data);
            return eliminado[0];
        }
        return null;
    }
}

module.exports = BaseModel;
