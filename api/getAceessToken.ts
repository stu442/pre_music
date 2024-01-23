// TODO : 에러 처리 고민해보기

interface AccessTokenProps {
    access_token: string;
    token_type: string;
    expires_in: number;
  }

const API_ENDPOINT = 'https://accounts.spotify.com/api/token';

export const getAccessToken = async (): Promise<AccessTokenProps> => {
  try {
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

    return await response.json();
  } catch (error) {
    throw new Error('Failed to get access token');
  }
};
