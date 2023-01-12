import { RefObject, useEffect } from 'react';
import { useNavigate } from 'react-router';

const useOutside = <T extends HTMLElement>(ref: RefObject<T>, path: string) => {
  const navigate = useNavigate();
  useEffect(() => {
    const onClickOutside = ({ target }: MouseEvent) => {
      if (ref.current && !ref.current.contains(target as Node)) {
        navigate(path);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [navigate, path, ref]);
};

export default useOutside;
