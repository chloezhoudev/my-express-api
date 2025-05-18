import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../utils/auth";
import prisma from "../lib/prisma";
import { createError } from "./middleware";

interface JWTUser {
    id: string;
    name: string;
}

export const createJWT = (user: JWTUser) => {
    const token = jwt.sign(
        { id: user.id, username: user.name },
        process.env.JWT_SECRET
    );
    return token;
};

export const protect = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return next(createError("Unauthorized", "auth"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
            return next(createError("Unauthorized", "auth"));
        }
        req.user = decoded;
        next();
    });
}

export const signup = async (req: any, res: any, next: any) => {
    try {
        const { name, email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (user) {
            return next(createError("User already exists", "input"));
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        const token = createJWT(newUser);
        res.status(201).json({ token });
    } catch (error) {
        next(createError("Unable to create user"));
    }
}

export const singin = async (req: any, res: any, next: any) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return next(createError("Invalid email or password", "auth"));
        }
    
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return next(createError("Invalid email or password", "auth"));
        }
    
        const token = createJWT(user);
        res.status(200).json({ token });
    } catch (error) {
        next(createError("Unable to authenticate"));
    }
}