// TODO : 에러 처리 고민해보기

import { AccessTokenProps, getAccessToken } from "./getAceessToken"

export const fetchTrackData = async (ids:string[] | null) => {
  try {
    const joinedIds = ids ? ids.join(',') : '';
    const API_URL = `https://api.spotify.com/v1/tracks/?ids=${joinedIds}`;
    let accessToken: AccessTokenProps | null = JSON.parse(localStorage.getItem('spotifyAccessToken') || 'null');

    if(accessToken === null) {
      accessToken = await getAccessToken();
    }
    const response = await fetch(API_URL ,{
        headers: {
            'Authorization': `Bearer ${accessToken?.access_token}`
        },
        cache : 'no-store'
    });

    if(response.status === 401) {
      accessToken = await getAccessToken();
      const response = await fetch(API_URL ,{
        headers: {
            'Authorization': `Bearer ${accessToken?.access_token}`
        },
        cache : 'no-store'
    });
    const data = await response.json();
    return data
  }

    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error:', error);
  }
};
