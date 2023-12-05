import BtnImgAction from './BtnImgAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


type ChipType = {
  projectCode: string;
  handlePostList: React.Dispatch<React.SetStateAction<string[]>>;
}
export default function Chip({ projectCode, setPostProjectList }: ChipType) {
  const handleBtnOnClick = (): React.MouseEventHandler<HTMLButtonElement> => {
    alert('click');
  }
  return (
    <div className='select-chip'>
      <p>{projectCode}</p>
      <BtnImgAction onClickFunction={handleBtnOnClick} >
        <FontAwesomeIcon icon="fa-regular fa-trash" />
      </BtnImgAction>
    </div >
  )
}
