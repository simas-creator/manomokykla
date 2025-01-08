"use server";
import { NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import User from "@/lib/modals/user"; // Adjust the path to your user model
import bcrypt from "bcryptjs";


export const config = {
    runtime: 'nodejs',
  };
  
export async function POST(req) {
    await connect();

    try {
        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ error: "Visi laukai turi būti užpildyti" }, { status: 400 });
        }

        // Find user in the database
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "Netinkami prisijungimo duomenys." }, { status: 401 });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Netinkami prisijungimo duomenys." }, { status: 401 });
        }

        // Successful login
        return NextResponse.json({ success: true, message: "Prisijungimas sėkmingas." }, { status: 200 });

    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ error: "Įvyko klaida prijungiant vartotoją." }, { status: 500 });
    }
}