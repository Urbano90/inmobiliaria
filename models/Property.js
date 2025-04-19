const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['casa', 'apartamento', 'terreno', 'local'],
        required: true
    },
    operation: {
        type: String,
        enum: ['venta', 'alquiler'],
        required: true
    },
    location: {
        address: String,
        city: String,
        state: String,
        coordinates: {
            lat: Number,
            lng: Number
        }
    },
    features: {
        bedrooms: Number,
        bathrooms: Number,
        area: Number,
        parking: Boolean,
        furnished: Boolean
    },
    images: [{
        url: String,
        isMain: Boolean
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['disponible', 'reservado', 'vendido'],
        default: 'disponible'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Property', propertySchema); 