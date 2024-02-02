// TODO : 에러 처리 고민해보기
// TODO : 리펙토링 무조건 하기

export interface AccessTokenProps {
    access_token: string;
    token_type: string;
    expires_in: number;
  }

const API_ENDPOINT = 'https://accounts.spotify.com/api/token';

export const getAccessToken = async (): Promise<AccessTokenProps> => {
  try {
    console.log("Access Token request!!")
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'grant_type': 'client_credentials',
        'client_id': process.env.NEXT_PUBLIC_CLIENT_ID as string,
        'client_secret': process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
      }),
      cache : 'no-store'
    });
    if (!response.ok) {
      throw new Error('Failed to get access token');
    }
    const accessToken = await response.json();
    localStorage.setItem('spotifyAccessToken', JSON.stringify(accessToken));
    return accessToken
  } catch (error) {
    throw new Error('Failed to get access token');
  }
};
