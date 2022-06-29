import { IDM } from '@typings/db';
import React, { FC } from 'react';
import { ChatWrapper } from './styles';
import gravatar from 'gravatar';
import dayjs from 'dayjs';
import regexifyString from 'regexify-string';
import { Link, useParams } from 'react-router-dom';
interface Props {
  data: IDM;
}
const Chat: FC<Props> = ({ data }) => {
  const { workspace } = useParams<{ workspace: string }>();
  const user = data.Sender; // DM보낸사람

  // @[제로초1](7)
  // \d 숫자, +는 1개 이상 ?는 0개나 1개
  // g는 모두찾기
  // | 또는, \n 줄바꿈
  const result = regexifyString({
    input: data.content,
    pattern: /@\[.+?\]\(\d+\|\n)/g,
    decorator(match, index) {
      const arr = match.match(/@\[.+?\]\(\d+\)/)!;
      if (arr) {
        return (
          <Link key={match + index} to={`/workspace/${workspace}/dm/${arr[2]}`}>
            @{arr[1]}
          </Link>
        );
      }
      return <br key={index} />;
    },
  });

  return (
    <ChatWrapper>
      <div className="chat-img">
        <img src={gravatar.url(user.email, { s: '36px', d: 'retro' })} alt={user.nickname} />
      </div>
      <div className="chat-text">
        <div className="chat-user">
          <b>{user.nickname}</b>&nbsp;
          <span>{dayjs(data.createdAt).format('h:mm A')}</span>
        </div>
        <p>{result}</p>
      </div>
    </ChatWrapper>
  );
};

export default Chat;
