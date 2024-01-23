import { DataGrid, GridCellParams, GridColDef, GridRowId, GridRowSelectionModel, GridTreeNode } from '@mui/x-data-grid';
import { useState } from 'react';

const colums: GridColDef[] = [
  { field: 'id', headerName: 'Index', width: 50 },
  { field: 'projectCode', headerName: '지라코드', width: 100, sortable: false, },
  { field: 'projectName', headerName: '프로젝트이름', width: 900, sortable: false, },
  { field: 'assaginee', headerName: '담당자', width: 100, sortable: false, },
]
//colums에 추가하지 않은 데이터는 뜨지않음 개꿀ㅋ
const testData = [
  { id: 1, projectCode: "TED-01", projectName: '유지보수-서울특별시교육청 통합 유지보수(RMS)', assaginee: '정상길', ahffn: "몰루?" },
  { id: 2, projectCode: "TED-02", projectName: 'ED-M_WSS_ 유지보수-국민건강보험공단 징수통합(내부)', assaginee: '장지환', ahffn: "몰루?" },
  { id: 3, projectCode: "TED-03", projectName: 'ED-M_WSS_ 유지보수_국민건강보험공단_홈페이지/사이버민원', assaginee: '대재석', ahffn: "몰루?" },
  { id: 4, projectCode: "TED-04", projectName: 'ED-M_WSS_삼성증권 BI포털 WebDRM NoAX 업그레이드 유지보수', assaginee: '박종우', ahffn: "몰루?" },
  { id: 5, projectCode: "TED-05", projectName: 'ED-M_WSS_유지보수- 중소기업기술정보진흥원 온라인 대면평가시스템 화면보안 솔루션 유지보수', assaginee: '손인욱', ahffn: "몰루?" },
  { id: 6, projectCode: "TED-06", projectName: 'ED-M_WSS_유지보수 -경찰청 불법촬영물 화면보안시스템 유지보수', assaginee: '김찬호', ahffn: "몰루?" },
  { id: 7, projectCode: "TED-07", projectName: '유지보수-서울특별시교육청 통합 유지보수(RMS)', assaginee: '정상길', ahffn: "몰루?" },
  { id: 8, projectCode: "TED-08", projectName: 'ED-M_WSS_ 유지보수-국민건강보험공단 징수통합(내부)', assaginee: '장지환', ahffn: "몰루?" },
  { id: 9, projectCode: "TED-09", projectName: 'ED-M_WSS_ 유지보수_국민건강보험공단_홈페이지/사이버민원', assaginee: '대재석', ahffn: "몰루?" },
  { id: 10, projectCode: "TED-10", projectName: 'ED-M_WSS_삼성증권 BI포털 WebDRM NoAX 업그레이드 유지보수', assaginee: '박종우', ahffn: "몰루?" },
  { id: 11, projectCode: "TED-11", projectName: 'ED-M_WSS_유지보수- 중소기업기술정보진흥원 온라인 대면평가시스템 화면보안 솔루션 유지보수', assaginee: '손인욱', ahffn: "몰루?" },
  { id: 12, projectCode: "TED-12", projectName: 'ED-M_WSS_유지보수 -경찰청 불법촬영물 화면보안시스템 유지보수', assaginee: '김찬호', ahffn: "몰루?" },
]


type MuiSelectedTableType = {
  //subJiraKey: string;
  setSubJiraKey: React.Dispatch<React.SetStateAction<string>>
}
export default function MuiSelectedTable({ setSubJiraKey }: MuiSelectedTableType) {
  const [rowSelected, setRowSelected] = useState<GridRowId[]>([]);
  const handleSelectedRow = (selection: GridRowSelectionModel) => {
    if (selection.length > 1) {
      const selectionSet = new Set(rowSelected);
      const result = selection.filter((s) => !selectionSet.has(s));
      setRowSelected(result);
    } else {
      setRowSelected(selection);
    }
  }
  const handleOnClickRow = (GridCellParams: GridCellParams<any, unknown, unknown, GridTreeNode>) => {
    setSubJiraKey(GridCellParams.row.projectCode);
  }
  return (
    <DataGrid
      rows={testData}
      columns={colums}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 8 },
        },
      }}
      rowSelectionModel={rowSelected}
      checkboxSelection
      hideFooterSelectedRowCount
      onRowSelectionModelChange={(selection) => handleSelectedRow(selection)}
      onCellClick={(GridCellParams) => { handleOnClickRow(GridCellParams) }}
    />
  )
}
