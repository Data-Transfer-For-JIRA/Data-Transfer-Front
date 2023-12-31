

export type GetWssContent = {
  assignedEngineer: string;
  projectCode: string;
  projectName: string;
  projectFlag: string;
  createdDate: string;
  migrateFlag: string;
}

type PostJiraProjcetContent = {
  key: string;
  jiraProjectName: string;
  migratedDate: string;
  projectCode: string;
  wssProjectName: string;
  projectAssignees: string
}

export interface returnJsonType {
  content: Array<GetWssContent>;
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  pagealbe: object
  size: number
  sort: object
  totalElements: number
  totalPages: number
}

export interface PostReturnJsonType {
  content: Array<PostJiraProjcetContent>;
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  pagealbe: object
  size: number
  sort: object
  totalElements: number
  totalPages: number
}

export const emptyJson: returnJsonType = {
  content: [],
  empty: false,
  first: false,
  last: false,
  number: 0,
  numberOfElements: 0,
  pagealbe: {},
  size: 0,
  sort: {},
  totalElements: 0,
  totalPages: 0
}
export interface urlType {
  getViewURL: string;
  getSerchURL: string;
  postSubmitUrl: string;
}

export interface PostResponseTyep {
  allready: string[];
  fail: string[];
  searchFail: string[];
  success: string[];
}

enum ResponseState { allready = 'allready', fail = 'fail', searchFail = 'searchFail', success = 'success' }
export interface CreateIssueResponse {
  state: ResponseState;
  projectCode: string;
}

//신규 지라 프로젝트 생성에 보낼 데이터 정의 및 Json타입
export interface PostCreateNewProjectJson {
  essential: {
    projectFlag: string;
    projectName: string;
  },
  common: {
    projectCode: string;
    assignee: string;
    subAssignee: string;
    salesManager: string;
    contractor: string;
    client: string;
    productType: string[];
    productTypeEtc: string;
    productInfo: string;
    productInfoEtc: string;
    linkInfo: string;
    linkInfoEtc: string;
    barcodeType: string;
    multiOsSupport: string;
    printerSupportRange: string;
    etc: string;
    description: string;
  },
  selected: {
    //프로젝트
    projectAssignmentDate: string;
    projectProgressStep: string;
    //유지보수
    contractStatus: string;
    maintenanceStartDate: string;
    maintenanceEndDate: string;
    inspectionMethod: string;
    inspectionMethodEtc: string;
    inspectionCycle: string;
  }
}

export const defaultPostJson: PostCreateNewProjectJson = {
  essential: {
    projectFlag: "",
    projectName: "",
  },
  common: {
    projectCode: "",
    assignee: "",
    subAssignee: "",
    salesManager: "",
    contractor: "",
    client: "",
    productType: [],
    productTypeEtc: "",
    productInfo: "",
    productInfoEtc: "",
    linkInfo: "",
    linkInfoEtc: "",
    barcodeType: "",
    multiOsSupport: "",
    printerSupportRange: "",
    etc: "",
    description: ""
  },
  selected: {
    //프로젝트
    projectAssignmentDate: "",
    projectProgressStep: "",
    //유지보수
    contractStatus: "",
    maintenanceStartDate: "",
    maintenanceEndDate: "",
    inspectionMethod: "",
    inspectionMethodEtc: "",
    inspectionCycle: ""
  }
}

export interface PostResponseCreatPorjectJira {
  result: string;
  jiraProjectCode: string;
  jiraProjectName: string;
}



export interface pageInfoType { totalPage: number; numberOfElement: number; }
