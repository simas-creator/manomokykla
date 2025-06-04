import School from '@/lib/modals/school';
import connect from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
    await connect()
  const data = await req.json();
  const { url } = data;

  const school = await School.findOne({ url });

  if (school) {
    return NextResponse.json(
      { message: "Mokykla jau egzistuoja" },
      { status: 400 }
    );
  } else {
    return NextResponse.json(
      { message: "Mokykla neegzistuoja" },
      { status: 200 }
    );
  }
};
