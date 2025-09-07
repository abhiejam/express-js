
let posts = [
    {id: 1, title: 'First post'},
    {id: 2, title: 'Second post'},
    {id: 3, title: 'Third post'},
];

/**
 * Get all posts
 * @route /api/posts
 */
export const getPosts = (req, res, next) => {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
        const posts_with_limit = posts.slice(0, limit);
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
export const getPost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.filter((post) => post.id === id);

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
export const createPost = (req, res, next) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title
    };

    if(!newPost.title) {
        const error = new Error('Please include title');
        error.status = 400;
        return next(error);
    }
    posts.push(newPost);
    res.status(201).json(posts);
};

/**
 * Update single post
 * @route /api/posts/:id
 */

export const updatePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => id === post.id);

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

    post.title = title;
    res.status(201).json(posts);
};

/**
 * Delete a single post
 * @route /api/posts/:id
 */
export const deletePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => id === post.id);

    if(!post) {
        const error = new Error(`Post id ${id} not found`);
        error.status = 404;
        return next(error);
    }

    const updated_posts = posts.filter((post) => id !== post.id);
    posts = updated_posts;

    return res.status(201).json(posts);
};


