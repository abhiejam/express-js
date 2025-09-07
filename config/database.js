const user = process.env.USER;
const password = process.env.PASSWORD;

const config = {
    db: {
        host: 'localhost',
        user,
        password,
        database: 'express_app'
    }
};

export default config;