import School from '@/lib/modals/school'
import { NextResponse } from 'next/server';
export async function DELETE(req){
    const {searchParams} = new URL(req.url)
    const n = searchParams.get('n');
    await School.findOneAndDelete({n})
    return NextResponse.json({message: "success"}, {status: 200})
}