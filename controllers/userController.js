import AppError from '../errors/AppError.js';
import prisma from '../prisma-client.js';

/**
* Creates a new user
*/
export const createUser = async (req, res, next) => {
    const { name, email, phone } = req.body;

    if (!name || !email) {
        return next(new AppError('Name and email must not be empty', 422));
    }

    const user = await prisma.user.create({
        data: { name, email, phone: parseInt(phone) }
    });
    res.status(201).json(user);
};

/**
 * Gets all users in the app
 * @returns 
 */
export const getAllUsers = async (req, res, next) => {
    const users = await prisma.user.findMany();
    if (!users) {
        return next(new AppError('Users not found', 404));
    }
    res.status(200).json(users);
};

/**
 * Gets the user with passed id
 * @returns 
 */
export const getUser = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
        where: {id}
    });

    if (!user) {
        return next(new AppError(`User with id ${id} not found`, 404));
    }

    res.status(200).json(user);
};

/**
 * Updates the user with passed id and details
 * @returns 
 */
export const updateUser = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { name, email, phone } = req.body;

    if (!id) {
        return next(new AppError(`Please, pass user id`), 422);
    }

    if (!name || !email) {
        return next(new AppError('Name or email is empty', 422));
    }

    const updatedUser = await prisma.user.update({
        where: { id },
        data: {
            name, 
            email,
            phone: parseInt(phone)
        }
    })

    res.status(200).json(updatedUser);
}