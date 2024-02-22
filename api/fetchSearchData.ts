import { AccessTokenProps, getAccessToken } from "./getAceessToken"

export const fetchSearchData = async (q:string, type:'artist'|'album'|'track', url?:string) => {
  try {
    const API_URL = `https://api.spotify.com/v1/search/?q=${q}&type=${type}`
    let accessToken: AccessTokenProps | null = JSON.parse(localStorage.getItem('spotifyAccessToken') || 'null');

    if(accessToken === null) {
      accessToken = await getAccessToken();
    }

    const response = await fetch(url ? url : API_URL, {
        headers: {
            'Authorization': `Bearer ${accessToken?.access_token}`
        },
        cache : 'no-store'
    });

    if(response.status === 401) {
      accessToken = await getAccessToken();
      const response = await fetch(url ? url : API_URL, {
          headers: {
              'Authorization': `Bearer ${accessToken.access_token}`
          },
          cache : 'no-store'
      });
    const data = await response.json();
    return data
  }

    const data = await response.json();
    return data
  } catch (error) {
    throw new Error("검색 데이터를 불러오는데 실패했습니다.");
  }
}