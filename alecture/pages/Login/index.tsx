import React, { useCallback, useEffect, useState } from 'react';
import { Success, Form, Error, Label, Input, LinkContainer, Button, Header } from '@pages/SignUp/styles';
import useInput from '@hooks/useInput';
import axios from 'axios';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const Login = () => {
  // 전역 상태 관리 SWR - http GET METHOD를 이용, fetcher가 주소 처리
  // data가 존재하지 않으면 로딩중
  // data, error가 바뀌면 리렌더링 된다.

  const { data, error, mutate } = useSWR('/api/users', fetcher);
  // const { data, error, mutate } = useSWR('/api/users', fetcher, {
  //   dedupingInterval: 100000,
  // });

  const [logInError, setLogInError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const [email, , onChangeEmail] = useInput('');
  const [password, , onChangePassword] = useInput('');

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      setLogInError(false);
      setLoginErrorMessage('');

      axios
        .post(
          '/api/users/login',
          { email, password },
          {
            // withCredentials: true,
          },
        )
        .then(() => {
          // mutate(response.data, false); // OPTIMISTIC UI
          mutate(); // 위에거 쓰면 처음 로그인 시 값을 못받아와서 에러남 - 이슈해결
        })
        .catch((error) => {
          setLogInError(error.response?.data?.statusCode === 401);
          setLoginErrorMessage(error.response.data);
          // console.log(error.response.data);
        });
    },
    [email, password, mutate],
  );

  // 로그인 상태에서 login, logout path로 갔을때
  // 잠깐 보이고 리다이렉트되는 것이 아니라 로딩중이라는 페이지가 보이도록

  // 비동기 처리가 성공해서 데이터가 들어오기 전 까지
  if (data === undefined) {
    return <div>로딩중</div>;
  }

  if (data) {
    return <Navigate replace to="/workspace/sleact/channel/일반" />;
  }

  /* react-router 이슈!
  useNavigate쓰니까 BrowserRouter 오류 뜸

  console.log(data);
  let navigate = useNavigate();

  if (data) {
     navigate('/workspace/channel');
  }

  Redirect는 react-router-v6에서 사라짐
  
  console.log(error, userData);
  if (!error && userData) {
     console.log('로그인됨', userData);
     return <Redirect to="/workspace/sleact/channel/일반" />;
  }
  */

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {loginErrorMessage && <Error>{loginErrorMessage}</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default Login;
