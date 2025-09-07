import { query } from '../services/db.js';

/**
 * Get all posts
 * @route /api/posts
 */
export const getPosts = async (req, res, next) => {
    const limit = parseInt(req.query.limit);
    const posts = await query(`SELECT id, title FROM posts`);

    if (!isNaN(limit) && limit > 0) {
        const posts_with_limit = await query(
            `SELECT id, title FROM posts limit ${limit}`
        );
        return res
            .status(200)
            .json(posts_with_limit);
    }
    
    res.status(200).json(posts);
};

/**
 * Get a single post
 * @route /api/posts/:id
 */
export const getPost = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = await query(`SELECT * from posts WHERE id=${id}`);

    if(post.length === 0) {
        const error = new Error(`Post with id ${id} not found`);
        error.status = 404;
        return next(error);  
    }
    res.status(200).json(post);
};

/**
 * Create a single post
 * @route /api/posts/:id
 */
export const createPost = async (req, res, next) => {
    const title = req.body.title;

    if(!title) {
        const error = new Error('Please include title');
        error.status = 400;
        return next(error);
    }
    
    const result = await query(
        `INSERT INTO posts
        (title)
        VALUES ('${title}')`
    );
    
    let message = 'Error while creating post';
    if(result.affectedRows) {
        message = 'Post successfully created';
    }

    res.status(201).json({message});
};

/**
 * Update single post
 * @route /api/posts/:id
 */

export const updatePost = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = await query(`SELECT * from posts WHERE id=${id}`);

    if(!post) {
        const error = new Error(`Post id ${id} not found`);
        error.status = 404;
        return next(error);
    }

    const title = req.body.title;
    if(!title) {
        const error = new Error(`Please include title`);
        error.status = 400;
        return next(error);
    }

    const result = await query(
        `UPDATE posts
        set title = '${title}'
        WHERE id = ${id}`
    );

    if(result.affectedRows) {
        return res.status(201).json({message: 'Post successfully updated'});
    }
    return res.status(404).json({message: 'Could not update post'});
};

/**
 * Delete a single post
 * @route /api/posts/:id
 */
export const deletePost = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = await query(`SELECT * from posts WHERE id=${id}`);;

    if(!post) {
        const error = new Error(`Post id ${id} not found`);
        error.status = 404;
        return next(error);
    }

    const result = await query(`DELETE from posts where id=${id}`);;
    if(result.affectedRows) {
        return res.status(201).json({message: 'Post successfully deleted'});
    }
    return res.status(500).json({message: 'Could not delete post'});
};


