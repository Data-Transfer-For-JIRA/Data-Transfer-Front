//react API
import { useEffect, useState } from 'react';

//Componets
import BtnSubmit from '../Atoms/BtnSubmit';
import Table from '../Atoms/Table';
import SearchForm from '../Molecules/SearchForm';
import PageIndex from '../Atoms/PageIndex';
import ChipsStack from '../Molecules/ChipsStack';
//Common Api
import { returnJsonType, pageInfoType } from '../../Common/Types';
import { urlType, PostResponseTyep } from '../../Common/Types';
import { UseGetAxiosSearch, UseGetAxiosPageing, UsePostAxiosCreateJiraProject } from '../../Common/Axios';
import { setUrl } from '../../Common/UtilFunction';

import './GetTableAndPostData.css';
import ModalPopup from '../Molecules/ModalPopup';
//test JSON
// import { testJson } from '../../Common/TestGetJson';


/***
 *  Outlet1) 테이블 뷰잉 
 *  지라 프로젝트 생성요청 , 프로젝트 티켓생성요청, 이관상태 확인  공통 호출 컴포넌트
 *  props의 ServiceType에 따라서 보여질 데이터가 다름.
 *  컴포넌트 호출시 기본적으로 GET API호출을함
 *  생성요청 페이지랑 티켓생성요청 페이지의 API 결과 JSON이 달라서 맵핑 함수를 추가 및 호출 분기를 만듬.
 */

enum serviceList { transbefore = 'trans-before', transafter = 'trans-after', transend = 'trans-end' }

type GetTableAndPostData = { serviceType: serviceList; }
const pageSize = "27";

export default function GetTableAndPostData({ serviceType }: GetTableAndPostData) {
  const urlset: urlType = setUrl(serviceType);
  const postBtnName = serviceType === 'trans-before' ? '프로젝트 요청' : '이슈 요청';
 
  const [getViewList, setGetViewList] = useState<returnJsonType | undefined>(undefined);
  const [search, setSearch] = useState<string>('');
  const [pageInfo, setPageInfo] = useState<pageInfoType>({ totalPage: 0, numberOfElement: 0 });
  const [pageIndex, setPageIndex] = useState(0);
  const [postProjectList, setPostProjectList] = useState<Array<string>>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [postResponse, setPostResponse] = useState<PostResponseTyep>();

  const handleTableSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); //새로고침방지
    if (postProjectList.length > 0) {
      setLoading(true);
      if (serviceType === 'trans-before') {
        setPostResponse(await UsePostAxiosCreateJiraProject(postProjectList, urlset.postSubmitUrl));
      } else if (serviceType === 'trans-after') {
        setPostResponse(await UsePostAxiosCreateJiraProject(postProjectList, urlset.postSubmitUrl));
      }
    }
    else {
      alert('선택된 프로젝트가 없습니다.');
    }
  }


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

      {loading === true ? (<ModalPopup postResponse={postResponse} />) : ""}
    </div>
  )
}
