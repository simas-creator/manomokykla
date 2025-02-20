import connect from "@/lib/mongodb";
import { NextResponse } from "next/server";
import School from "@/lib/modals/school";

// Decode Lithuanian characters in query parameters
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
  
  // Convert searchParams to an object and decode values
  const queries = Object.fromEntries([...searchParams]);
  
  // Decode Lithuanian characters in query parameters
  const decodedQueries = {};
  let filter = {};
  for (let key in queries) {
    if(key === 'ivertinimai') {
      filter[key] = queries[key];
      continue;
    }
    const decodedKey = decodeLithuanianChars(key);  // Decode the key
    const decodedValue = decodeLithuanianChars(queries[key]);
    decodedQueries[decodedKey] = decodedValue;  // Store the new key-value pair
  } 
  
  try {
    await connect();
    
    let schools;
    if (Object.keys(decodedQueries).length > 0) {
      schools = await School.find(decodedQueries)
      schools.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      schools = await School.find();
      schools.sort((a, b) => a.name.localeCompare(b.name));
    }

    if(Object.keys(filter).length > 0) {
      for(let key in filter) {
        if(filter[key] === 'nuoauksciausio') {
          schools = schools.sort((a, b) => b.rating - a.rating)
        } if(filter[key] === 'nuozemiausio') {
          schools = schools.sort((a, b) => a.rating - b.rating)
        }
      }
    }
    
    return new NextResponse(JSON.stringify(schools), {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate", 
        "x-next-cache-tags": "schools"
      },
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return NextResponse.json({ error: "Error connecting to MongoDB" }, { status: 500 });
  }
};
