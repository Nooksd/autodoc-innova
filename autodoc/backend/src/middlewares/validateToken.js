import jwt from 'jsonwebtoken';

export function validateToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ status: false, message: "Usuário deslogado" });
    }

    jwt.verify(token, 'your-secret-key', (err, user) => {
        if (err) {
            return res.status(403).json({ status: false, message: "Tempo de login expirado" });
        }
        req.user = user;
        next();
    });
}

export function createToken(user) {
    const token = jwt.sign({ user }, "your-secret-key", {
        expiresIn: "5d",
      });
      return token;
}