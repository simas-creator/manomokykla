import Teacher from '@/lib/modals/teacher'
import { NextResponse } from 'next/server'

export async function PATCH(req){
    const {searchParams} = new URL(req.url)
    const n = searchParams.get('n')
    const m = searchParams.get('m')
    await Teacher.findOneAndUpdate({n, m}, {
        status: 'ok'
    })
    return NextResponse.json({message: 'success'}, {status: 200})
}