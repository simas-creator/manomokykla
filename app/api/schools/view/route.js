import connect from "@/lib/mongodb";
import { NextResponse } from "next/server";
import School from "@/lib/modals/school";

const decodeLithuanianChars = (str) => {
  const wordMap = {
    "alytaus": "Alytaus",
    "kauno": "Kauno",
    "klaipedos": "Klaipėdos",
    "marijampoles": "Marijampolės",
    "panevezio": "Panevėžio",
    "siauliu": "Šiaulių",
    "taurages": "Tauragės",
    "telsiu": "Telšių",
    "utenos": "Utenos",
    "vilniaus": "Vilniaus",
    "gimnazija": "Gimnazija",
    "universitetas": "Universitetas",
    "profesinemokykla": "Profesinė mokykla",
    "tipas": "type"
  };

  return wordMap[str] || str;
};

export const GET = async (req) => {
  const searchParams = req.nextUrl.searchParams;
  const queries = Object.fromEntries([...searchParams]);
  let filter = {};
  let page = parseInt(queries.pages) || 1;
  const limit = 6;
  const skip = (page - 1) * limit;

  const ivertinimai = queries.ivertinimai;
  delete queries.ivertinimai;

  for (let key in queries) {
    if (key === "pages") continue;

    const decodedKey = decodeLithuanianChars(key);
    const decodedValue = decodeLithuanianChars(queries[key]);
    filter[decodedKey] = decodedValue;
  }

  try {
    await connect();

    let schoolsQuery = School.find(filter);

    if (ivertinimai === 'nuoauksciausio') {
      schoolsQuery = schoolsQuery.sort({ rating: -1 }).skip(skip).limit(limit);
    } else if (ivertinimai === 'nuozemiausio') {
      schoolsQuery = schoolsQuery.sort({ rating: 1 }).skip(skip).limit(limit);
    } else {
      schoolsQuery = schoolsQuery.sort({ name: 1 }).skip(skip).limit(limit);
    }

    const schools = await schoolsQuery;

    return new NextResponse(JSON.stringify(schools), {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
        "x-next-cache-tags": "schools"
      },
    });

  } catch (error) {
    console.error("Error fetching schools:", error);
    return NextResponse.json({ error: "Error fetching schools" }, { status: 500 });
  }
};