import { NextResponse } from 'next/server';
import Teacher from '@/lib/modals/teacher';
import connect from '@/lib/mongodb';

export const POST = async (req) => {
    try {
        const data = await req.json();
        const { first, surname, rating, review, subject, imgUrl, n} = data
        if(!first || !surname || !subject) {
            return NextResponse.json({ message: 'Užpildykite privalomus laukelius' }, { status: 400 });
        }
        let imageUrl;
        if(!imgUrl) {
            imageUrl = 'https://mokyklos.s3.eu-north-1.amazonaws.com/mokytojai/teacher.svg'
        } else {
            imageUrl = `https://mokyklos.s3.eu-north-1.amazonaws.com/${imgUrl}`;
        }
        
        await connect();

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