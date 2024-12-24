import { useEffect, useRef } from 'react';

export const useOutsideClick = (handler, listenCapturing = true) => {
  const ref = useRef();
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        console.log('clicked outside');
        handler();
      }
    }

    // passing 'true' here will handle the event in the capturing phase instead of the bubbling phase
    // this way we prevent accidental closing of the modal at the moment of opening
    document.addEventListener('click', handleClick, listenCapturing);

    return () => {
      document.removeEventListener('click', handleClick, listenCapturing);
    };
  }, [handler, listenCapturing]);

  return ref;
};
