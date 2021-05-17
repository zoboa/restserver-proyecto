const { Schema, model } = require('mongoose');
const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    preciou: {
        type: Number,
        default: true
    },
    descripcion: {
        type: String
    },
    categoria: {
        type: Schema,
        Types,
        ObjectId,
        ref: 'Categoria',
        required: true
    },
    usuario: {
        type: Boolean,
        default: 'Usuario',
        required: true
    },
    disponible: {
        type: Boolean,
        default: true,
    },
});

ProductoSchema.methods.toJSON = function() {
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = modul('ProductO', ProductoSchema);