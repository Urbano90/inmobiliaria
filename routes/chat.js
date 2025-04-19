const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const auth = require('../middleware/auth');

// Obtener todos los chats de un usuario
router.get('/', auth, async (req, res) => {
    try {
        const chats = await Chat.find({
            participants: req.user.userId
        })
        .populate('participants', 'name email')
        .populate('property', 'title price images')
        .sort({ lastMessage: -1 });

        res.json(chats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Obtener un chat específico
router.get('/:id', auth, async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id)
            .populate('participants', 'name email')
            .populate('property', 'title price images');

        if (!chat) {
            return res.status(404).json({ message: 'Chat no encontrado' });
        }

        // Verificar si el usuario es participante del chat
        if (!chat.participants.some(p => p._id.toString() === req.user.userId)) {
            return res.status(403).json({ message: 'No autorizado' });
        }

        res.json(chat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Crear un nuevo chat
router.post('/', auth, async (req, res) => {
    try {
        const { propertyId, receiverId } = req.body;

        // Verificar si ya existe un chat entre estos usuarios para esta propiedad
        let chat = await Chat.findOne({
            property: propertyId,
            participants: { $all: [req.user.userId, receiverId] }
        });

        if (chat) {
            return res.json(chat);
        }

        // Crear nuevo chat
        chat = new Chat({
            participants: [req.user.userId, receiverId],
            property: propertyId,
            messages: []
        });

        await chat.save();
        res.status(201).json(chat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Enviar un mensaje
router.post('/:id/messages', auth, async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);
        if (!chat) {
            return res.status(404).json({ message: 'Chat no encontrado' });
        }

        // Verificar si el usuario es participante del chat
        if (!chat.participants.some(p => p.toString() === req.user.userId)) {
            return res.status(403).json({ message: 'No autorizado' });
        }

        const message = {
            sender: req.user.userId,
            content: req.body.content
        };

        chat.messages.push(message);
        chat.lastMessage = new Date();
        await chat.save();

        res.status(201).json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router; 