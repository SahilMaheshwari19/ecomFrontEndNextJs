import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const jwt = request.cookies.get('jwtToken')?.value;
    const { pathname } = request.nextUrl;

    //SKIP MIDDLEWARE LOGIC FOR login and resigter
    if (pathname.startsWith('/login') || pathname.startsWith('/register')){
        return NextResponse.next();
    }
    
    //Protect routes
    const protectedPaths = ['/', '/add-product', '/cart', '/ProductDetails', '/wishlist', 'update-product'];
    const isProtected = protectedPaths.some((path) => 
        pathname.startsWith(path)
    );
    if (isProtected && !jwt) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next(); 
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'], 
    // ✅ Compatible, simple exclusion of static/image/favicon
};
