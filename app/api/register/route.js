"use server";
import { NextResponse } from 'next/server';
import User from "@/lib/modals/user";
import connect from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    await connect();
    try {
        const { name, last, email, password } = await req.json();
        if (!name || !last || !email || !password) {
            return NextResponse.json({ success: false, error: "Visi laukai turi būti užpildyti" }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ success: false, error: "Toks el. paštas jau užregistruotas" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, last, email, password: hashedPassword });
        await newUser.save();

        return NextResponse.json({ success: true, message: "Registracija sėkminga" });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Serverio klaida" }, { status: 500 });
    }
}
