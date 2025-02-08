import { NextResponse } from 'next/server';
import Teacher from '@/lib/modals/teacher';
import connect from '@/lib/mongodb';
import School from '@/lib/modals/school';

export const POST = async (req) => {
    try {
        const data = await req.json();
        let { first, surname, subj, n, user } = data;
        console.log(first, surname, subj, n, user);
        if (!first || !surname || !subj) {
            return NextResponse.json({ message: 'Užpildykite privalomus laukelius' }, { status: 400 });
        }
        let imageUrl;

        await connect();

        const teacherCount = await Teacher.countDocuments({ n: n });

        switch (subj) {
            case 'Biologija':
                imageUrl = "https://mokyklos.s3.eu-north-1.amazonaws.com/mokyklos/mokytojai/biologija.png";
                break;
            case 'Chemija':
                imageUrl = "https://mokyklos.s3.eu-north-1.amazonaws.com/mokyklos/mokytojai/chemija.png";
                break;
            case 'Fizika':
                imageUrl = "https://mokyklos.s3.eu-north-1.amazonaws.com/mokyklos/mokytojai/fizika.png";
                break;
            case 'Matematika':
                imageUrl = "https://mokyklos.s3.eu-north-1.amazonaws.com/mokyklos/mokytojai/matematika.png";
                break;
            case 'Informatika':
                imageUrl = "https://mokyklos.s3.eu-north-1.amazonaws.com/mokyklos/mokytojai/IT.png";
                break;
            case 'Lietuvių kalba':
                imageUrl = "https://mokyklos.s3.eu-north-1.amazonaws.com/mokyklos/mokytojai/ltkalba.png";
                break;
            case 'Anglų kalba':
                imageUrl = "https://mokyklos.s3.eu-north-1.amazonaws.com/mokyklos/mokytojai/anglu.png";
                break;
            case 'Istorija':
                imageUrl = "https://mokyklos.s3.eu-north-1.amazonaws.com/mokyklos/mokytojai/istorija.png";
                break;
            case 'Geografija':
                imageUrl = "https://mokyklos.s3.eu-north-1.amazonaws.com/mokyklos/mokytojai/geografija.png";
                break;
            case 'Kūno kultūra':
                imageUrl = "https://mokyklos.s3.eu-north-1.amazonaws.com/mokyklos/mokytojai/fizinisugdymas.png";
                break;
            default:
                imageUrl = "https://mokyklos.s3.eu-north-1.amazonaws.com/mokyklos/mokytojai/profesorius.png";
                break;
        }
        

        const teacher = new Teacher({
            name: first,
            surname,
            rating: 0,
            reviews: [],
            subject: subj,
            imageUrl,
            n, // school identifier
            m: teacherCount + 1, // teacher identifier
            user,
        });

        if (teacherCount < 2) {
            await School.updateOne({ n: n }, { $push: { teachers: teacher } });
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
};