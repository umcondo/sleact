import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import InviteChannelModal from '@components/InviteChannelModal';
import useInput from '@hooks/useInput';

import { Container, Header, DragOver } from '@pages/Channel/styles';
import { IChannel, IChat, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';

import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useParams } from 'react-router';
import useSWR from 'swr';

const Channel = () => {
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();
  const { data: myData } = useSWR('/api/users', fetcher);
  const [chat, setChat, onChangeChat] = useInput('');
  const { data: channelData } = useSWR<IChannel>(`/api/workspaces/${workspace}/channels/${channel}`, fetcher);
  const { data: chatData, mutate: mutateChat } = useSWR<IChat[]>(
    `/api/workspaces/${workspace}/channels/${channel}/chats?perPage=20&page=1`,
    fetcher,
  );
  const { data: channelMembersData } = useSWR<IUser[]>(
    myData ? `/api/workspaces/${workspace}/channels/${channel}/members` : null,
    fetcher,
  );

  // 0초 A: 안녕~(optimistic UI)
  // 1초 B: 안녕~
  // 2초 A: 안녕~(실제 서버)

  const onSubmitForm = useCallback(() => {}, []);

  if (!myData || !myData) {
    return null;
  }

  return (
    <Container>
      <Header>
        <span>#{channel}</span>
        <div className="header-right">
          <span>{channelMembersData?.length}</span>
        </div>
      </Header>
      <ChatList />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  );
};

export default Channel;
