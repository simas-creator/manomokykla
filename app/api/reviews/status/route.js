import { NextResponse } from "next/server";
import Review from "@/lib/modals/review";
export async function PATCH(req) {
    const {searchParams} = new URL(req.url);
    const status = searchParams.get('s')
    const n = searchParams.get('n')
    const m = searchParams.get('m')
    const r = searchParams.get('r')

    if(status === 'ok') {
        await Review.findOneAndUpdate({n, m,r }, {
            status: "ok"
        })
    } else {
         await Review.findOneAndUpdate({n, m,r }, {
            status: "pending"
        })
    }
    return NextResponse.json({message: "success"}, {status: 200})
}