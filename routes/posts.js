import express from 'express';
const router = express.Router();
import { getPost, createPost, updatePost, deletePost, getPosts } from '../controllers/postController.js';

// Get all posts
router.get('/', getPosts);

// Get single post
router.get('/:id', getPost);

// Create single post
router.post('/', createPost);

// Update a single post
router.put('/:id', updatePost);

// Delete a single post
router.delete('/:id', deletePost);

export default router;