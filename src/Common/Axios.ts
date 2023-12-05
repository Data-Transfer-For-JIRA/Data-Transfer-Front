import axios from 'axios';
import { returnJsonType, PostReturnJsonType } from './Types';
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
    if (serviceType === 'trans-after') reponse.data = mappingViewData(reponse.data);
    console.log(reponse.data);
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
  : Promise<PostReturnJsonType | undefined> => {
  if (postProjectList.length > 0) {
    const data = { projectCode: postProjectList };
    console.log(postUrl);
    try {
      const response: PostReturnJsonType = await axios.post(postUrl, data);
      return response;
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



export { UseGetAxiosPageing, UseGetAxiosSearch, UsePostAxiosCreateJiraProject };
