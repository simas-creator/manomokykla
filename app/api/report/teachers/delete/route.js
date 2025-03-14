import TeacherReport from '@/lib/modals/teacherReport'
import { NextResponse } from 'next/server'

export async function DELETE(req) {
    try {
        const {searchParams} = new URL(req.url)
        const user = searchParams.get('user')
        const n = searchParams.get('n')
        const m = searchParams.get('m')
        await TeacherReport.findOneAndDelete({school: n, teacher: m, user})
        return NextResponse.json({message: 'success'}, {status: 200})
    } catch (error) {
        console.log(error, 'error')
        return NextResponse.json({message: 'failure'}, {status: 500})

    }


}