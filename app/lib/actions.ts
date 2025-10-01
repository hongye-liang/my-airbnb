'use server';

import { cookies } from 'next/headers';

export async function handleRefresh(){
    console.log('handleRefresh');

    const refreshToken = await getRefreshToken();

    const token = await fetch('http://localhost:8000/api/auth/token/refresh/', {
        method: 'POST',
        body: JSON.stringify({
            refresh: refreshToken
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        
    })
        .then(response => response.json())
        .then((json) => {
            console.log('Response - Refresh:', json);

            if (json.access) {
                cookies().set('session_access_token', json.access, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60,
                    path: '/'
                });

                return json.access;

            } else {
                resetAuthCookies();
            }
        })
        .catch((error) => {
            console.log('error', error);

            resetAuthCookies();
        })

    return token;
}


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

export async function getAccessToken() {
    let accessToken = await cookies();

    if (!accessToken) {
        accessToken = await handleRefresh();
    }

    return accessToken.get('session_access_token')?.value;
    // let accessToken = cookies().get('session_access_token')?.value;
    // return accessToken;
}

export async function getRefreshToken() {
    let refreshToken = await cookies();
    return refreshToken.get('session_refresh_token')?.value;
    // let accessToken = cookies().get('session_access_token')?.value;
    // return accessToken;
}