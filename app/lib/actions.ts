'use server';

import { cookies } from 'next/headers';


export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
    const jar = await cookies();       // ✅ await
    jar.set('session_userid', userId, { // how long storing userid in cookie
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/'
    });


    jar.set('session_access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60,
        path: '/'
    });

    jar.set('session_refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/'
    });
}

export async function resetAuthCookies() {
    const jar = await cookies();       // ✅ await
    jar.set('session_userid', '');
    jar.set('session_access_token', '');
    jar.set('session_refresh_token', '');

}

export async function getUserId() {
    // const userId = cookies().get('session_userid')?.value
    // return userId ? userId : null
    const jar = await cookies();                 // ✅ await
    return jar.get('session_userid')?.value ?? null;
}