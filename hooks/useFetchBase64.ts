import { useState, useEffect } from 'react';
import { errorToast } from '@/components/ui/use-toast';
import { imgTobase64s } from '@/app/action';

export const useFetchBase64s = (trackData : SpotifyTracks | undefined) => {
  const [base64, setBase64] = useState<string[]>([]);

  useEffect(() => {
    const fetchBase64s = async () => {
      try {
        if(trackData) {
          const base64s = await imgTobase64s(trackData.tracks);
          setBase64(base64s);
        }
      } catch(error) {
        errorToast(error)
      }
    };

    fetchBase64s();
  }, [trackData]);

  return base64;
};
