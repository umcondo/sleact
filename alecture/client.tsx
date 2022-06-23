import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@layouts/App';

// 리액트 18버전
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Fail to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
// render(<App />, document.querySelector('#App'));

/* page 구조
    pages - 서비스 페이지
    components - 짜잘 컴포넌트
    layouts - 공통 레이아웃
*/
