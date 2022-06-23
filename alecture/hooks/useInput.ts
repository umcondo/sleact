import { Dispatch, useCallback, useState, SetStateAction, ChangeEvent } from 'react';

// 타입스크립트 타입설정 T를 이용하거나 any를 사용
type ReturnTypes<T = any> = [T, Dispatch<SetStateAction<T>>, (e: ChangeEvent<HTMLInputElement>) => void];

const useInput = <T = any>(initialValue: T): ReturnTypes<T> => {
  const [value, setValue] = useState(initialValue);

  const onchange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as unknown as T);
  }, []);

  return [value, setValue, onchange];
};

export default useInput;
