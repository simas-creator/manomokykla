import User from '@/lib/modals/user'
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

        ///fetch reviews
        const block = await User.findOne({email})
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
        return NextResponse.json({data: {reviews, schools, teachers, reviewsNames}}, {status: 200})
    } catch (error) {
        console.log(error, 'error')
        return NextResponse.json({message: 'failed to fetch'}, {status: 500})
    }
    
}