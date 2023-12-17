import { PostResponseTyep } from '../../Common/Types';
import BtnLink from '../Atoms/BtnLink';
import './ModalPopup.css';

type ModalPopUpType = {
  postResponse: PostResponseTyep | undefined;
}
export default function ModalPopup({ postResponse }: ModalPopUpType) {
  return (
    <div className='modal-overlay'>
      <div className='modal-container'>
        <div>진행결과</div>
        <div>성공 :{JSON.stringify(postResponse?.success)} </div>
        <div>실패 :{JSON.stringify(postResponse?.fail)} </div>
        <div>이미생성된 프로젝트 :{JSON.stringify(postResponse?.allready)} </div>
        <div>WSS DB조회불가 :{JSON.stringify(postResponse?.searchFail)} </div>
        <BtnLink btnLink={'/transfer-state-list'} btnValue='확인완료'></BtnLink>
      </div>
    </div >
  )
}
