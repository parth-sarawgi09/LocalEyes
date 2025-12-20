import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// --- Signup Controller ---
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // 4. Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

//Login Controller----
export const login = async (req, res) => {
  try{
    const {email, password} = req.body;

    // Check if user already exist
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({messsage: "invalid email or password"});
    }

    //compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({message: "invalid email or password"});
    }

    //create JWT token
    const token = jwt.sign(
      {id: user._id, role: user.role},
      process.env.JWT_SECRET,
      {expiresIn: "7d"}
    );

    //send response 
    res.status(200).json({
      message: "Login Successful",
      token,
      user:{
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        verificationTier: user.verificationTier
      },
    });



  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({message: "Server error"});
  }
};