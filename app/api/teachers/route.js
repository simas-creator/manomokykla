import { NextResponse } from 'next/server';
import Teacher from '@/lib/modals/teacher';
import connect from '@/lib/mongodb';
import { revalidateTag } from 'next/cache';

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

        const teacherCount = await Teacher.countDocuments({ n });

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
            case 'Muzika':
                imageUrl = "https://mokyklos.s3.eu-north-1.amazonaws.com/mokyklos/mokytojai/muzika.png";
                break;
            case 'Informacinės technologijos':
                imageUrl = "https://mokyklos.s3.eu-north-1.amazonaws.com/mokyklos/mokytojai/IT.png";
                break;
            case 'Lietuvių kalba ir literatūra':
                imageUrl = "https://mokyklos.s3.eu-north-1.amazonaws.com/mokyklos/mokytojai/ltkalba.png";
                break;
            case 'Anglų':
                imageUrl = "https://mokyklos.s3.eu-north-1.amazonaws.com/mokyklos/mokytojai/anglu.png";
                break;
            case 'Istorija':
                imageUrl = "https://mokyklos.s3.eu-north-1.amazonaws.com/mokyklos/mokytojai/istorija.png";
                break;
            case 'Fizinis ugdymas (kūno kultūra)': 
                imageUrl = "https://mokyklos.s3.eu-north-1.amazonaws.com/mokyklos/mokytojai/fizinisugdymas.png";
                break;
            case 'Geografija':
                imageUrl = "https://mokyklos.s3.eu-north-1.amazonaws.com/mokyklos/mokytojai/geografija.png";
                break;
            case 'Vokiečių':
                imageUrl = "https://mokyklos.s3.eu-north-1.amazonaws.com/mokyklos/mokytojai/vokieciu.png";
                break;
            case 'Rusų':
                imageUrl = "https://mokyklos.s3.eu-north-1.amazonaws.com/mokyklos/mokytojai/rusu.png";
                break;
            case 'Prancūzų':
                imageUrl = "https://mokyklos.s3.eu-north-1.amazonaws.com/mokyklos/mokytojai/prancuzu.png";
                break;
            case 'Ekonomika':
                imageUrl = "https://mokyklos.s3.eu-north-1.amazonaws.com/mokyklos/mokytojai/ekonomika.png";
                break;
            case 'Technologijos':
                imageUrl = "https://mokyklos.s3.eu-north-1.amazonaws.com/mokyklos/mokytojai/technologijos.png";
                break;
            case 'Dailė':
                imageUrl = "https://mokyklos.s3.eu-north-1.amazonaws.com/mokyklos/mokytojai/dail.png";
                break;
            default:
                imageUrl = "https://mokyklos.s3.eu-north-1.amazonaws.com/mokyklos/mokytojai/profesorius.png";
                break;
        }
        

        const teacher = new Teacher({
            name: first,
            surname,
            rating: '0.0',
            reviews: [],
            subject: subj,
            imageUrl,
            n, // school identifier
            m: teacherCount + 1, // teacher identifier
            user,
            status: "pending",
        });

        await teacher.save();
        revalidateTag('teachers');
        return NextResponse.json({ message: 'Mokytojas pridetas' }, { status: 200 });
    } catch (error) {
        console.log("error:", error.message);
        return NextResponse.json(
            { message: "An error occurred while saving teacher data" },
            { status: 500 }
        );
    }
};