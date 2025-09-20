import colors from 'colors';

/**
 * Middleware to log requests and responses
 */
const logger = (req, res, next) => {
    const methodColors = {
        POST: 'blue',
        GET: 'green',
        PUT: 'black',
        DELETE: 'red'
    };
    const color = methodColors[req.method] || methodColors['white'];
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`[color]);
    next();
};

export default logger;