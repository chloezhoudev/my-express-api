import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "@/utils/auth";
import prisma from "@/lib/prisma";

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
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = decoded;
        next();
    });
}

export const signup = async (req: any, res: any) => {
    const { name, email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
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
}

export const singin = async (req: any, res: any) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = createJWT(user);
    res.status(200).json({ token });
}