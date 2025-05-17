import School from "@/lib/modals/school"
import connect from "@/lib/mongodb"
export async function GET() {
    await connect()
    const schools = await School.find({}, {url: 1})
    return NextResponse.json({schools}, {status: 200})
}