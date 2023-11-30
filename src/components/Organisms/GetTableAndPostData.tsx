import { useEffect, useState } from 'react';
import BtnSubmit from '../Atoms/BtnSubmit';
import Table from '../Atoms/Table';
import SearchForm from '../Molecules/SearchForm';
import { returnJsonType, pageInfoType } from '../../Common/Types';
import { urlType } from '../../Common/Types';
import './GetTableAndPostData.css';
import { UseGetAxiosSearch, UseGetAxiosPageing, UsePostAxiosCreateJiraProject } from '../../Common/Axios';
import PageIndex from '../Atoms/PageIndex';
import { setUrl } from '../../Common/UtilFunction';

/***
 *  Outlet1) 테이블 뷰잉 
 *  지라 프로젝트 생성요청 , 프로젝트 티켓생성요청, 이관상태 확인  공통 호출 컴포넌트
 *  props의 ServiceType에 따라서 보여질 데이터가 다름.
 *  컴포넌트 호출시 기본적으로 GET API호출을함
 *  생성요청 페이지랑 티켓생성요청 페이지의 API 결과 JSON이 달라서 맵핑 함수를 추가 및 호출 분기를 만듬.
 */

enum serviceList { transbefore = 'trans-before', transafter = 'trans-after', transend = 'trans-end' }
type ServicePropsType = { serviceType: serviceList }

export default function GetTableAndPostData({ serviceType }: ServicePropsType) {
  const [getViewList, setGetViewList] = useState<returnJsonType | undefined>(undefined);
  const [search, setSearch] = useState<string>('');

  const urlset: urlType = setUrl(serviceType);
  const pageSize = "15";

  const [pageInfo, setPageInfo] = useState<pageInfoType>({ totalPage: 0, numberOfElement: 0 });
  const [pageIndex, setPageIndex] = useState(0);

  const [postProjectList, setPostProjectList] = useState<Array<string>>([]);

  const handleTableSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); //새로고침방지
    const postReturnData = UsePostAxiosCreateJiraProject(postProjectList, urlset.postSubmitUrl)
    console.log(postReturnData);
  }

  useEffect(() => {
    async function axiosGetPaging() {
      let result;
      let proList;
      if (search !== '') {
        result = await UseGetAxiosSearch(serviceType, urlset.getSerchURL, search, pageIndex, pageSize);
        setGetViewList(result);
      }
      else {
        result = await UseGetAxiosPageing(serviceType, urlset.getViewURL, pageIndex, pageSize);
        setGetViewList(result);
      }
      if (result !== undefined) setPageInfo({ totalPage: result.totalPages, numberOfElement: result.numberOfElements });
      
      if (getViewList!=null) {
        proList = getViewList;
      }
      
    }
    axiosGetPaging();
  }, [pageIndex, search, serviceType])

  return (
    <div className='table-container'>
      <SearchForm setPageIndex={setPageIndex} setSearch={setSearch} />
      <form onSubmit={(e) => handleTableSubmit(e)}>
        <p>{JSON.stringify(postProjectList)}</p>
        <Table getViewList={getViewList} setPostProjectList={setPostProjectList} postProjectList={postProjectList} />
        <PageIndex pageInfo={pageInfo} pageIndex={pageIndex} setPageIndex={setPageIndex} />
      <div className="submit-container">
      <BtnSubmit/>
      <p className='project-code'>{JSON.stringify(postProjectList)}</p>   
      </div>
      </form>
    </div >
  )
}
