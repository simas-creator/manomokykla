import School from '@/lib/modals/school'
import { NextResponse } from 'next/server'

export async function PATCH(req){
    const {searchParams} = new URL(req.url)
    const n = searchParams.get('n')
    await School.findOneAndUpdate({n}, {
        status: 'ok'
    })
    return NextResponse.json({message: 'success'}, {status: 200})
}