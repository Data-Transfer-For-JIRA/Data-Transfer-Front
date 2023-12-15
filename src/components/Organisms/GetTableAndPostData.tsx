import { useEffect, useState } from 'react';
import BtnSubmit from '../Atoms/BtnSubmit';
import Table from '../Atoms/Table';
import SearchForm from '../Molecules/SearchForm';
import { returnJsonType, pageInfoType } from '../../Common/Types';
import { urlType } from '../../Common/Types';
import { UseGetAxiosSearch, UseGetAxiosPageing, UsePostAxiosCreateJiraProject } from '../../Common/Axios';
import PageIndex from '../Atoms/PageIndex';
import { setUrl } from '../../Common/UtilFunction';
import ChipsStack from '../Molecules/ChipsStack';

import './GetTableAndPostData.css';
// import { testJson } from '../../Common/TestGetJson';


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
  const pageSize = "27";

  const [pageInfo, setPageInfo] = useState<pageInfoType>({ totalPage: 0, numberOfElement: 0 });
  const [pageIndex, setPageIndex] = useState(0);

  const [postProjectList, setPostProjectList] = useState<Array<string>>([]);

  const handleTableSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); //새로고침방지
    const postReturnData = UsePostAxiosCreateJiraProject(postProjectList, urlset.postSubmitUrl)
    console.log(postReturnData);
  }

  const postBtnName = serviceType === 'trans-before' ? '프로젝트 생성요청' : '이슈 생성 요청';

  useEffect(() => {
    async function axiosGetPaging() {
      let result;
      if (search !== '') {
        result = await UseGetAxiosSearch(serviceType, urlset.getSerchURL, search, pageIndex, pageSize);
        // result = testJson;
        setGetViewList(result);
      }
      else {
        result = await UseGetAxiosPageing(serviceType, urlset.getViewURL, pageIndex, pageSize);
        //result = testJson;
        setGetViewList(result);
      }
      if (result !== undefined) setPageInfo({ totalPage: result.totalPages, numberOfElement: result.numberOfElements });
    }
    axiosGetPaging();
  }, [pageIndex, search, serviceType, urlset.getSerchURL, urlset.getViewURL])

  return (
    <div className='main-containter'>
      <div className='table-container'>
        <SearchForm setPageIndex={setPageIndex} setSearch={setSearch} />
        <form onSubmit={(e) => handleTableSubmit(e)}>
          <Table getViewList={getViewList} setPostProjectList={setPostProjectList} postProjectList={postProjectList} />
          <div className='table-control-area'>
            <PageIndex pageInfo={pageInfo} pageIndex={pageIndex} setPageIndex={setPageIndex} />
            {serviceType !== 'trans-end' ? (<BtnSubmit style={{ marginLeft: 'auto' }}>{postBtnName}</BtnSubmit>) : undefined}
          </div>
        </form>
      </div >
      <div className='select-check-container'>
        <ChipsStack postProjectList={postProjectList} setPostProjectList={setPostProjectList} />
      </div>
    </div>
  )
}
