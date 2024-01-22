// TODO : 에러 처리 고민해보기

import { getAccessToken } from "./getAceessToken"

export const fetchSearchData = async (q:string, type:'artist'|'album'|'track', url?:string) => {
  try {
    let accessToken = await getAccessToken();
    const API_URL = `https://api.spotify.com/v1/search/?q=${q}&type=${type}`
    const response = await fetch(url ? url : API_URL, {
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
