import prisma from '../prisma-client.js';
/**
 * Get all posts
 * @route /api/posts
 */
export const getPosts = async (req, res, next) => {
    const limit = parseInt(req.query.limit);

    if (!isNaN(limit) && limit > 0) {
        const posts_with_limit = await prisma.post.findMany({
            take: limit
        });
        return res
            .status(200)
            .json(posts_with_limit);
    }
    
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
};

/**
 * Get a single post
 * @route /api/posts/:id
 */
export const getPost = async (req, res, next) => {
    const id = parseInt(req.params.id);

    const post = await prisma.post.findUnique({
        where: {
            id: id
        }
    });

    if(!post) {
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
    
    const result = await prisma.post.create({
        data: {
            title: title
        }
    });
    
    let message = 'Error while creating post';
    if(result) {
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
    const post = await prisma.post.findUnique({
        where: {
            id: id
        }
    });

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

    const result = await prisma.post.update({
        where: {
            id: id
        },
        data: {
            title: title
        }
    });

    if(result) {
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
    const post = await prisma.post.findUnique({
        where: {
            id: id
        }
    });

    if(!post) {
        const error = new Error(`Post id ${id} not found`);
        error.status = 404;
        return next(error);
    }

    const result = await prisma.post.delete({
        where: {
            id: id
        }
    });
    if(result) {
        return res.status(201).json({message: 'Post successfully deleted'});
    }
    return res.status(500).json({message: 'Could not delete post'});
};


