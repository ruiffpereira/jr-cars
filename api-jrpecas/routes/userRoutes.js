const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para listar todos os usuários
router.get('/', userController.getAllUsers);

// Rota para criar um novo usuário
router.post('/', userController.createUser);

// Rota para obter um usuário pelo Email
router.get('/:id', userController.getUserByEmail);

module.exports = router;