import School from '@/lib/modals/school'
import Teacher from '@/lib/modals/teacher'
import Review from '@/lib/modals/review'
import { NextResponse } from 'next/server';
import connect from '@/lib/mongodb'
export async function GET(req) {
    try {
        await connect();
        const {searchParams} = new URL(req.url);
        const email = searchParams.get('email')

        const username = block.username;
        const reviews = await Review.find({user: username})
        let reviewsNames = {}
        await Promise.all(
            reviews.map(async (r) => {
              const teacher = await Teacher.findOne({ m: r.m, n: r.n });
              if (teacher) {
                reviewsNames[`${r.n}-${r.m}`] = `${teacher.name} ${teacher.surname}`;
              }
            })
          );
          console.log(reviewsNames)
        ///fetch schools
        const schools = await School.find({user: email})

        ///fetch teachers
        const teachers = await Teacher.find({user: email})

        const confTeachers = teachers.filter((t) => t.status === 'ok')
        const confSchools = schools.filter((t) => t.status === 'ok')
        const confReviews = reviews.filter((t) => t.status === 'ok')

        const pendTeachers = teachers.filter((t) => t.status === 'pending')
        const pendSchools = schools.filter((t) => t.status === 'pending')
        const pendReviews = reviews.filter((t) => t.status === 'pending')

        return NextResponse.json({data: {confTeachers, confSchools, confReviews, pendTeachers, pendSchools, pendReviews, reviewsNames, role: 'notadmin'}}, {status: 200})
    } catch (error) {
        console.log(error, 'error')
        return NextResponse.json({message: 'failed to fetch'}, {status: 500})
    }
    
}