import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BtnImgAction from './BtnImgAction';

import './Chip.css';

type ChipType = {
  projectCode: string;
  setPostProjectList: React.Dispatch<React.SetStateAction<string[]>>;
}
export default function Chip({ projectCode, setPostProjectList }: ChipType) {
  const handleBtnOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const name = e.currentTarget.name;
    setPostProjectList((prev) => [...prev].filter((item) => item !== name));
  }
  return (
    <div className='select-chip'>
      <div className='project-code'>{projectCode}</div>
      <div className='delete-button-img'></div>
      <BtnImgAction onClickFunction={handleBtnOnClick} projectCode={projectCode}>
        <FontAwesomeIcon icon={faTrashCan} />
      </BtnImgAction>
    </div >
  )
}
