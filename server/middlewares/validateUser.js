export const validateUser = (req, res, next) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        return res.status(404).json({ message: "All fields are required "})
    }

    next();
}