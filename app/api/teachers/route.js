import { NextResponse } from 'next/server';
import Teacher from '@/lib/modals/teacher';
import connect from '@/lib/mongodb';
import School from '@/lib/modals/school';

export const POST = async (req) => {
    try {
        const data = await req.json();
        let { first, surname, rating, review, subject, imgUrl, n} = data
        console.log(first, surname, rating, review, subject, imgUrl, n);
        if(!first || !surname || !subject) {
            return NextResponse.json({ message: 'Užpildykite privalomus laukelius' }, { status: 400 });
        }
        let imageUrl;
        if(!imgUrl) {
            imageUrl = 'https://mokyklos.s3.eu-north-1.amazonaws.com/mokytojai/teacher.svg'
        } else {
            imageUrl = `https://mokyklos.s3.eu-north-1.amazonaws.com/${imgUrl}`;
        }
        
        const db = await connect();
        rating = parseFloat(rating);

        /// update school rating
        const teacherCount = await db.collection("teachers").countDocuments({ n: n });
        const school = await School.findOne({n: n});
        const schoolR = school.rating;
        const newSchoolR = (schoolR * teacherCount + rating) / (teacherCount + 1);
        await School.updateOne({n: n}, {rating: newSchoolR});
        
        const teacher = new Teacher({
            name: first,
            surname,
            rating,
            comment: review,
            subject,
            imageUrl,
            n
        })
        await teacher.save();

        return NextResponse.json({ message: 'Mokytojas pridetas' }, { status: 200 });
    } catch (error) {
        console.log("error:", error.message);
        return NextResponse.json(
            { message: "An error occurred while saving teacher data" },
            { status: 500 }
        );
        
    }
    
}