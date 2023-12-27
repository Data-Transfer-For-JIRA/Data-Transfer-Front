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
     
        {/*20231219 - smlee: <br>, <hr> 태그 추가 */}
          <p className="project-result">진행결과</p><hr></hr><br></br><br></br>
            성공 :{JSON.stringify(postResponse?.success)} <br></br><br></br><hr></hr><br></br>
            실패 :{JSON.stringify(postResponse?.fail)} <br></br><br></br><hr></hr><br></br>
            이미 생성된 프로젝트 :{JSON.stringify(postResponse?.allready)} <br></br><br></br><hr></hr><br></br>
            WSS DB조회불가 :{JSON.stringify(postResponse?.searchFail)} <br></br><br></br><hr></hr>

        {/*20231219 - smlee: <div className='process-okay'> 추가 및 수정 */}
        {/*20231219 - smlee: 'OK' 버튼 내 'btn-link' CSS 제거 희망*/}
        <center>
        <div className='process-okay'>
          OK
          {/*<BtnLink btnLink={'/transfer-state-list'} btnValue='OK'></BtnLink>*/}
        </div>
        </center>
      </div>
    </div >
  )
}
