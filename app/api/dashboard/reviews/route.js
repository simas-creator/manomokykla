import Teacher from '@/lib/modals/teacher'
import { NextResponse } from 'next/server';
export async function GET(req) {
    const {searchParams} = new URL(req.url);
    const n = searchParams.get('n');
    const m = searchParams.get('m');
    const teacher = await Teacher.findOne({n, m});
    return NextResponse.json({teacher}, {status: 200})
}