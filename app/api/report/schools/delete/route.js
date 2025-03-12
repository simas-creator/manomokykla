import SchoolReport from '@/lib/modals/schoolReport'
import { NextResponse } from 'next/server'

export async function DELETE(req) {
    try {
        const {searchParams} = new URL(req.url)
        const user = searchParams.get('user')
        const n = searchParams.get('n')
        await SchoolReport.findOneAndDelete({school: n, user})
        return NextResponse.json({message: 'success'}, {status: 200})
    } catch (error) {
        console.log(error, 'error')
        return NextResponse.json({message: 'failure'}, {status: 500})

    }


}