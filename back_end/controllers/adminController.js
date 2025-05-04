import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// Register the doctor and pharmacist a new user
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if the request body has all required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error); // Log the error
    res.status(500).json({ message: "Server error" });
  }
};
// get all a user
export const SeeAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }


}

// get a single user
export const searchUserByName = async (req, res) => {
  try {
    const { name } = req.query; // Get the name from the query parameters

    if (!name) {
      return res.status(400).json({ message: "Name query parameter is required" });
    }

    const users = await User.find({ name: new RegExp(name, 'i') }); // Case-insensitive search

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users); // Return the found users
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getByRole = async (req, res) => {
  try {
    const { role } = req.query; // Get the role from the query parameters

    if (!role) {
      return res.status(400).json({ message: "Role query parameter is required" });
    }

    const users = await User.find({ role: new RegExp(role, 'i') }); // Case-insensitive search

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users); // Return the found users
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a user



export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the request parameters
    const { oldPassword, newPassword, name, email } = req.body; // Get the required fields from the request body

    // Retrieve the user from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the old password matches
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    // Update the user's data only if provided
    if (newPassword) {
      user.password = await bcrypt.hash(newPassword, 10); // Hash the new password
    }
    user.name = name || user.name; // Update name if provided
    user.email = email || user.email; // Update email if provided

    await user.save(); // Save the updated user data

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    // Check if error is defined and has a message property
    const errorMessage = error?.message || "An unexpected error occurred";
    console.error("Error updating user:", errorMessage);
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};
// Delete a user

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the request parameters

    const deletedUser = await User.findByIdAndDelete(userId); // Delete the user by ID

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" }); // Return success message
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// Login a user
