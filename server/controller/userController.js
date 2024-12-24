import Users from "../models/users.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new Users({
      name: name,
      email: email,
      password: password,
    });
    await newUser.save();

    res.status(200).json({ message: "Signup successful", user: newUser });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "An error occured while signing up " });
  }
};
