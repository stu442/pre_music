// TODO : API , HOOK 정리하기
// TODO : 에러 처리 고민해보기
// TODO : 캐시 되는지 안되는지 확인

import { getAccessToken } from "./getAceessToken"

export const fetchSearchData = async (q:string, type:'artist'|'album'|'track') => {
  try {
    let accessToken = await getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search/?q=${q}&type=${type}`, {
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
