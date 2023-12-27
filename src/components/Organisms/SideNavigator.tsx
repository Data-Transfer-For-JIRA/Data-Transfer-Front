import SectionSideCategory from '../Molecules/SectionSideCategory';
import './SideNavigator.css';
import '../../Common/Common.css';

export default function SideNavigator() {
  const firstitem = [
    { value: "지라 프로젝트 생성요청", link: "/load-wsslist" },
    { value: "프로젝트 티켓생성요청", link: "/transfer-state-list" },
    { value: "이관상태 확인", link: "/view-transfer-endlist" },
  ]
  //const seconditem = ['대상 프로젝트 백업요청', '백업상태 확인'];
  const seconditem = [
    { value: "신규 프로젝트 생성요청", link: "/create-jira-project" },
    { value: "지라 프로젝트 백업요청", link: "/load-jira-list" },
    { value: "백업상태 확인", link: "/check-backup" },
  ]
  return (
    <div className='side-navigator'>
      <SectionSideCategory title='WSS to Jira' item={firstitem} />
      <div className='division-line' />
      <SectionSideCategory title='Jira Management' item={seconditem} />
    </div>
  )
}
