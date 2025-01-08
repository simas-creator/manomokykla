"use server";
import { NextResponse } from 'next/server';
import User from "@/lib/modals/user";
import connect from '@/lib/mongodb';
import bcrypt from 'bcryptjs'

export const config = {
    runtime: 'nodejs', // Correct way to specify runtime
};
export async function POST(req) {
    await connect();
    try {
        const { name, last, email, password } = await req.json();
        if (!name || !last || !email || !password) {
            return NextResponse.json({ error: "Visi laukai turi būti užpildyti" }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "Toks el. paštas jau užregistruotas" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({name, last, email, password: hashedPassword});
        await user.save();
        return NextResponse.json({success: true, message: "Vartotojas užregistruotas"}, {status: 200})
    } catch (error) {
        return NextResponse.json({ error: "Įvyko klaida registruojant vartotoją." }, { status: 500 });
    }
}
