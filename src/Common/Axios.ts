import axios from 'axios';
import { returnJsonType, PostResponseTyep, PostCreateNewProjectJson, PostResponseCreatPorjectJira } from './Types';
import { mappingViewData } from './UtilFunction';


const noDataError = new Error('API 호출결과가 없습니다.')


const UseGetAxiosPageing = async (serviceType: string, URL: string, startIndex: number, pageSize: string,)
  : Promise<returnJsonType | undefined> => {
  const indexingParam = `?pageIndex=${startIndex}&&pageSize=${pageSize}`;
  const getUrl = URL + indexingParam;
  console.log(getUrl);
  try {
    const reponse = await axios.get(getUrl);
    if (reponse.data.content.length === 0) throw new Error('API호출이 정상적이지 않습니다.');
    console.log(reponse.data);
    if (serviceType === 'trans-after') reponse.data = mappingViewData(reponse.data);
    //console.log(reponse.data);
    return reponse.data;
  }
  catch (Error) {
    console.log(Error);
    throw Error;
  }
};

const UseGetAxiosSearch = async (serviceType: string, URL: string, searchKeyWord: string, startIndex: number, pageSize: string)
  : Promise<returnJsonType | undefined> => {
  const indexingParam = `?searchKeyWord=${searchKeyWord}&pageIndex=${startIndex}&pageSize=${pageSize}`;
  const getUrl = URL + indexingParam;
  console.log(getUrl);
  try {
    const reponse = await axios.get(getUrl);
    if (serviceType === 'trans-after') reponse.data = mappingViewData(reponse.data);
    if (reponse.data.content.length === 0) {
      alert("검색결과가 없습니다.");
      throw new Error('검색결과가 없습니다.');
    }
    if (serviceType === 'trans - after') reponse.data = mappingViewData(reponse.data);
    console.log(reponse.data);
    return reponse.data;
  }
  catch (Error) {
    throw noDataError;
  }
};

/**  personalId 는 1로 고정
*    projectCodeList= 1,2,3,4,65,232,3123,
*/

const UsePostAxiosCreateJiraProject = async (postProjectList: string[], postUrl: string)
  : Promise<PostResponseTyep> => {
  const timeout = postProjectList.length * 20000;
  if (postProjectList.length > 0) {
    const paramData = { projectCode: postProjectList };
    console.log(postUrl);
    try {
      const { data } = await axios.post(postUrl, paramData, { timeout });
      console.log(data);
      return data;
    }
    catch (Error) {
      console.log(Error)
      throw Error;
    }
  }
  else {
    throw noDataError;
  }
}

// /**
//  * 지라 프로젝트의 티켓을 생성요청하는 axios
//  * 기존 was에서의 반복처리가 아닌 브라우저에서 반복 처리함.(미완성)
//  * @param postProjectList : 선택된 프로젝트 리스트
//  * @param postUrl : 호출할 API url  
//  * @returns {
//  *  jiraProjectCode : string;
//  *  flag : ResponseState( allready = 'allready', fail = 'fail', searchFail = 'searchFail', success = 'success')
//  * }
//  */
// const UsePostAxiosCreateJiraIssue = async (postProjectList: string[], postUrl: string)
//   : Promise<CreateIssueResponse[]> => {
//   const timeout = postProjectList.length * 200000;
//   let responseData: PostResponseTyep[];

//   if (postProjectList.length > 0) {
//     postProjectList.forEach(async (item) => {
//       try {
//         const { data } = await axios.post(postUrl, item, { timeout });
//         responseData.push(data);
//       }
//       catch (Error) {
//         console.log(Error)
//         throw Error;
//       }
//     });
//   }
//   else {
//     throw noDataError;
//   }
//   //return responseData;
// }
/**
 * Jira 신규프로젝트 생성 요청 api
 * @param postJson : post data
 */
const UsePostCreateJiraProject = async (postJson: PostCreateNewProjectJson):
  Promise<PostResponseCreatPorjectJira | undefined> => {
  const URL = `${import.meta.env.VITE_API_ADDRESS}:8888/platform/service`;
  console.log(import.meta.env.VITE_API_ADDRESS);
  try {
    console.log("😀😀😀", URL)
    const response = await axios({
      url: URL,
      method: 'post',
      data: {
        ...postJson
      }
    })
    console.log(response);
    return response.data;
  }
  catch (Error) {
    console.log(Error);
    return undefined;
  }
}
export { UseGetAxiosPageing, UseGetAxiosSearch, UsePostAxiosCreateJiraProject, UsePostCreateJiraProject };
