const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Property = require('../models/Property');
const auth = require('../middleware/auth');

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Obtener todas las propiedades
router.get('/', async (req, res) => {
    try {
        const properties = await Property.find()
            .populate('owner', 'name email phone')
            .sort({ createdAt: -1 });
        res.json(properties);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Obtener una propiedad específica
router.get('/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id)
            .populate('owner', 'name email phone');
        if (!property) {
            return res.status(404).json({ message: 'Propiedad no encontrada' });
        }
        res.json(property);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Crear una nueva propiedad
router.post('/', auth, upload.array('images', 10), async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            type,
            operation,
            location,
            features
        } = req.body;

        const images = req.files.map(file => ({
            url: `/uploads/${file.filename}`,
            isMain: false
        }));

        if (images.length > 0) {
            images[0].isMain = true;
        }

        const property = new Property({
            title,
            description,
            price,
            type,
            operation,
            location: JSON.parse(location),
            features: JSON.parse(features),
            images,
            owner: req.user.userId
        });

        await property.save();
        res.status(201).json(property);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Actualizar una propiedad
router.put('/:id', auth, upload.array('images', 10), async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Propiedad no encontrada' });
        }

        if (property.owner.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'No autorizado' });
        }

        const updates = req.body;
        if (req.files && req.files.length > 0) {
            updates.images = req.files.map(file => ({
                url: `/uploads/${file.filename}`,
                isMain: false
            }));
        }

        Object.assign(property, updates);
        await property.save();
        res.json(property);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Eliminar una propiedad
router.delete('/:id', auth, async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Propiedad no encontrada' });
        }

        if (property.owner.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'No autorizado' });
        }

        await property.remove();
        res.json({ message: 'Propiedad eliminada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router; 