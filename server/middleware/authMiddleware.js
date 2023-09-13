import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({ message: "No authentication token" })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        req.user = decoded

        next()
    } catch (error) {
        return res.status(401).json({ message: "Authentication failed" })
    }
}

export default authMiddleware