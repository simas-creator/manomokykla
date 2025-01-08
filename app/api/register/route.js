"use server";
import { NextResponse } from 'next/server';
import register from "/action/register";
import User from "@/lib/modals/user";
import connect from '@/lib/mongodb';

export const config = {
    runtime: 'nodejs',
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

        const registrationResult = await register(name, last, email, password);

        if (registrationResult.success) {
            return NextResponse.json({ success: true, message: registrationResult.message }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, message: registrationResult.message }, { status: 500 });
        }

    } catch (error) {
        return NextResponse.json({ error: "Įvyko klaida registruojant vartotoją." }, { status: 500 });
    }
}
