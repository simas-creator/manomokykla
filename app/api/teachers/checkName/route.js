import Teacher from '@/lib/modals/teacher';
import connect from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
    await connect()
  const data = await req.json();
  const { name, surname, schoolId } = data;

  const teacher = await Teacher.findOne({ name, surname, school_id: schoolId });

  if (teacher) {
    return NextResponse.json(
      { message: "Mokytojas jau egzistuoja" },
      { status: 400 }
    );
  } else {
    return NextResponse.json(
      { message: "Mokytojas neegzistuoja" },
      { status: 200 }
    );
  }
};
