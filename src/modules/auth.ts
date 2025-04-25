import jwt from "jsonwebtoken";

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