"use server";
import User from "@/lib/modals/user"; // Ensure the path is correct
import connect from "@/lib/mongodb";
import bcrypt from "bcrypt";

const register = async (name, last, email, password) => {
    try {
        // Establish a database connection
        await connect();
        // Validate input
        if (!name || !last || !email || !password) {
            throw new Error("All fields are required.");
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return {error, message: "Vartotojas su šiuo el.paštu jau egzistuoja." };
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        console.log(last)
        const user = new User({ name, last, email, password: hashedPassword });
        await user.save();

        return { success: true, message: "Vartotojas sėkmingai sukurtas." };
    } catch (error) {
        console.log("Error during user registration:", error.message);
        return { success: false, message: "Įvyko klaida registruojant vartotoją." };
    }
};

export default register;
