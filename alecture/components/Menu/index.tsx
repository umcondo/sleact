import React, { FC, useCallback, CSSProperties } from 'react';
import { CloseModalButton, CreateMenu } from '@components/Menu/styles';

// 타입스크립트에서 인자들의 타입설정
// 자바스크립트에서는 Proptype을 쓴다.
interface Props {
  show: boolean;
  onCloseModal: (e: any) => void;
  style: CSSProperties;
  closeButton?: boolean;
  children: React.ReactNode;
}

const Menu: FC<Props> = ({ children, style, show, onCloseModal }) => {
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }
  return (
    <CreateMenu onClick={onCloseModal}>
      <div style={style} onClick={stopPropagation}>
        {show && <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>}
        {children}
      </div>
    </CreateMenu>
  );
};

Menu.defaultProps = {
  show: true,
};

export default Menu;
