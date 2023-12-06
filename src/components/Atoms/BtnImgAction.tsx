
import { ReactNode } from 'react';

type BtnImgActionType = {
  children: ReactNode;
  projectCode: string;
  onClickFunction: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function BtnImgAction({ children, onClickFunction, projectCode }: BtnImgActionType) {
  return (
    <button type='button' onClick={onClickFunction} name={projectCode}>
      {children}
    </button>
  )
}
