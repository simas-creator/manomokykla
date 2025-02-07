import { NextResponse } from 'next/server';
import Teacher from '@/lib/modals/teacher';
import connect from '@/lib/mongodb';
import School from '@/lib/modals/school';

export const POST = async (req) => {
    try {
        const data = await req.json();
        let { first, surname, subj, n, user} = data;
        console.log(first, surname, subj, n, user);
        if(!first || !surname || !subj) {
            return NextResponse.json({ message: 'Užpildykite privalomus laukelius' }, { status: 400 });
        }
        let imageUrl;
        
        
        const db = await connect();
        rating = parseFloat(rating);

        /// update school rating
        const teacherCount = await db.collection("teachers").countDocuments({ n: n });
        const school = await School.findOne({n: n});
        const schoolR = school.rating;
        const newSchoolR = (schoolR * teacherCount + rating) / (teacherCount + 1);
        await school.updateOne({n: n}, {rating: newSchoolR});
        if (school.type !== "Gimnazija") {
            imageUrl = 'https://mokyklos.s3.eu-north-1.amazonaws.com/mokyklos/graduation-cap-svgrepo-com.svg'
        } else {
            imageUrl = `https://mokyklos.s3.eu-north-1.amazonaws.com/${imgUrl}`;
        }
        const teacher = new Teacher({
            name: first,
            surname,
            rating,
            reviews: [],
            subject,
            imageUrl,
            n
        })
        if (teacherCount < 2) {
            await School.updateOne({n: n}, {
                teachers: [...teacher, teacher]
            })
        }
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