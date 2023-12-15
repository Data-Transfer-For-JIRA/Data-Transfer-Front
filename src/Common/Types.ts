// enum contentMember {
//   projectCode = 'projectCode',
//   projectName = 'projectName',
//   projectFlag = 'projectFlag',
//   createdDate = 'createdDate',
//   migrateFlag = 'migrateFlag',
// }

export type GetWssContent = {
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
}
// export interface returnJsonType {
//   content: Array<GetWssContent>;
//   pageable: {
//     sort: {
//       sorted: boolean
//       unsorted: boolean
//       empty: boolean
//     }
//     pageNumber: number
//     pageSize: number
//     offset: number
//     paged: boolean
//     unpaged: boolean
//   }
//   last: boolean
//   totalPages: number
//   totalElements: number
//   numberOfElements: number
//   first: boolean
//   size: number
//   number: number
//   sort: {
//     sorted: boolean
//     unsorted: boolean
//     empty: boolean
//   }
//   empty: boolean
// }

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

export interface pageInfoType { totalPage: number; numberOfElement: number; }
