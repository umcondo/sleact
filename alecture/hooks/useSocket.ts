import io from 'socket.io-client';
import { useCallback } from 'react';

const backUrl = 'http://localhost:3095';
const sockets: { [key: string]: SocketIOClient.Socket } = {};
// 타입스크립트는 빈배열, 빈객체는 타입 설정해야함
// key - 워크스페이스(문자열)

const useSocket = (workspace?: string): [SocketIOClient.Socket | undefined, () => void] => {
  console.log('rerender', workspace);
  // 연결 해제
  const disconnect = useCallback(() => {
    if (workspace) {
      // sockets[workspace].disconnect(); // 새로고침 시 undefine 이슈해결
      sockets[workspace]?.disconnect();
      delete sockets[workspace]; // 객체 삭제
    }
  }, [workspace]);

  if (!workspace) {
    return [undefined, disconnect];
  }

  // 연결
  if (!sockets[workspace]) {
    sockets[workspace] = io.connect(`${backUrl}/ws-${workspace}`, {
      transports: ['websocket'], // http쓰지말고 websocket만 써
    });
  }
  console.log(sockets);
  // socket.emit() 이벤트 비슷
  sockets[workspace].emit('hello', 'world');

  // socket.on() 이벤트리스너 비슷
  sockets[workspace].on('message', (data: any) => {
    console.log(data);
  });

  sockets[workspace].on('onlineList', (data: any) => {
    console.log(data);
  });

  return [sockets[workspace], disconnect];
};

export default useSocket;
