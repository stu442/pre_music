import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface AccessTokenProps {
  access_token: string;
  token_type: string;
  expires_in: number;
}

function useGetAccessToken() {
  const [data, setData] = useState<AccessTokenProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<AccessTokenProps> = await axios.post('https://accounts.spotify.com/api/token', {
          'grant_type': 'client_credentials',
          'client_id': process.env.NEXT_PUBLIC_CLIENT_ID,
          'client_secret': process.env.NEXT_PUBLIC_CLIENT_SECRET,
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        setData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return { data };
}

export default useGetAccessToken;