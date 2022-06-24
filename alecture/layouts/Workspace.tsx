import axios from 'axios';
import React, { FC, useCallback } from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Navigate } from 'react-router';

const Workspace: FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { data, error, mutate } = useSWR('http://localhost:3095/api/users', fetcher);

  const onLogout = useCallback(() => {
    axios.post('http://localhost:3095/api/users/logout', null, { withCredentials: true }).then(() => {
      //mutate : 서버에 요청하지 않고 클라에서 이전에 받아온 데이터를 고침
      mutate(false, false); // 두번째 자리에 false를 넣어야 다시 안감
    });
  }, []);

  if (!data) {
    return <Navigate replace to="/login" />;
  }

  return (
    <div>
      <button onClick={onLogout}>로그아웃</button>
      {children}
    </div>
  );
};

export default Workspace;
