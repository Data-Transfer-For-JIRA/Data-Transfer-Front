import { createContext, ReactNode, useContext, useMemo, useReducer } from 'react';
import { AxiosPutLinkJiraResult, ModalState, ModalTypeList, PostCreateNewProjectJson, PostResponseCreatPorjectJira } from '../../Common/Types';

type ModalContentsProviderType = { children: ReactNode; }

type ModalAction =
  | { type: 'CREATE_INFO_CHECK'; data: PostCreateNewProjectJson }
  | { type: 'LOADING' }
  | { type: 'RESULT_CREATE_SUCCESS'; result: PostResponseCreatPorjectJira }
  | { type: 'RESULT_CREATE_FAIL'; result: PostResponseCreatPorjectJira }
  | { type: 'ERR_API_CALL'; }
  | { type: 'NONE_STATE'; }
  | { type: 'LINK_INFO_CHECK', putLinkData: { mainJiraKey: string, subJiraKey: string[] } }
  | { type: 'LINK_RESULT_SUCCESS', putSuccessResult: AxiosPutLinkJiraResult[] }

const modalState: ModalState = {
  isOpen: false,
  postData: undefined,
  responseData: undefined,
  modalType: ModalTypeList.NoneState,
  putLinkData: undefined,
  putSuccessResult: undefined,
};

const ModalContentsReducer = (state: ModalState, action: ModalAction) => {
  switch (action.type) {
    case 'CREATE_INFO_CHECK': //.프로젝트생성이전체크
      return { isOpen: true, modalType: action.type, postData: action.data, responseData: undefined, putLinkData: undefined, putSuccessResult: undefined };
    case 'LOADING': //프로그레스로딩
      return { isOpen: true, modalType: action.type, postData: undefined, responseData: undefined, putLinkData: undefined, putSuccessResult: undefined };
    case 'RESULT_CREATE_SUCCESS': //프로젝트성공
      return { isOpen: true, modalType: action.type, postData: undefined, responseData: action.result, putLinkData: undefined, putSuccessResult: undefined };
    case 'RESULT_CREATE_FAIL': //프로젝트실패
      return { isOpen: true, modalType: action.type, postData: undefined, responseData: action.result, putLinkData: undefined, putSuccessResult: undefined };
    case 'NONE_STATE': //모달초기화
      return { isOpen: false, modalType: action.type, postData: undefined, responseData: undefined, putLinkData: undefined, putSuccessResult: undefined };
    case 'ERR_API_CALL': //API호출 실패
      return { isOpen: true, modalType: action.type, postData: undefined, responseData: undefined, putLinkData: undefined, putSuccessResult: undefined };
    case 'LINK_INFO_CHECK': //프로젝트 링크 생성이전 체크
      return { isOpen: true, modalType: action.type, postData: undefined, responseData: undefined, putLinkData: action.putLinkData, putSuccessResult: undefined };
    case 'LINK_RESULT_SUCCESS':
      console.log("😀😀", action);
      return { isOpen: true, modalType: action.type, postData: undefined, responseData: undefined, putLinkData: undefined, putSuccessResult: action.putSuccessResult };
    default:
      return state;
  }
}


const ModalContext = createContext<{
  state: ModalState;
  modalDispatch: React.Dispatch<ModalAction>
}>({
  state: modalState,
  modalDispatch: () => { }
});

export default function ModalContentsProvider({ children }: ModalContentsProviderType) {
  const [state, modalDispatch] = useReducer(ModalContentsReducer, modalState);
  const contextValue = useMemo(() => ({ state, modalDispatch }), [state, modalDispatch])

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useModalState = () => {
  return useContext(ModalContext)
}
