import { returnJsonType, PostReturnJsonType, GetWssContent, emptyJson, urlType } from './Types';
/**
 * 테이블에서 핸들링할 데이터 오브젝트와 '프로젝트 티켓생성요청' API호출 후 받은 응답 데이터를 맵핑하는 함수
 * @param retrunJson 
 * @returns 
 */
export function mappingViewData(retrunJson: PostReturnJsonType | undefined): returnJsonType {
  const tempArray: GetWssContent[] = [];
  let returnArray: returnJsonType;
  if (retrunJson === undefined) { returnArray = emptyJson; }
  else {
    retrunJson.content.map((item) => {
      tempArray.push({
        projectCode: item.key,
        projectName: item.jiraProjectName,
        projectFlag: item.key,    //flag API에서 넣어서 주기로함 수정예정.
        createdDate: item.migratedDate,
        migrateFlag: item.wssProjectName
      })
    })

    returnArray = {
      ...retrunJson, content: tempArray
    }
  }
  return returnArray;
}
/**
 * 라우터를 통해서 접근하는 서비스 URL에 따른 API URL 설정함수
 * trans-end 서비스는 PostUrl이 없을 예정인데 이때 어떻게 처리해야할지 고민중
 * @param serviceType 
 * @returns 
 */
export const setUrl = (serviceType: string) => {
  const urlObject: urlType = {
    getViewURL: '',
    getSerchURL: '',
    postSubmitUrl: ''
  };
  switch (serviceType) {
    case 'trans-before':
      urlObject.getViewURL = 'http://localhost:8080/transfer/project/before/list';
      urlObject.getSerchURL = 'http://localhost:8080/transfer/project/before/list/search';
      urlObject.postSubmitUrl = 'http://localhost:8080/transfer/project/1/create/bulk';
      return urlObject;
    case 'trans-after':
      urlObject.getViewURL = 'http://localhost:8080/transfer/project/after/list';
      urlObject.getSerchURL = 'http://localhost:8080/transfer/project/after/list/search';
      urlObject.postSubmitUrl = 'http://localhost:8080/transfer/issue';
      return urlObject;
    case 'trans-end':
      urlObject.getViewURL = 'http://localhost:8080/transfer/issu/before/list';
      urlObject.getSerchURL = 'http://localhost:8080/transfer/issu/after/list';
      urlObject.postSubmitUrl = 'not';
      return urlObject;
    default:
      break;
  }
  return urlObject;
}

/**
 * 테이블의 페이징을 위한 인덱싱 배열을 만드는 함수.
 * @param totalPage 
 * @param pageIndex 
 * @returns 
 */
export function setIndexNumber(totalPage: number, pageIndex: number): number[] {
  const tempArray: number[] = [];
  const offset = 3;
  switch (true) {
    case pageIndex <= offset:
      for (let i = 1; i <= pageIndex + offset && i <= totalPage; i++) {
        tempArray.push(i);
      }
      break;
    case pageIndex > offset && pageIndex < totalPage - offset:
      for (let i = pageIndex - offset; i <= pageIndex + offset; i++) {
        tempArray.push(i)
      }
      break;
    case pageIndex >= totalPage - 3:
      for (let i = pageIndex - offset; i <= totalPage; i++) {
        tempArray.push(i)
      }
      break;
    default:
      tempArray.push(1)
      break;
  }
  return tempArray;
}
