import Teacher from "@/lib/modals/teacher";
import connect from "@/lib/mongodb";
import { NextResponse } from "next/server";
const decodeSub = (str) => {
    const stringMap = {
      "biologija": "Biologija",
      "chemija": "Chemija",
      "daile": "Dailė",
      "ekonomika": "Ekonomika",
      "fizika": "Fizika",
      "geografija": "Geografija",
      "informacinestechnologijos": "Informacinės technologijos",
      "istorija": "Istorija",
      "fizinisugdymas": "Fizinis ugdymas",
      "lietuviukalbairliteratura": "Lietuvių kalba ir literatūra",
      "matematika": "Matematika",
      "muzika": "Muzika",
      "technologijos": "Technologijos",
      "anglu": "Anglų",
      "prancuzu": "Prancūzų",
      "rusu": "Rusų",
      "vokieciu": "Vokiečių"
    };
    return stringMap[str] || str
  }
export const GET = async (req, {params}) => {
    await connect();
    try {
        const number = (await params).number;
        const searchParams = req.nextUrl.searchParams;
        const query = Object.fromEntries(searchParams.entries());
        const filter = decodeSub(query['dalykas']);
        let data;
        if(filter) {
            data = await Teacher.find({n, filter})
        } else data = await Teacher.find({n: number});
        if(!data) {
            return NextResponse.json({ message: 'No teacher found' }, { status: 404 });
        }
        return NextResponse.json({data}, { status: 200, 
            headers: {
                "x-next-cache-tags": "teachers"
            },
         });
    } catch (error) {
        console.log("error:", error.message);
        return NextResponse.json(
            { message: "An error occurred while saving teacher data" },
            { status: 500 }
        );
    }
}