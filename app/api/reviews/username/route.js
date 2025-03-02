import User from '@/lib/modals/user';
import connect from '@/lib/mongodb';
import { NextResponse } from 'next/server';
export async function GET(req) {
    const {searchParams} = new URL(req.url);
    const email = searchParams.get('email');
    try {
        await connect();
        const user = await User.findOne({email});
        if(user) {
            return NextResponse.json(user, {status: 200})
            
        }
        else return NextResponse.json({message: 'User not found'}, {status: 404})
    } catch (error) {
        console.log('error', error)
        return NextResponse.json({message: error}, {status: 500})
    }
  }
  