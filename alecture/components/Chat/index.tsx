import { IDM } from '@typings/db';
import React, { FC } from 'react';
import { ChatWrapper } from './styles';
import gravatar from 'gravatar';

interface Props {
  data: IDM;
}
const Chat: FC<Props> = ({ data }) => {
  const user = data.Sender; // DM보낸사람
  return (
    <ChatWrapper>
      <div className="chat-img">
        <img src={gravatar.url(user.email, { s: '36px', d: 'retro' })} alt={user.nickname} />
      </div>
      <div className="chat-text">
        <div className="chat-user">
          <b>{user.nickname}</b>
          {/* <span>{data.createdAt}</span> */}
        </div>
        <p>{data.content}</p>
      </div>
    </ChatWrapper>
  );
};

export default Chat;
