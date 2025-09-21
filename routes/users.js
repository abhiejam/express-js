import express from 'express';
const router = express.Router();

import { createUser, getAllUsers, getUser, updateUser } from '../controllers/userController.js';

router.post('/', createUser);

router.get('/', getAllUsers);

router.get('/:id', getUser);

router.put('/:id', updateUser);

export default router;

