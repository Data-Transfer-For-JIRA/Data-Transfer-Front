
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type BtnImgActionType = {
  fontAwsomeIcon: IconProp;
  onClickFunction: React.MouseEventHandler<HTMLButtonElement>;
};

export default function BtnImgAction({ fontAwsomeIcon, onClickFunction }: BtnImgActionType) {
  return (
    <button type='button' onClick={onClickFunction}>
      {fontAwsomeIcon}
    </button>
  )
}
