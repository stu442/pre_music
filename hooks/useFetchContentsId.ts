import { useState, useEffect } from 'react';
import { supabase } from '@/lib/utils';
import { errorToast } from '@/components/ui/use-toast';

interface ContentsItem {
    contents_id: string
}

type MusicType = 'ADMIN' | 'RECENT' | 'MOSTLIKED'
  
export const useFetchContentsId = (type : MusicType) => {
  const FETCHNUM = 10
  const [contentsId, setContentsId] = useState<string[]>([])

  function extractedIds(data : ContentsItem[]) {
    if(data === null) {
      return []
    }
    const extractedData = data.map(item => item.contents_id);
    return extractedData
  }

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        let data, error;
        switch (type) {
          case 'ADMIN':
            ({ data, error } = await supabase
              .from('ADMIN_LIKES')
              .select('contents_id')
              .order('liked_at', { ascending: false })
              .limit(FETCHNUM));
            break;
          case 'RECENT':
            ({ data, error } = await supabase
              .from('LIKES')
              .select('contents_id')
              .order('liked_at', { ascending: false })
              .limit(FETCHNUM));
            break;
          case 'MOSTLIKED':
            ({ data, error } = await supabase
              .rpc('get_most_liked_contents')
              .limit(FETCHNUM));
            break;
          default:
            throw new Error('Invalid type');
        }
        if (error) {
          throw new Error('음악을 불러오는데 실패했습니다.');
        }
        setContentsId(extractedIds(data));
      } catch (error) {
        errorToast(error)
      }
    };

    fetchMusic();
  }, [type]);

  return { contentsId };
};
