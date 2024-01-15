import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import useGetAccessToken from './useGetAccessToken';

function useFetchSearchData<T>(q:string, type:'artist'|'album'|'track') {
  const [data, setData] = useState<T | null>(null);
  const accessToken = useGetAccessToken();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await axios.get(`https://api.spotify.com/v1/search/?q=${q}&type=${type}`, {
            headers: {
                'Authorization': `Bearer ${accessToken.data}`
            }
        });
        setData(response.data);
      } catch (err) {
        console.error(err)
      }
    };

    fetchData();
  }, [q, type]);

  return { data };
}

export default useFetchSearchData;