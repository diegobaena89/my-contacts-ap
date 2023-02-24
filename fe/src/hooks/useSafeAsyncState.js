import {
  useCallback, useState,
} from 'react';
import useIsMounted from './useIsMounted';

export default function useSafeAsyncState(initialState) {
  const [state, setState] = useState(initialState);

  const isMounted = useIsMounted();

  const setSafeAsyncData = useCallback((data) => {
    if (isMounted()) {
      setState(data);
    }
  }, [isMounted]);

  return [state, setSafeAsyncData];
}
