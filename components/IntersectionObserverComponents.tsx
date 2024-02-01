// STUDY : 반드시 한번 공부할 것

import React, { useCallback, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { loadingState, musicListState, nextLinkState } from './MusicList';
import { fetchSearchData } from '@/api/fetchSearchData';


const IntersectionObserverComponent: React.FC = () => {

  const [musicList, setMusicList] = useRecoilState(musicListState);
  const [nextLink, setNextLink] = useRecoilState(nextLinkState);
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  
  const targetRef = useRef<HTMLDivElement | null>(null);

  const fetchMore = useCallback(async () => {
    if (nextLink) {
        setIsLoading(true)
        const { tracks } = await fetchSearchData("안녕", 'track', nextLink);
        setMusicList(musicList.concat(tracks.items));
        setNextLink(tracks.next);
        setIsLoading(false)
    }
}, [musicList, nextLink, setMusicList, setNextLink, setIsLoading]);

  
  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const callback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchMore();
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [fetchMore]); // 한 번만 실행

  return (
    <div ref={targetRef} style={{ height: '100px' }}>
    </div>
  );
};

export default IntersectionObserverComponent;