import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export default async function  middleware(request: Request){
    const cookieStore = await cookies();
    const token = cookieStore.get('jwt');

    if(!token){
        return NextResponse.redirect(new URL('/login',request.url))
    }

    return NextResponse.next();
}

export const configAuth = {
    matcher: ['/home_page','profile']
}