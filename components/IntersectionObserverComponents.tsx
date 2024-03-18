// TODO : 반드시 한번 공부할 것

import React, { useCallback, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { loadingState, musicListState, nextLinkState, base64State } from './MusicList';
import { fetchSearchData } from '@/api/fetchSearchData';
import { imgTobase64s } from '@/app/action';


const IntersectionObserverComponent: React.FC = () => {

  const [musicList, setMusicList] = useRecoilState(musicListState);
  const [nextLink, setNextLink] = useRecoilState(nextLinkState);
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  const [base64, setBase64] = useRecoilState(base64State);
  
  const targetRef = useRef<HTMLDivElement | null>(null);

  const fetchMore = useCallback(async () => {
    if (nextLink) {
        setIsLoading(true)
        // TODO : q, type 은 없어도 되는데 왜 있어야하지?? 고치자.
        const { tracks } = await fetchSearchData("안녕", 'track', nextLink);
        setMusicList(musicList.concat(tracks.items));
        setNextLink(tracks.next);
        setIsLoading(false)
        const base64s = await imgTobase64s(tracks.items);
        setBase64(pre => pre.concat(base64s))
    }
}, [musicList, nextLink, setMusicList, setNextLink, setIsLoading, setBase64]);

  
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

  const currentTargetRef = targetRef.current;

  if (currentTargetRef) {
    observer.observe(currentTargetRef);
  }

  return () => {
    if (currentTargetRef) {
      observer.unobserve(currentTargetRef);
    }
  };
}, [fetchMore]);


  return (
    <div ref={targetRef} style={{ height: '100px' }}>
    </div>
  );
};

export default IntersectionObserverComponent;