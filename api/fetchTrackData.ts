// TODO : 에러 처리 고민해보기

import { getAccessToken } from "./getAceessToken"

export const fetchTrackData = async (id:string) => {
  try {
    const API_URL = `https://api.spotify.com/v1/tracks/${id}`
    let accessToken = await getAccessToken();
    const response = await fetch(API_URL ,{
        headers: {
            'Authorization': `Bearer ${accessToken.access_token}`
        },
        cache : 'no-store'
    });
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error:', error);
  }
};
